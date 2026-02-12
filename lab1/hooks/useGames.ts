export const useGames = (): Game[] => {
  return GAMES_DATA;
};

export interface Game {
  id: string;
  title: string;
  genre: string;
  rating: string;
  platform: string;
  image: string;
}

const GAMES_DATA: Game[] = [
  {
    id: "1",
    title: "The Witcher 3",
    genre: "RPG",
    rating: "9.8",
    platform: "PC, PS5, Xbox",
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg",
  },
  {
    id: "2",
    title: "Cyberpunk 2077",
    genre: "Action RPG",
    rating: "8.5",
    platform: "PC, Consoles",
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/coaih8.webp",
  },
  {
    id: "3",
    title: "Elden Ring",
    genre: "Soulslike",
    rating: "9.7",
    platform: "All",
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.jpg",
  },
  {
    id: "4",
    title: "Stardew Valley",
    genre: "Simulation",
    rating: "9.5",
    platform: "Switch, PC",
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/coa93h.webp",
  },
  {
    id: "5",
    title: "Baldur's Gate III",
    genre: "RPG, Turn-based strategy",
    rating: "9.6",
    platform: "PC, PlayStation 5",
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co670h.webp",
  },
];
