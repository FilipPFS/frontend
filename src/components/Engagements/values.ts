import location from "./images/location.webp";
import ship from "./images/ship.webp";
import returnShip from "./images/return.webp";

type Value = {
  img: string;
  title: string;
  description: string;
};

export const values: Value[] = [
  {
    img: location,
    title: "Livraison à dommicile",
    description:
      "Dans un délai maximale de 7 jours après la confirmation de la commande.",
  },
  {
    img: ship,
    title: "Livraison grautite",
    description: "Pour les commmandes de plus de 60 euros.",
  },
  {
    img: returnShip,
    title: "Retours possible",
    description:
      "Retours possibles dans les 14 jours après la confirmation de la commande.",
  },
];
