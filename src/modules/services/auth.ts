import { signIn } from 'next-auth/react';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface SignInResponse {
  error?: string | null;
  status: number;
  ok: boolean;
  url?: string | null;
}

export const login = async ({ username, password }: LoginPayload): Promise<SignInResponse> => {
  const result = await signIn('credentials', {
    redirect: false,
    username,
    password,
  });

  if (!result) {
    throw new Error('Login failed');
  }

  if (result.error) {
    throw new Error(result.error);
  }

  return result;
};
