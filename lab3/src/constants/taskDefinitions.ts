import { Challenge } from "../types";

export const CHALLENGES: Challenge[] = [
  {
    id: "1",
    title: "Зробіть 10 тапів",
    description: "Натисніть на об'єкт клікера 10 разів",
    type: "tap_count",
    target: 10,
  },
  {
    id: "2",
    title: "Подвійний тап 5 разів",
    description: "Виконайте 5 подвійних тапів",
    type: "double_tap_count",
    target: 5,
  },
  {
    id: "3",
    title: "Утримуйте 3 секунди",
    description: "Утримуйте кнопку впродовж 3 секунд",
    type: "long_press",
    target: 1,
  },
  {
    id: "4",
    title: "Перетягніть об'єкт",
    description: "Виконайте жест перетягування",
    type: "pan",
    target: 1,
  },
  {
    id: "5",
    title: "Свайп вправо",
    description: "Виконайте жест свайпу вправо",
    type: "fling_right",
    target: 1,
  },
  {
    id: "6",
    title: "Свайп вліво",
    description: "Виконайте жест свайпу вліво",
    type: "fling_left",
    target: 1,
  },
  {
    id: "7",
    title: "Змініть розмір об'єкта",
    description: "Виконайте жест масштабування",
    type: "pinch",
    target: 1,
  },
  {
    id: "8",
    title: "Досягніть 100 балів",
    description: "Наберіть 100 балів",
    type: "score",
    target: 100,
  },
  {
    id: "9",
    title: "Тримайте темп",
    description: "Робіть не менше 3 кліків в секунду впродовж 10 секунд",
    type: "sustained_cps",
    target: 10000, // in ms
    duration: 10000,
  },
];
