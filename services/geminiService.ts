import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are DeenLife AI, a knowledgeable, respectful, and spiritual Islamic companion.
Your goal is to assist users with questions about Islam, the Quran, Sunnah, and general spiritual advice.
- Keep answers concise, clear, and easy to understand.
- Quote relevant Quranic verses or Hadith when appropriate (provide references).
- If a question is about Fiqh (jurisprudence) regarding specific fatwas, advise the user to consult a local scholar for a final ruling, but provide general known views.
- Maintain a polite, warm, and encouraging tone.
- Do not engage in political debates or sectarian controversy; stick to mainstream Islamic teachings.
`;

let client: GoogleGenAI | null = null;

export const getGeminiClient = (): GoogleGenAI => {
  if (!client) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key not found in environment variables");
    }
    client = new GoogleGenAI({ apiKey });
  }
  return client;
};

export const sendMessageToGemini = async (
  message: string,
  history: { role: 'user' | 'model'; text: string }[] = []
): Promise<AsyncIterable<string>> => {
  const ai = getGeminiClient();
  
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
    history: history.map(h => ({
      role: h.role,
      parts: [{ text: h.text }],
    })),
  });

  const result = await chat.sendMessageStream({ message });
  
  return (async function* () {
    for await (const chunk of result) {
      const c = chunk as GenerateContentResponse;
      if (c.text) {
        yield c.text;
      }
    }
  })();
};

export const translateText = async (text: string, targetLanguage: string): Promise<string> => {
  const ai = getGeminiClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Translate the following Islamic text into ${targetLanguage}. Ensure the translation maintains the spiritual and respectful tone appropriate for religious texts. Only return the translated text, no explanations.\n\nText: "${text}"`,
    });
    return response.text || text;
  } catch (e) {
    console.error("Translation error", e);
    return text; // Fallback to original
  }
};
