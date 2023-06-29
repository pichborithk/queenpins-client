import { Dispatch, SetStateAction } from 'react';

type RootContext = {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  userData: UserData;
  getUserData: (token: string) => Promise<void>;
  products: Product[];
  cart: ProductAddToCart[];
  setCart: Dispatch<SetStateAction<ProductAddToCart[]>>;
  setProducts: Dispatch<SetStateAction<Product[]>>;
  mergeCart: (
    localCart: ProductAddToCart[],
    databaseCart: ProductAddToCart[]
  ) => ProductAddToCart[];
  getInitialData: (
    token: string,
    localCart: ProductAddToCart[]
  ) => Promise<void>;
};

type ViewProductContext = {
  token: string;
  setProducts: Dispatch<SetStateAction<Product[]>>;
  product: Product;
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
  title: string;
  description: string;
  price: string;
  quantity: number;
  pictures: Picture[];
};

type Product = {
  id: number;
  title: string;
  description: string;
  price: string;
  quantity: number;
  type: string;
  reviews: Review[];
  pictures: Picture[];
};

type Picture = {
  url: string;
};

type Review = {
  id: number;
  content: string;
  rate: number;
  userId: number;
  email: string;
  name: string;
};

type NewProductData = {
  title: string;
  description: string;
  price: string;
  quantity: number;
  urls: string[];
};
