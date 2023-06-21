import { Dispatch, SetStateAction } from 'react';

type RootContext = {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
  products: Product[];
};

type RegisterData = {
  email: string;
  name: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

type UserData = {
  id: number | null;
  email: string;
  name: string;
  type: string;
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
