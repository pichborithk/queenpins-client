import { ProductAddToCart } from '../type';

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

export async function checkOutCart(token: string, cart: ProductAddToCart[]) {
  const response = await fetch(`${BASE_URL}/checkout`, {
    method: 'POST',
    headers: {
      Authorization: `${token && `Bearer ${token}`}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cart }),
  });

  return await response.json();
}
