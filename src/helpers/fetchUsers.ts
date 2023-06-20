import { RegisterData, UserData } from '../type';

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

type FetchUser = {
  success: boolean;
  error: string | null;
  message: string;
  data: UserData | null;
};

type FetchToken = {
  success: boolean;
  error: string | null;
  message: string;
  data: (UserData & { token: string }) | null;
};

export async function fetchUserData(token: string): Promise<FetchUser> {
  const response = await fetch(`${BASE_URL}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}

export async function registerUser(data: RegisterData): Promise<FetchToken> {
  const response = await fetch(`${BASE_URL}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}
