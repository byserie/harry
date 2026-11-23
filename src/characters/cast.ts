export type Extra =
  | "glasses"
  | "scar"
  | "beard"
  | "bigBeard"
  | "wizardHat"
  | "witchHat"
  | "turban"
  | "pearls"
  | "mustache"
  | "elfEars"
  | "catFace"
  | "longHair"
  | "magicEye"
  | "redEyes";

export type HairStyle = "none" | "messy" | "short" | "bushy" | "slick" | "curtains" | "bun" | "curly";

export type CharDef = {
  name: string;
  color: string; // color fijo (bufanda + etiqueta)
  head: string; // cabeza clara
  hair: string;
  hairStyle: HairStyle;
  height: number; // multiplicador de tamaño
  width: number; // 0 = flaco, 1 = muy ancho
  extras: Extra[];
};

export const CAST = {
  harry: { name: "Harry", color: "#2f6fe4", head: "#e3eeff", hair: "#1e1e28", hairStyle: "messy", height: 1, width: 0, extras: ["glasses", "scar"] },
  ron: { name: "Ron", color: "#2fae4f", head: "#e2f7e6", hair: "#e0662a", hairStyle: "short", height: 1.04, width: 0, extras: [] },
  hermione: { name: "Hermione", color: "#8a4fe0", head: "#efe6ff", hair: "#7a4a2a", hairStyle: "bushy", height: 0.97, width: 0, extras: [] },
  hagrid: { name: "Hagrid", color: "#8a5a2b", head: "#f3e6d6", hair: "#4a2f17", hairStyle: "curly", height: 1.5, width: 1, extras: ["bigBeard"] },
  dumbledore: { name: "Dumbledore", color: "#f4f4f4", head: "#ffffff", hair: "#f2f2f2", hairStyle: "none", height: 1.06, width: 0, extras: ["beard", "wizardHat"] },
  snape: { name: "Snape", color: "#3a3f4a", head: "#dfe2e8", hair: "#16161c", hairStyle: "curtains", height: 1.05, width: 0, extras: [] },
  mcgonagall: { name: "McGonagall", color: "#1f6b45", head: "#dcefe4", hair: "#3b3b3b", hairStyle: "bun", height: 1.02, width: 0, extras: ["witchHat"] },
  draco: { name: "Draco", color: "#a9b4c2", head: "#f1f4f8", hair: "#ece3b8", hairStyle: "slick", height: 1, width: 0, extras: [] },
  quirrell: { name: "Quirrell", color: "#e8b923", head: "#fff6d6", hair: "#000000", hairStyle: "none", height: 1, width: 0, extras: ["turban"] },
  quirrell2: { name: "Quirrell", color: "#e8b923", head: "#fff6d6", hair: "#000000", hairStyle: "none", height: 1, width: 0, extras: [] },
  vernon: { name: "Vernon", color: "#7c7f86", head: "#ecedef", hair: "#3d3324", hairStyle: "short", height: 1.05, width: 0.75, extras: ["mustache"] },
  petunia: { name: "Petunia", color: "#ee6fa4", head: "#ffe6f0", hair: "#c9a25e", hairStyle: "bun", height: 1.03, width: 0, extras: ["pearls"] },
  dudley: { name: "Dudley", color: "#f6a5c6", head: "#fff0f6", hair: "#d9b46a", hairStyle: "short", height: 0.88, width: 0.85, extras: [] },
  neville: { name: "Neville", color: "#c0392b", head: "#fde3df", hair: "#6b4a2b", hairStyle: "short", height: 0.98, width: 0.2, extras: [] },
  ollivander: { name: "Ollivander", color: "#b08a5a", head: "#f5ecdf", hair: "#e6e6e6", hairStyle: "curly", height: 1, width: 0, extras: [] },
  duende: { name: "Duende", color: "#6e8b3d", head: "#e4edd2", hair: "#ffffff", hairStyle: "none", height: 0.7, width: 0.2, extras: [] },
  fantasma: { name: "Fantasma", color: "#cfe8ff", head: "#f4fbff", hair: "#ffffff", hairStyle: "none", height: 1, width: 0.3, extras: ["mustache"] },
  dobby: { name: "Dobby", color: "#8fd14f", head: "#e9f7d9", hair: "#000000", hairStyle: "none", height: 0.62, width: 0, extras: ["elfEars"] },
  lockhart: { name: "Lockhart", color: "#1abc9c", head: "#e0fbf5", hair: "#f2c94c", hairStyle: "messy", height: 1.05, width: 0, extras: [] },
  ginny: { name: "Ginny", color: "#ff6f61", head: "#ffe9e6", hair: "#e0662a", hairStyle: "bun", height: 0.9, width: 0, extras: ["longHair"] },
  riddle: { name: "Tom Riddle", color: "#7b1e3a", head: "#f3e3e8", hair: "#1a1a22", hairStyle: "slick", height: 1.02, width: 0, extras: [] },
  lucius: { name: "Lucius", color: "#5d6d7e", head: "#eef1f4", hair: "#efe6c2", hairStyle: "curtains", height: 1.08, width: 0, extras: [] },
  myrtle: { name: "Myrtle", color: "#9ad0ec", head: "#f0f9ff", hair: "#3b4a5a", hairStyle: "curtains", height: 0.92, width: 0, extras: ["glasses"] },
  fred: { name: "Fred", color: "#e67e22", head: "#fff0e0", hair: "#e0662a", hairStyle: "short", height: 1.08, width: 0, extras: [] },
  george: { name: "George", color: "#e67e22", head: "#fff0e0", hair: "#e0662a", hairStyle: "short", height: 1.08, width: 0, extras: [] },
  molly: { name: "Sra. Weasley", color: "#a0522d", head: "#ffece0", hair: "#e0662a", hairStyle: "bun", height: 0.95, width: 0.8, extras: [] },
  arthur: { name: "Sr. Weasley", color: "#5d8aa8", head: "#e8f1f8", hair: "#e0662a", hairStyle: "short", height: 1.05, width: 0.1, extras: ["glasses"] },
  hermionecat: { name: "Hermione", color: "#8a4fe0", head: "#efe6ff", hair: "#7a4a2a", hairStyle: "bushy", height: 0.97, width: 0, extras: ["catFace"] },
  crabbe: { name: "Crabbe", color: "#4f5d4f", head: "#e6ebe6", hair: "#3a3a3a", hairStyle: "short", height: 1.08, width: 0.9, extras: [] },
  goyle: { name: "Goyle", color: "#4f5d4f", head: "#e6ebe6", hair: "#2a2a2a", hairStyle: "short", height: 1.1, width: 0.95, extras: [] },
  sirius: { name: "Sirius", color: "#1f3a5f", head: "#e6ecf3", hair: "#141418", hairStyle: "curtains", height: 1.07, width: 0, extras: [] },
  lupin: { name: "Lupin", color: "#a1887f", head: "#f3ece8", hair: "#8d6e63", hairStyle: "short", height: 1.04, width: 0, extras: [] },
  pettigrew: { name: "Pettigrew", color: "#b5a642", head: "#f7f3dc", hair: "#9e9e7a", hairStyle: "none", height: 0.85, width: 0.7, extras: [] },
  trelawney: { name: "Trelawney", color: "#d35dbf", head: "#fbe7f7", hair: "#8a6d3b", hairStyle: "bushy", height: 1, width: 0, extras: ["glasses", "pearls"] },
  marge: { name: "Tía Marge", color: "#e57373", head: "#ffe6e6", hair: "#6d5c4d", hairStyle: "short", height: 1.0, width: 0.95, extras: [] },
  cedric: { name: "Cedric", color: "#f4d03f", head: "#fffbe6", hair: "#6b4a2b", hairStyle: "short", height: 1.08, width: 0, extras: [] },
  krum: { name: "Krum", color: "#9b1c1c", head: "#fbe3e3", hair: "#1a1a1a", hairStyle: "short", height: 1.1, width: 0.3, extras: [] },
  fleur: { name: "Fleur", color: "#5dade2", head: "#eaf6ff", hair: "#f5e6a8", hairStyle: "curtains", height: 1.02, width: 0, extras: ["longHair"] },
  moody: { name: "Moody", color: "#7f6b5a", head: "#efe6dc", hair: "#7a7a7a", hairStyle: "curly", height: 1.08, width: 0.2, extras: ["magicEye"] },
  barty: { name: "Barty Crouch", color: "#5d6d3e", head: "#eef2e2", hair: "#c9a25e", hairStyle: "messy", height: 1.03, width: 0, extras: [] },
  voldemort: { name: "Voldemort", color: "#1b1b1b", head: "#f2f4f2", hair: "#000000", hairStyle: "none", height: 1.12, width: 0, extras: ["redEyes"] },
  umbridge: { name: "Umbridge", color: "#ff8fc7", head: "#ffe3f1", hair: "#a0785a", hairStyle: "bun", height: 0.9, width: 0.7, extras: ["pearls"] },
  luna: { name: "Luna", color: "#af7ac5", head: "#f7efff", hair: "#f2e6a8", hairStyle: "curtains", height: 0.95, width: 0, extras: ["longHair"] },
  cho: { name: "Cho", color: "#17a589", head: "#e6faf5", hair: "#16161c", hairStyle: "curtains", height: 0.97, width: 0, extras: ["longHair"] },
  bellatrix: { name: "Bellatrix", color: "#4a235a", head: "#f2e6f2", hair: "#120a12", hairStyle: "bushy", height: 1.03, width: 0, extras: [] },
  tonks: { name: "Tonks", color: "#7d3c98", head: "#f9ecff", hair: "#ff4fa3", hairStyle: "messy", height: 1.0, width: 0, extras: [] },
  slughorn: { name: "Slughorn", color: "#c39b55", head: "#fdf1dc", hair: "#e8d8b0", hairStyle: "none", height: 1.0, width: 1, extras: ["mustache"] },
  lavender: { name: "Lavender", color: "#e6a0f0", head: "#fdeffd", hair: "#e8c070", hairStyle: "curtains", height: 0.95, width: 0, extras: ["longHair"] },
} satisfies Record<string, CharDef>;

export type CharId = keyof typeof CAST;

export const INK = "#1b1b2f";
