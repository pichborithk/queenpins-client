import { ProductAddToCart } from '../type';

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

type FetchCart = {
  success: boolean;
  error: string | null;
  message: string;
  data: ProductAddToCart[] | null;
};

export async function fetchUserCart(token: string): Promise<FetchCart> {
  const response = await fetch(`${BASE_URL}/carts/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

export async function addProductToCart(
  token: string,
  productId: number,
  quantity: number
) {
  const response = await fetch(`${BASE_URL}/carts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId, quantity }),
  });
  return await response.json();
}