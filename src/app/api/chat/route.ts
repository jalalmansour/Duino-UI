/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  Part,
} from "@google/generative-ai";
import { StreamingTextResponse } from "ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const runtime = "edge";

export async function POST(req: Request) {
  const {
    messages,
    temperature = 0.7,
    max_tokens = 1024,
    top_p = 0.95,
  } = await req.json();

  const generationConfig = {
    temperature: temperature,
    topP: top_p,
    topK: 64,
    maxOutputTokens: max_tokens,
  };

  try {
    // Convert messages to Gemini format
    const geminiHistory = [];
    const latestUserMessage = messages[messages.length - 1];

    // If we have more than one message, we need to convert the history
    if (messages.length > 1) {
      for (let i = 0; i < messages.length - 1; i++) {
        const msg = messages[i];
        geminiHistory.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        });
      }
    }

    // Initialize chat
    const chatSession = model.startChat({
      generationConfig,
      history: geminiHistory,
    });

    // Stream the response
    const result = await chatSession.sendMessageStream(latestUserMessage.content);

    const stream = new ReadableStream({
      async start(controller) {
        // Array to store chunks for the full message
        const textDecoder = new TextDecoder();

        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            controller.enqueue(new TextEncoder().encode(text));
          }
          controller.close();
        } catch (error) {
          console.error("Error in stream processing:", error);
          controller.error(error);
        }
      },
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process the input" }),
      { status: 500 }
    );
  }
}
