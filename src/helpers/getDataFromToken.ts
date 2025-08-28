import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface TokenData {
  id: string;
  username?: string;
  email?: string;
  iat?: number;
  exp?: number;
}

export const getDataFromToken = (request: NextRequest): string => {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      throw new Error("No token found");
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as TokenData;

    if (!decodedToken.id) {
      throw new Error("Invalid token");
    }

    return decodedToken.id;
  } catch (error: unknown) {
    const e = error as Error;
    throw new Error(e.message);
  }
};
