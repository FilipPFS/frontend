import { nanoid } from "nanoid";

export type topProduct = {
  id: string;
  title: string;
  description: string;
  img: string;
  newPrice: number;
  oldPrice: number;
};

export const topProducts: topProduct[] = [
  {
    id: nanoid(),
    title: "Product 1",
    description: "Product 1 description",
    img: "",
    newPrice: 2000,
    oldPrice: 6000,
  },
  {
    id: nanoid(),
    title: "Product 2",
    description: "Product 2 description",
    img: "",
    newPrice: 4000,
    oldPrice: 20000,
  },
  {
    id: nanoid(),
    title: "Product 3",
    description: "Product 3 description",
    img: "",
    newPrice: 1500,
    oldPrice: 7500,
  },
];
