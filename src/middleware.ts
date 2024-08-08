import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const middleware = async (req: NextRequest) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    '/(authenticate)/',
  ],
};
