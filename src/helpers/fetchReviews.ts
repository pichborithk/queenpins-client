import { NewReviewData, Review } from '../type';

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

type CreateReview = {
  success: boolean;
  error: string | null;
  message: string;
  data: Review | null;
};

export async function createReview(
  token: string,
  productId: number,
  data: NewReviewData
): Promise<CreateReview> {
  const response = await fetch(`${BASE_URL}/reviews/${productId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}
