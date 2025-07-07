import { ServerAxiosConfig } from "@/constants/axios-config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { address: string } },
) {
  try {
    const address = params.address;
    const response = await fetch(
      `${ServerAxiosConfig.baseURL}/addresses/${address}`,
      {
        headers: {
          "X-Api-Key": ServerAxiosConfig.headers["X-Api-Key"] || "",
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Failed to fetch address data" },
      { status: 500 },
    );
  }
}
