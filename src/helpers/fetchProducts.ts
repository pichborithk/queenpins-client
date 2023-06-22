import { NewProductData, Product } from '../type';

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

type FetchProduct = {
  success: boolean;
  error: string | null;
  message: string;
  data: {
    products: Product[];
  } | null;
};

type CreateProduct = {
  success: boolean;
  error: string | null;
  message: string;
  data: Product | null;
};

export async function fetchProducts(): Promise<FetchProduct> {
  const response = await fetch(`${BASE_URL}/products`);

  return await response.json();
}

export async function createProduct(
  token: string,
  data: NewProductData
): Promise<CreateProduct> {
  const response = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

export async function updateProduct(
  token: string,
  productId: number,
  data: NewProductData
): Promise<CreateProduct> {
  const response = await fetch(`${BASE_URL}/products/${productId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

export async function deleteProduct(
  token: string,
  productId: number
): Promise<CreateProduct> {
  const response = await fetch(`${BASE_URL}/products/${productId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}
