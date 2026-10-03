import { portfolioData } from "./portfolioData";

export interface Theme {
  id: string;
  name: string;
  icon: string;
  dotColor: string;
  description: string;
}

export const getThemes = (): Theme[] => [
  {
    id: "tokyo-night",
    name: "Tokyo Night",
    icon: "🌃",
    dotColor: "#7aa2f7",
    description:
      "Clean dark theme celebrating the neon lights of Downtown Tokyo",
  },
  {
    id: "suyash-dark",
    name: `${portfolioData.personal.firstName} Dark`,
    icon: "💜",
    dotColor: "#007acc",
    description:
      "Default modern VS Code dark with vibrant pink and cyan accents",
  },
  {
    id: "rose-pine",
    name: "Rosé Pine",
    icon: "🌸",
    dotColor: "#eb6f92",
    description: "All natural pine, faux fur and a bit of soho vibes",
  },
  {
    id: "catppuccin",
    name: "Catppuccin",
    icon: "🐱",
    dotColor: "#cba6f7",
    description: "Soothing pastel theme with warm lavender & peach accents",
  },
  {
    id: "nord",
    name: "Nord",
    icon: "🧊",
    dotColor: "#88c0d0",
    description: "Arctic, north-bluish clean and elegant frosty palette",
  },
  {
    id: "gruvbox",
    name: "Gruvbox",
    icon: "🔥",
    dotColor: "#fabd2f",
    description: "Retro groove warm theme with rich earthy contrast",
  },
];
