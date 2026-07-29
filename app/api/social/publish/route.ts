import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // 1. Verify authenticated session
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse request body
    const { image, caption } = await request.json();
    if (!caption) {
      return NextResponse.json({ error: 'Missing caption' }, { status: 400 });
    }

    const pageAccessToken = process.env.META_PAGE_ACCESS_TOKEN;
    const pageId = process.env.META_PAGE_ID;

    // 3. Fallback to mock publishing if environmental variables are not configured
    if (!pageAccessToken || pageAccessToken.trim() === '' || !pageId || pageId.trim() === '') {
      console.warn('Meta credentials not configured. Simulating successful publish.');
      
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      return NextResponse.json({
        success: true,
        mocked: true,
        postId: 'mock_fb_post_' + Math.floor(Math.random() * 1000000000),
        postLink: 'https://facebook.com',
        message: `Post (${image ? 'with image' : 'text-only'}) successfully simulated! Set META_PAGE_ACCESS_TOKEN and META_PAGE_ID in your .env file to publish to your live Facebook page.`
      });
    }

    // Programmatically exchange User Access Token for Page Access Token if necessary
    let activeToken = pageAccessToken;
    try {
      const exchangeUrl = `https://graph.facebook.com/v19.0/${pageId}?fields=access_token&access_token=${pageAccessToken}`;
      const exchangeResponse = await fetch(exchangeUrl);
      if (exchangeResponse.ok) {
        const exchangeData = await exchangeResponse.json();
        if (exchangeData.access_token) {
          activeToken = exchangeData.access_token;
          console.log('Successfully exchanged User Access Token for Page Access Token dynamically.');
        }
      }
    } catch (err) {
      console.warn('Meta token exchange request failed. Using original token.', err);
    }

    let fbResponse;
    let fbData;

    if (image) {
      // 4. Decode base64 image and publish to /photos
      const base64Data = image.split(',')[1] || image;
      const buffer = Buffer.from(base64Data, 'base64');
      
      // Create blob representing the image
      const blob = new Blob([buffer], { type: 'image/png' });

      // Build FormData for Meta Graph API
      const formData = new FormData();
      formData.append('source', blob, 'devesters-social-post.png');
      formData.append('message', caption);
      formData.append('access_token', activeToken);

      const graphUrl = `https://graph.facebook.com/v19.0/${pageId}/photos`;
      
      fbResponse = await fetch(graphUrl, {
        method: 'POST',
        body: formData,
      });

      fbData = await fbResponse.json();
    } else {
      // 5. Publish text-only to /feed
      const graphUrl = `https://graph.facebook.com/v19.0/${pageId}/feed`;
      
      fbResponse = await fetch(graphUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: caption,
          access_token: activeToken,
        }),
      });

      fbData = await fbResponse.json();
    }

    if (!fbResponse.ok || fbData.error) {
      console.error('Meta Graph API Error:', fbData.error);
      return NextResponse.json({ 
        error: fbData.error?.message || 'Meta Graph API returned an error',
        details: fbData.error
      }, { status: fbResponse.status || 500 });
    }

    // Facebook returns id for feed posts or post_id/id for photos.
    const postId = fbData.post_id || fbData.id;
    const postLink = `https://www.facebook.com/${postId}`;

    return NextResponse.json({
      success: true,
      mocked: false,
      postId: postId,
      postLink: postLink,
      message: image 
        ? 'Post with image successfully published to your Facebook Page!'
        : 'Text post successfully published to your Facebook Page!'
    });

  } catch (error: any) {
    console.error('Error publishing social post:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
