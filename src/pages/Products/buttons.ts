type Button = {
  categorie: string;
  jsx: string;
  isSelected: boolean;
};

type Buttons = Button[];

export const buttons: Buttons = [
  {
    categorie: "all",
    jsx: "Tous",
    isSelected: false,
  },
  {
    categorie: "clothes",
    jsx: "Vêtements",
    isSelected: false,
  },
  {
    categorie: "gym",
    jsx: "Gym",
    isSelected: false,
  },
  {
    categorie: "sport",
    jsx: "Sport",
    isSelected: false,
  },
  {
    categorie: "notebooks",
    jsx: "Cahiers",
    isSelected: false,
  },
  {
    categorie: "technology",
    jsx: "Technologie",
    isSelected: false,
  },
];
