export type Product = {
  _id: string;
  title: string;
  description: string;
  img: string;
  price: number;
  category: string;
  stock?: number;
  inStock: boolean;
};

export type FormProduct = {
  title: string;
  description: string;
  img: string;
  price: number;
  category: string;
  stock?: number;
  inStock: boolean;
};
