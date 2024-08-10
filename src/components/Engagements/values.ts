import location from "./images/location.webp";
import ship from "./images/ship.webp";
import returnShip from "./images/return.webp";

type Value = {
  img: string;
  title: string;
  description: string;
  alt: string;
};

export const values: Value[] = [
  {
    img: location,
    title: "Livraison à dommicile",
    description:
      "Dans un délai maximale de 7 jours après la confirmation de la commande.",
    alt: "Icone de location",
  },
  {
    img: ship,
    title: "Livraison grautite",
    description: "Pour les commmandes de plus de 60 euros.",
    alt: "Icone de sac",
  },
  {
    img: returnShip,
    title: "Retours possible",
    description:
      "Retours possibles dans les 14 jours après la confirmation de la commande.",
    alt: "Icone de remboursement",
  },
];
