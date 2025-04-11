import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({
        error: "Method not allowed, only POST requests are accepted.",
      }),
      { status: 405 }
    );
  }

  const messages = await req.json();

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash", // Or another Gemini model
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  try {
    const chatSession = model.startChat({
      generationConfig,
      // safetySettings: Adjust safety settings
      // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: messages, // Pass the messages as history
    });

    const result = await chatSession.sendMessage(messages.slice(-1)[0].content); // Send the last message as input

    // Check if tool_calls are present in the response (Gemini doesn't have this yet)
    // You'll need to parse the response and identify tool calls yourself
    const toolCalls = parseToolCallsFromResponse(result.response.text());

    if (!toolCalls) {
      return new Response(JSON.stringify({ mode: "chat", arg: "" }), {
        status: 200,
      });
    }

    // Process the tool calls if present
    const firstToolCall = toolCalls[0];
    const modeAndArguments =
      Object.keys(firstToolCall.function.arguments).length === 2
        ? ""
        : firstToolCall.function.arguments;

    return new Response(
      JSON.stringify({
        mode: firstToolCall.function.name,
        arg: modeAndArguments,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process the input" }),
      { status: 500 }
    );
  }
}

// Function to parse tool calls from Gemini's response
// This is a placeholder and needs to be implemented based on how you
// want Gemini to indicate tool calls in its response
function parseToolCallsFromResponse(responseText: string): any[] | undefined {
  // Implement your logic to extract tool calls from the response text
  // For example, you might look for specific keywords or patterns
  // and return an array of tool call objects similar to OpenAI's format
  return undefined; // Replace with your implementation
}