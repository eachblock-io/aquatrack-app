import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import { serialize } from "cookie";

export async function POST(req: Request, res: NextRequest) {
  const body = await req.json();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const resData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    }
  );

  const data = await resData.json();
  const token = data?.data?.token;

  const serialized = serialize(`token`, token, {
    httpOnly: true,
    secure: process.env.NEXT_PUBLIC_NODE_ENV !== `development`,
    maxAge: 60 * 60 * 24 * 1, // 1 day
    sameSite: `strict`,
    path: `/`,
  });

  const response = {
    message: "Authenticated!",
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Set-cookie": serialized },
  });
}
