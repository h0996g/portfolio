export interface TutorialCard {
  title: string;
  image: string;
  href: string;
}

export const tutorials: TutorialCard[] = [
  {
    title: "Pixel espion with Express.js",
    image: "/pixel.png",
    href: "/backend?id=blog-1",
  },
  {
    title:
      "BlocProvider.of() called with a context that does not contain a Bloc",
    image: "/stackoverflow.webp",
    href: "/flutter?id=blog-1",
  },
  {
    title: "Optimize Heavy Tasks in Flutter Using Isolate",
    image: "/isolate.png",
    href: "/tutorials/isolate",
  },
];
