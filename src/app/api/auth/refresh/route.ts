import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    return NextResponse.json(
      { message: "API URL not configured" },
      { status: 500 }
    );
  }

  try {
    // Forward cookies từ client request đến backend
    const cookieHeader = request.headers.get("cookie") || "";

    const response = await fetch(`${apiBaseUrl}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      credentials: "include",
    });

    const data = await response.json();

    // Tạo response và forward Set-Cookie headers từ backend
    const nextResponse = NextResponse.json(data, { status: response.status });

    // Forward tất cả Set-Cookie headers từ backend response
    const setCookieHeaders = response.headers.getSetCookie();
    setCookieHeaders.forEach((cookie) => {
      nextResponse.headers.append("Set-Cookie", cookie);
    });

    return nextResponse;
  } catch (error) {
    console.error("Refresh proxy error:", error);
    return NextResponse.json(
      { message: "Failed to refresh token" },
      { status: 500 }
    );
  }
}






