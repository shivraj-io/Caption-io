require('dotenv').config();

let GoogleGenAI;
try {
  // Prefer requiring if available (CommonJS of @google/genai), fallback to dynamic import
  GoogleGenAI = require('@google/genai').GoogleGenAI;
} catch (e) {
  GoogleGenAI = null;
}

const ai = GoogleGenAI ? new GoogleGenAI({}) : null;

async function generateCaption(base64ImageFile) {
  try {
    if (!ai) throw new Error('AI SDK not available');

    const contents = [
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64ImageFile,
        },
      },
      { text: 'Caption this image' },
    ];

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
      contents,
      config: {
        systemInstruction: `You are an expert in generating short, catchy captions with relevant emojis and 1-2 hashtags. Return only the caption.`,
      },
    });

    const text = response?.text || response?.output_text || '';
    if (!text) throw new Error('Empty AI response');
    return text;
  } catch (err) {
    // Fallback caption if AI fails (keeps API usable on local dev)
    console.warn('AI caption generation failed:', err.message);
    return 'A cool photo ✨ #vibes';
  }
}

module.exports = generateCaption;