import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ai, GEMINI_MODEL } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // 1. Verify authenticated session
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse request body
    const { topic } = await request.json();
    if (!topic || typeof topic !== 'string' || topic.trim() === '') {
      return NextResponse.json({ error: 'Missing or invalid topic' }, { status: 400 });
    }

    // 3. Construct the prompt for Gemini
    const systemPrompt = `You are a social media content strategist for Devesters, a premium software engineering, UI/UX design, and AI development agency.
We need to generate 4 distinct, highly creative, and engaging social media post ideas for our Facebook and LinkedIn pages.

Topic: "${topic}"

Provide exactly 4 ideas. For each idea, determine:
- title: A short catchy title (under 60 characters).
- description: A brief summary of the post's core message.
- templateType: Must be one of: 'quote' (best for bold claims or inspiring quotes), 'highlight' (best for showcase/features/tech stack lists), 'tip' (best for quick tutorials, hacks, or educational cards), or 'general' (best for announcements, news, or general discussion).
- visualDescription: A suggested prompt/description for what the design graphic should contain.

You must respond in valid JSON format matching this JSON Schema:
{
  "ideas": [
    {
      "title": "string",
      "description": "string",
      "templateType": "quote | highlight | tip | general",
      "visualDescription": "string"
    }
  ]
}`;

    // 4. Call Gemini API
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: systemPrompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text;
    if (!responseText) {
      return NextResponse.json({ error: 'Failed to generate content from Gemini' }, { status: 500 });
    }

    // 5. Parse and return the JSON
    const data = JSON.parse(responseText);
    return NextResponse.json(data);

  } catch (error: any) {
    console.error('Error generating post ideas:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
