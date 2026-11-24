import { CharId } from "../characters/cast";
import { PoseName } from "../lib/pose";

/** Un clip: película, escena, segundo dentro de la escena donde arranca, y qué pasa. */
export type Clip = { f: number; s: string; t: number; txt: string };
export type EditDef = {
  id: string;
  title: string;
  sub: string;
  end: string;
  who: CharId[]; // retrato(s) de la ficha
  pose: PoseName;
  facts: [string, string][];
  stats: [string, number][];
  intro: Clip;
  build: [Clip, Clip];
  drop: Clip[]; // 8 clips
};

export const FILM_NAME: Record<number, string> = {
  1: "La piedra filosofal",
  2: "La cámara secreta",
  3: "El prisionero de Azkaban",
  4: "El cáliz de fuego",
  5: "La Orden del Fénix",
  6: "El misterio del príncipe",
  7: "Las reliquias de la muerte 1",
  8: "Las reliquias de la muerte 2",
};

export const EDITS: EditDef[] = [
  {
    id: "saga",
    title: "HARRY POTTER",
    sub: "8 películas · 1 historia",
    end: "La saga completa en el canal",
    who: ["ron", "harry", "hermione"],
    pose: "wandUp",
    facts: [
      ["Películas", "8"],
      ["Años en Hogwarts", "7"],
      ["Horrocruxes", "7"],
      ["El niño que vivió", "1 ⚡"],
    ],
    stats: [],
    intro: { f: 1, s: "p1_hagrid", t: 0.3, txt: "" },
    build: [
      { f: 1, s: "p1_cartas", t: 5.2, txt: "Todo empezó con una carta…" },
      { f: 1, s: "p2_varita", t: 3.0, txt: "…y una varita que eligió a su mago" },
    ],
    drop: [
      { f: 1, s: "p5_quirrell", t: 1.2, txt: "Voldemort escondido en un turbante" },
      { f: 2, s: "p5_lucha", t: 4.3, txt: "Harry le clava la espada al basilisco" },
      { f: 3, s: "ciervo", t: 8.1, txt: "Un patronus contra cien dementores" },
      { f: 4, s: "dragon", t: 1.9, txt: "Robarle un huevo de oro a un dragón" },
      { f: 5, s: "duelo", t: 3.3, txt: "Dumbledore contra Voldemort" },
      { f: 6, s: "cueva", t: 13.9, txt: "Fuego contra los inferi en la cueva" },
      { f: 7, s: "cierva", t: 6.9, txt: "La espada en el fondo del lago helado" },
      { f: 8, s: "duelo", t: 10.1, txt: "El duelo final: Harry contra Voldemort" },
    ],
  },
  {
    id: "harry",
    title: "EL ELEGIDO",
    sub: "Harry Potter",
    end: "El niño que vivió ⚡",
    who: ["harry"],
    pose: "wandUp",
    facts: [
      ["Casa", "Gryffindor 🦁"],
      ["Varita", "Acebo y pluma de fénix"],
      ["Patronus", "Un ciervo 🦌"],
      ["Marca", "Cicatriz de rayo ⚡"],
    ],
    stats: [["Valentía", 100], ["Suerte", 95], ["Quidditch", 92]],
    intro: { f: 1, s: "p1_hagrid", t: 0.3, txt: "" },
    build: [
      { f: 1, s: "p1_zoo", t: 3.7, txt: "Habla con las serpientes sin saberlo 🐍" },
      { f: 1, s: "p2_varita", t: 3.0, txt: "La varita lo elige a él ✨" },
    ],
    drop: [
      { f: 1, s: "p3_troll", t: 1.5, txt: "Con 11 años enfrenta a un troll" },
      { f: 1, s: "p5_lucha", t: 2.2, txt: "El amor de su mamá quema a Quirrell" },
      { f: 2, s: "p5_lucha", t: 4.3, txt: "Mata al basilisco con la espada de Gryffindor" },
      { f: 3, s: "ciervo", t: 8.1, txt: "Su patronus espanta a cien dementores" },
      { f: 4, s: "dragon", t: 1.9, txt: "Le roba el huevo de oro a un dragón" },
      { f: 4, s: "duelo", t: 0.0, txt: "Cara a cara con Voldemort en el cementerio" },
      { f: 7, s: "cierva", t: 6.9, txt: "Se tira al lago helado por la espada" },
      { f: 8, s: "duelo", t: 10.1, txt: "Derrota a Voldemort para siempre" },
    ],
  },
  {
    id: "voldemort",
    title: "EL QUE NO DEBE SER NOMBRADO",
    sub: "Lord Voldemort",
    end: "Lord Voldemort 🐍",
    who: ["voldemort"],
    pose: "wandUp",
    facts: [
      ["Nombre real", "Tom Sorvolo Riddle"],
      ["Casa", "Slytherin 🐍"],
      ["Varita", "Tejo y pluma de fénix"],
      ["Horrocruxes", "7 pedazos de alma"],
    ],
    stats: [["Poder", 99], ["Maldad", 100], ["Nariz", 0]],
    intro: { f: 4, s: "ritual", t: 9.4, txt: "" },
    build: [
      { f: 1, s: "p5_voldemort", t: 2.3, txt: "Escondido en la nuca de Quirrell" },
      { f: 2, s: "p5_riddle", t: 5.8, txt: "Tom Riddle: su recuerdo de joven" },
    ],
    drop: [
      { f: 4, s: "ritual", t: 2.4, txt: "Renace en un caldero con sangre de Harry" },
      { f: 4, s: "mortifagos", t: 9.4, txt: "Llama a todos sus mortífagos" },
      { f: 4, s: "duelo", t: 0.0, txt: "Varitas hermanas: los rayos se unen" },
      { f: 5, s: "duelo", t: 3.3, txt: "Duelo contra Dumbledore en el Ministerio" },
      { f: 6, s: "horrocrux", t: 6.0, txt: "Partió su alma en siete pedazos" },
      { f: 7, s: "final", t: 7.0, txt: "Roba la varita más poderosa del mundo" },
      { f: 8, s: "hook", t: 5.0, txt: "Ataca Hogwarts con todo su ejército" },
      { f: 8, s: "duelo", t: 10.1, txt: "Su propio hechizo lo destruye" },
    ],
  },
  {
    id: "hermione",
    title: "LA BRUJA MÁS BRILLANTE",
    sub: "Hermione Granger",
    end: "Hermione 📚✨",
    who: ["hermione"],
    pose: "wandUp",
    facts: [
      ["Casa", "Gryffindor 🦁"],
      ["Varita", "Vid y fibra de dragón"],
      ["Patronus", "Una nutria 🦦"],
      ["Origen", "Hija de muggles"],
    ],
    stats: [["Inteligencia", 100], ["Hechizos", 97], ["Paciencia con Ron", 40]],
    intro: { f: 1, s: "p2_hermione", t: 0.4, txt: "" },
    build: [
      { f: 1, s: "p3_troll", t: 1.5, txt: "La salvan del troll y nace la amistad" },
      { f: 1, s: "p4_fuego", t: 2.5, txt: "Le prende fuego a la capa de Snape 🔥" },
    ],
    drop: [
      { f: 1, s: "p5_planta", t: 4.7, txt: "Salva a todos de la planta del diablo" },
      { f: 2, s: "p4_pocion", t: 4.0, txt: "Prepara la poción multijugos con 12 años" },
      { f: 2, s: "p4_hermione", t: 0.4, txt: "Petrificada… pero ya había descubierto al monstruo" },
      { f: 3, s: "rescate", t: 0.4, txt: "Usa el giratiempo para salvar a Buckbeak" },
      { f: 4, s: "baile", t: 11.6, txt: "Deslumbra a todos en el baile de Navidad" },
      { f: 5, s: "ejercito", t: 9.3, txt: "Crea el Ejército de Dumbledore" },
      { f: 7, s: "godric", t: 11.2, txt: "Salva a Harry de la serpiente" },
      { f: 8, s: "camara", t: 6.6, txt: "Destruye un horrocrux con un colmillo" },
    ],
  },
  {
    id: "snape",
    title: "SIEMPRE.",
    sub: "Severus Snape",
    end: "Siempre. 🦌",
    who: ["snape"],
    pose: "crossed",
    facts: [
      ["Casa", "Slytherin 🐍"],
      ["Materia", "Pociones"],
      ["Apodo", "El Príncipe Mestizo"],
      ["Patronus", "Una cierva, como Lily"],
    ],
    stats: [["Misterio", 100], ["Lealtad", 100], ["Simpatía", 5]],
    intro: { f: 1, s: "p3_snape", t: 0.3, txt: "" },
    build: [
      { f: 1, s: "p4_fuego", t: 2.4, txt: "Murmura en el partido… ¿maldición o protección?" },
      { f: 5, s: "oclumancia", t: 0.7, txt: "Le enseña a Harry a cerrar su mente" },
    ],
    drop: [
      { f: 6, s: "juramento", t: 5.3, txt: "Hace el juramento inquebrantable" },
      { f: 6, s: "snape", t: 4.3, txt: "Lanza el hechizo en la torre" },
      { f: 6, s: "principe", t: 6.1, txt: "«Yo soy el Príncipe Mestizo»" },
      { f: 7, s: "director", t: 0.4, txt: "Se convierte en director de Hogwarts" },
      { f: 7, s: "cierva", t: 0.8, txt: "Una cierva plateada guía a Harry…" },
      { f: 8, s: "snape", t: 6.3, txt: "Huye de McGonagall por la ventana" },
      { f: 8, s: "snape2", t: 5.3, txt: "Voldemort lo traiciona" },
      { f: 8, s: "recuerdos", t: 2.4, txt: "La verdad: amó a Lily toda su vida" },
    ],
  },
];
