import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const ACCESS_KEY_ID = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
const BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME;

// Custom public domain for R2 if configured, otherwise fallback
const R2_PUBLIC_DOMAIN = process.env.CLOUDFLARE_R2_PUBLIC_DOMAIN || ''; 

/**
 * Lazy-loaded S3 client for Cloudflare R2 compatibility.
 * Endpoint format: https://<account_id>.r2.cloudflarestorage.com
 */
let s3Client: S3Client | null = null;

export function getR2Client(): S3Client {
  if (s3Client) return s3Client;

  if (!ACCOUNT_ID || !ACCESS_KEY_ID || !SECRET_ACCESS_KEY) {
    console.warn('Cloudflare R2 environment variables are missing. Initialization might fail.');
  }

  s3Client = new S3Client({
    region: 'auto',
    endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: ACCESS_KEY_ID || '',
      secretAccessKey: SECRET_ACCESS_KEY || '',
    },
  });

  return s3Client;
}

/**
 * Uploads a buffer or file to Cloudflare R2.
 * 
 * @param key The destination path/filename inside the bucket
 * @param body The binary buffer, string, or blob data
 * @param contentType The mime type of the file (e.g. image/png)
 * @returns The public URL of the uploaded asset
 */
export async function uploadToR2(
  key: string,
  body: Buffer | Uint8Array | string,
  contentType: string
): Promise<string> {
  const client = getR2Client();
  const bucket = BUCKET_NAME || '';

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: contentType,
  });

  await client.send(command);

  // If a public custom domain is configured, use it, otherwise fall back to signed URLs or S3 endpoint
  if (R2_PUBLIC_DOMAIN) {
    return `${R2_PUBLIC_DOMAIN.replace(/\/$/, '')}/${key}`;
  }

  return `https://${bucket}.${ACCOUNT_ID}.r2.cloudflarestorage.com/${key}`;
}

/**
 * Deletes an object from Cloudflare R2.
 */
export async function deleteFromR2(key: string): Promise<void> {
  const client = getR2Client();
  const bucket = BUCKET_NAME || '';

  const command = new DeleteObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  await client.send(command);
}

/**
 * Generates a temporary signed URL for reading a private object.
 * Useful if the R2 bucket is private and we need to display it securely.
 */
export async function getR2SignedUrl(key: string, expiresInSeconds = 3600): Promise<string> {
  const client = getR2Client();
  const bucket = BUCKET_NAME || '';

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  return getSignedUrl(client, command, { expiresIn: expiresInSeconds });
}
