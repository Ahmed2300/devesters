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
    const { ideaTitle, ideaDescription, templateType } = await request.json();
    if (!ideaTitle || !ideaDescription || !templateType) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // 3. Construct prompt for Gemini
    const contentPrompt = `You are a premium social media copywriter and content designer for Devesters, a premium software engineering, UI/UX design, and AI development agency.
We have selected a post idea and template style, and now we need to generate the actual caption and graphic card text.

Post Idea Title: "${ideaTitle}"
Post Idea Description: "${ideaDescription}"
Template Style: "${templateType}"

Generate the following:
1. "caption": A highly engaging social media caption (primarily in friendly yet professional Egyptian Arabic mixed with English tech terms, with nicely structured paragraphs, emojis, relevant hashtags, and a clear call-to-action like visiting our website or reaching out).
2. Graphic Content (text that will be drawn directly onto the visual card template):
   - "graphicTitle": A short, punchy title/headline (under 40 characters).
   - "graphicSubtitle": A short tagline/subtitle (under 60 characters).
   - "graphicPoints": An array of 1 to 3 short bullet points/phrases (each under 80 characters) or a single main statement/quote that fits the template structure.
3. "imagePrompt": A highly detailed prompt for generating a premium technology, software development, abstract, or futuristic design visual that complements this post.

You must respond in valid JSON format matching this JSON Schema:
{
  "caption": "string",
  "graphicTitle": "string",
  "graphicSubtitle": "string",
  "graphicPoints": ["string"],
  "imagePrompt": "string"
}`;

    // 4. Call Gemini API
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: contentPrompt,
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
    console.error('Error generating post content:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
