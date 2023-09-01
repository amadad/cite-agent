import { OpenAIStream } from "@/utils/answer";

export const config = {
  runtime: "edge"
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { prompt } = (await req.json()) as {
      prompt: string;
    };
    
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error("OPENAI_API_KEY is not set in environment variables.");
      return new Response("Server Configuration Error", { status: 500 });
    }

    const stream = await OpenAIStream(prompt, apiKey);

    return new Response(stream);
  } catch (error) {
    console.error(error);
    
    // Using a type assertion for the error message
    const errorMessage = (error as Error).message || "An unexpected error occurred";
    
    return new Response(`Error: ${errorMessage}`, { status: 500 });
  }
};

export default handler;
