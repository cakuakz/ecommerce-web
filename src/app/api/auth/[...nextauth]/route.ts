import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';

import { authOptions } from './authOptions';

type CombineRequest = Request & NextApiRequest;
type CombineResponse = Response & NextApiResponse;

const handler = (req: CombineRequest, res: CombineResponse) => {
  return NextAuth(req, res,authOptions);
};

export { handler as GET, handler as POST };
