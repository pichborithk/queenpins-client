import { Dispatch, SetStateAction } from 'react';

type RootContext = {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  products: Product[];
};

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  reviews: Review[];
  photos: Photo[];
};

type Photo = {
  url: string;
};

type Review = {
  id: number;
  content: string;
  userId: number;
  email: string;
  name: string;
};
