import { v4 as uuidv4 } from "uuid";
import chemise from "./images/chemise.webp";

export type Product = {
  id: string;
  title: string;
  description: string;
  img: string;
  price: number;
  cateogory: string;
  inStock: boolean;
};

export const products: Product[] = [
  {
    id: uuidv4(),
    title: "Product 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et ante sed lorem commodo gravida. Fusce id cursus sapien. Nullam nec arcu sed velit convallis facilisis. Aenean non sem purus. Nullam tincidunt ligula vel libero consectetur, et tincidunt justo interdum. In hac habitasse platea dictumst.",
    img: "https://png.pngtree.com/png-clipart/20230930/original/pngtree-white-t-shirt-mockup-realistic-t-shirt-png-image_13020297.png",
    price: 9000,
    cateogory: "clothes",
    inStock: true,
  },
  {
    id: uuidv4(),
    title: "Product 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et ante sed lorem commodo gravida. Fusce id cursus sapien. Nullam nec arcu sed velit convallis facilisis. Aenean non sem purus. Nullam tincidunt ligula vel libero consectetur, et tincidunt justo interdum. In hac habitasse platea dictumst.",
    img: "https://i.pinimg.com/originals/64/b1/9d/64b19d66335be48d28eb34efbf3848f4.png",
    price: 5000,
    cateogory: "sport",
    inStock: true,
  },
  {
    id: uuidv4(),
    title: "Product 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et ante sed lorem commodo gravida. Fusce id cursus sapien. Nullam nec arcu sed velit convallis facilisis. Aenean non sem purus. Nullam tincidunt ligula vel libero consectetur, et tincidunt justo interdum. In hac habitasse platea dictumst.",
    img: "https://pngimg.com/d/jeans_PNG5748.png",
    price: 1000,
    cateogory: "clothes",
    inStock: false,
  },
  {
    id: uuidv4(),
    title: "Product 4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et ante sed lorem commodo gravida. Fusce id cursus sapien. Nullam nec arcu sed velit convallis facilisis. Aenean non sem purus. Nullam tincidunt ligula vel libero consectetur, et tincidunt justo interdum. In hac habitasse platea dictumst.",
    img: "https://purepng.com/public/uploads/large/purepng.com-apple-iphone-xappleapple-iphonephonesmartphonemobile-devicetouch-screeniphone-xiphone-10electronicsobjects-251530689694ct0pa.png",
    price: 12000,
    cateogory: "technology",
    inStock: true,
  },
  {
    id: uuidv4(),
    title: "Product 5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et ante sed lorem commodo gravida. Fusce id cursus sapien. Nullam nec arcu sed velit convallis facilisis. Aenean non sem purus. Nullam tincidunt ligula vel libero consectetur, et tincidunt justo interdum. In hac habitasse platea dictumst.",
    img: "https://static.vecteezy.com/system/resources/thumbnails/009/589/249/small_2x/notebook-icon-transparent-free-png.png",
    price: 4500,
    cateogory: "notebooks",
    inStock: false,
  },
  {
    id: uuidv4(),
    title: "Product 6",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et ante sed lorem commodo gravida. Fusce id cursus sapien. Nullam nec arcu sed velit convallis facilisis. Aenean non sem purus. Nullam tincidunt ligula vel libero consectetur, et tincidunt justo interdum. In hac habitasse platea dictumst.",
    img: "https://static.vecteezy.com/system/resources/previews/018/924/261/original/3d-two-dumbbell-png.png",
    price: 10300,
    cateogory: "gym",
    inStock: true,
  },
  {
    id: uuidv4(),
    title: "Product 7",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et ante sed lorem commodo gravida. Fusce id cursus sapien. Nullam nec arcu sed velit convallis facilisis. Aenean non sem purus. Nullam tincidunt ligula vel libero consectetur, et tincidunt justo interdum. In hac habitasse platea dictumst.",
    img: "https://www.wilson.com/en-us/media/catalog/product/article_images/WTB7500ID_/WTB7500ID__b722ae318490e0f2e686864dc70fd730.png",
    price: 2500,
    cateogory: "sport",
    inStock: true,
  },
  {
    id: uuidv4(),
    title: "Product 8",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et ante sed lorem commodo gravida. Fusce id cursus sapien. Nullam nec arcu sed velit convallis facilisis. Aenean non sem purus. Nullam tincidunt ligula vel libero consectetur, et tincidunt justo interdum. In hac habitasse platea dictumst.",
    img: "https://duga.ma/4439-home_default/ordinateur-portable-asus-e410m-bv1182t-90nb0q11-m33020-nafida2.jpg",
    price: 60000,
    cateogory: "technology",
    inStock: true,
  },
  {
    id: uuidv4(),
    title: "Product 9",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et ante sed lorem commodo gravida. Fusce id cursus sapien. Nullam nec arcu sed velit convallis facilisis. Aenean non sem purus. Nullam tincidunt ligula vel libero consectetur, et tincidunt justo interdum. In hac habitasse platea dictumst.",
    img: chemise,
    price: 4200,
    cateogory: "clothes",
    inStock: true,
  },
];
