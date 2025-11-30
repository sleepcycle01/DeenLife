import { GoogleGenAI } from "@google/genai";

// Use a dynamic import for window.aistudio to avoid issues in non-browser environments
const getGeminiApiKeyStatus = async (): Promise<boolean> => {
    if (typeof window !== 'undefined' && (window as any).aistudio && typeof (window as any).aistudio.hasSelectedApiKey === 'function') {
        return await (window as any).aistudio.hasSelectedApiKey();
    }
    // Assume API_KEY is present if window.aistudio is not available (e.g., local dev)
    return !!process.env.API_KEY;
};

const openGeminiApiKeySelector = async (): Promise<void> => {
    if (typeof window !== 'undefined' && (window as any).aistudio && typeof (window as any).aistudio.openSelectKey === 'function') {
        await (window as any).aistudio.openSelectKey();
    } else {
        console.warn("window.aistudio.openSelectKey is not available.");
        alert("Please ensure your environment supports AI Studio API key selection.");
    }
};

/**
 * Fetches an explanation for a given Dua using the Gemini API.
 * @param arabic The Arabic text of the Dua.
 * @param transliteration The transliterated text of the Dua.
 * @param english The English translation of the Dua.
 * @returns A ReadableStream of strings with the explanation chunks.
 * @throws Error if API key is not available or if the API call fails.
 */
export async function getDuaExplanationStream(
    arabic: string,
    transliteration: string,
    english: string
): Promise<ReadableStream<string>> {
    // Per guidelines, do NOT explicitly check isApiKeySelected here, as it can lead to race conditions.
    // Assume process.env.API_KEY is available after openSelectKey() has been called.
    // The actual API call's failure will determine if the key is truly invalid.

    // Create a new GoogleGenAI instance right before making an API call
    // to ensure it uses the most up-to-date API key from the dialog.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const systemInstruction = `You are an Islamic scholar and helpful assistant. Provide a comprehensive explanation of the following Dua, including its meaning, context, benefits, and any relevant Islamic teachings. Format your response clearly with paragraphs and headings if appropriate.`;

    const prompt = `
Please explain the following Dua:

Arabic:
\`\`\`
${arabic}
\`\`\`

Transliteration:
\`\`\`
${transliteration}
\`\`\`

English Meaning:
\`\`\`
${english}
\`\`\`
`;

    try {
        const response = await ai.models.generateContentStream({
            model: "gemini-3-pro-preview", // Suitable model for complex text explanation
            contents: [{ parts: [{ text: prompt }] }],
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.7, // Balance creativity and factual accuracy
                topP: 0.95,
                topK: 64,
            },
        });

        // Convert the async iterator to a ReadableStream
        let controller: ReadableStreamDefaultController<string>;
        const stream = new ReadableStream<string>({
            start(c) {
                controller = c;
                (async () => {
                    try {
                        for await (const chunk of response) {
                            const textChunk = chunk.text;
                            if (textChunk) {
                                controller.enqueue(textChunk);
                            }
                        }
                        controller.close();
                    } catch (error) {
                        console.error("Error during Gemini stream processing:", error);
                        // If it's a "Requested entity was not found" error, it might be an API key issue.
                        if (error instanceof Error && error.message.includes("Requested entity was not found.")) {
                            console.error("Gemini API call failed, possibly due to invalid or unselected API key.");
                            // Attempt to open API key selector, but don't block the stream
                            openGeminiApiKeySelector().catch(e => console.error("Error opening API key selector after API failure:", e));
                            // Re-throw with a specific message that the UI can catch to reset API key status
                            controller.error(new Error("API_KEY_ISSUE: API key might be invalid or unselected. Please try selecting it again."));
                        } else {
                            controller.error(error);
                        }
                    }
                })();
            },
            cancel() {
                // Cleanup if the consumer cancels the stream
                console.log("Gemini explanation stream cancelled.");
            }
        });
        return stream;

    } catch (error: any) {
        console.error("Error calling Gemini API:", error);
        // If the initial connection/setup fails, re-throw with a specific message
        if (error instanceof Error && error.message.includes("Requested entity was not found.")) {
            openGeminiApiKeySelector().catch(e => console.error("Error opening API key selector after initial API failure:", e));
            throw new Error("API_KEY_ISSUE: Failed to connect to Gemini API, key might be invalid or unselected.");
        }
        throw new Error(`Failed to get explanation: ${error.message}`);
    }
}

export { getGeminiApiKeyStatus, openGeminiApiKeySelector };