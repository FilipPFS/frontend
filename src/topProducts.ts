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
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et ante sed lorem commodo gravida. Fusce id cursus sapien. Nullam nec arcu sed velit convallis facilisis. Aenean non sem purus. Nullam tincidunt ligula vel libero consectetur, et tincidunt justo interdum. In hac habitasse platea dictumst.",
    img: "https://www.pngall.com/wp-content/uploads/5/Hyperx-Cloud-II-Gaming-Headset-PNG.png",
    newPrice: 4500,
    oldPrice: 9000,
  },
  {
    id: nanoid(),
    title: "Product 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et ante sed lorem commodo gravida. Fusce id cursus sapien. Nullam nec arcu sed velit convallis facilisis. Aenean non sem purus. Nullam tincidunt ligula vel libero consectetur, et tincidunt justo interdum. In hac habitasse platea dictumst.",
    img: "https://www.atozpartyrental.net/wp-content/uploads/2018/07/Table-Tennis.png",
    newPrice: 19000,
    oldPrice: 45000,
  },
  {
    id: nanoid(),
    title: "Product 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et ante sed lorem commodo gravida. Fusce id cursus sapien. Nullam nec arcu sed velit convallis facilisis. Aenean non sem purus. Nullam tincidunt ligula vel libero consectetur, et tincidunt justo interdum. In hac habitasse platea dictumst.",
    img: "https://png.pngtree.com/png-vector/20230430/ourmid/pngtree-white-suit-png-image_7076833.png",
    newPrice: 3000,
    oldPrice: 12000,
  },
];
