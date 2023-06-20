import { Product } from '../type';

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

type FetchProduct = {
  success: boolean;
  error: string | null;
  message: string;
  data: {
    products: Product[];
  } | null;
};

export async function fetchProducts(): Promise<FetchProduct> {
  const response = await fetch(`${BASE_URL}/products`);

  return await response.json();
}
