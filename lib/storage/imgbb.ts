/**
 * ImgBB Image Upload Service Client
 * 
 * Secure upload helper using API key. Sets proper User-Agent and Accept headers
 * to prevent automated API rate limit or request blocking.
 */

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY || 'eaba1bc0300ab3681e35e1eef62d2503';
const IMGBB_UPLOAD_URL = 'https://api.imgbb.com/1/upload';

export interface ImgBBUploadResponse {
  data: {
    id: string;
    title: string;
    url_viewer: string;
    url: string;
    display_url: string;
    width: number;
    height: number;
    size: number;
    time: number;
    expiration: number;
    image: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    thumb: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    medium?: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    delete_url: string;
  };
  success: boolean;
  status: number;
}

/**
 * Uploads a file (File object or base64 data URL string) to ImgBB.
 * 
 * @param file The file object or base64 data string (e.g. data:image/png;base64,...)
 * @returns The direct URL of the uploaded image on ImgBB CDN
 */
export async function uploadToImgBB(file: File | string): Promise<string> {
  try {
    const formData = new FormData();
    
    if (typeof file === 'string') {
      // If it's a data URL, extract the base64 part
      const base64Data = file.includes('base64,') 
        ? file.split('base64,')[1] 
        : file;
      formData.append('image', base64Data);
    } else {
      formData.append('image', file);
    }

    const url = `${IMGBB_UPLOAD_URL}?key=${IMGBB_API_KEY}`;
    
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        // Custom headers to prevent automated client detection/blocking
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 DevestersClient/1.0',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`ImgBB upload failed with status ${response.status}: ${errorText}`);
    }

    const result = (await response.json()) as ImgBBUploadResponse;

    if (!result.success || !result.data || !result.data.url) {
      throw new Error(`ImgBB returned failure response: ${JSON.stringify(result)}`);
    }

    return result.data.url;
  } catch (error) {
    console.error('Error in uploadToImgBB:', error);
    throw error;
  }
}
