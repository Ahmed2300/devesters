import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini AI client
// The SDK can automatically use process.env.GEMINI_API_KEY or we can pass it explicitly.
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn('Warning: GEMINI_API_KEY is not defined in the environment variables.');
}

export const ai = new GoogleGenAI({ apiKey: apiKey || '' });

// Export the default model name to keep it consistent
export const GEMINI_MODEL = 'gemini-3.1-flash-lite';
