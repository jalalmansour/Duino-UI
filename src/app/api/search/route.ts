import { NextRequest, NextResponse } from "next/server";

const DUCKDUCKGO_SEARCH_URL = "https://api.duckduckgo.com/";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q || typeof q !== "string") {
    return new NextResponse(
      JSON.stringify({
        message: 'Query parameter "q" is required and must be a string.',
      }),
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${DUCKDUCKGO_SEARCH_URL}?q=${encodeURIComponent(q)}&format=json&no_html=1`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json({ message: "Success", data });
  } catch (error) {
    console.error("DuckDuckGo API request error:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
