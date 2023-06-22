import { Dispatch, SetStateAction } from 'react';

type RootContext = {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
  products: Product[];
  cart: ProductAddToCart[];
  setCart: Dispatch<SetStateAction<ProductAddToCart[]>>;
  mergeUserCart: (
    token: string,
    local_cart: ProductAddToCart[]
  ) => Promise<void>;
  getUserCart: (token: string) => Promise<void>;
  setProducts: Dispatch<SetStateAction<Product[]>>;
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

type ProductAddToCart = {
  id: number;
  name: string;
  description: string;
  price: string;
  quantity: number;
  photos: Photo[];
};

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
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

type NewProductData = {
  name: string;
  description: string;
  price: string;
  quantity: number;
  urls: string[];
};
