import { News } from './types';

export const newsMock: News[] = [
  {
    id: '1',
    title: 'React Native 0.74 Released',
    description: 'New architecture is now stable. Bridgeless mode enabled by default.',
    image: 'https://reactnative.dev/img/header_logo.svg',
  },
  {
    id: '2',
    title: 'Expo SDK 51 is Here',
    description: 'expo-camera rewrite and new file-based routing included.',
    image: 'https://expo.dev/static/brand/square-512x512.png',
  },
  {
    id: '3',
    title: 'TypeScript 5.5 Features',
    description: 'Inferred type predicates and major performance improvements.',
    image: 'https://www.typescriptlang.org/icons/icon-512x512.png',
  },
];