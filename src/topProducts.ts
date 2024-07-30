export type TopProduct = {
  _id: string;
  title: string;
  description: string;
  img: string;
  newPrice: number;
  oldPrice: number;
  stock?: number;
};

export type FormOffer = {
  title: string;
  description: string;
  img: string;
  newPrice: number;
  oldPrice: number;
  stock?: number;
};
