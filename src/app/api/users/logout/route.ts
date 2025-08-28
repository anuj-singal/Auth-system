import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    // Clear the cookie
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0), // Expire immediately
    });

    return response;
  } catch (error: unknown) {
    const e = error as Error;
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
