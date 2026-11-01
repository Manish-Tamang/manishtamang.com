/*
 * /manifest: bucket list and learning goals. Images for bucket-list items live in
 * assets/manifest/ and are referenced by file name.
 */

export const bucketList: { title: string; done: boolean; image?: string }[] = [
  { title: "Buy a Gaming PC", done: false },
  { title: "Buy an Insta360 GO 3", done: false, image: "insta-360-go-3.jpg" },
  { title: "Buy a DJI Osmo Pocket 3", done: false, image: "dji.png" },
  { title: "Earn NPR 100k", done: true },
  { title: "Buy a MacBook Air M4", done: false, image: "macbook.jpg" },
  { title: "Buy a Sony A6700", done: false, image: "A6700.jpg" },
  {
    title: "Buy a Jetson Orin Nano Super Developer Kit",
    done: false,
    image: "jetson-nano.jpg",
  },
];

export const learningGoals: {
  title: string;
  description: string;
  icon: "rust" | "open-source" | "conference";
  color: string;
}[] = [
  {
    title: "Learn Rust",
    description: "Dive into systems programming.",
    icon: "rust",
    color: "#FF6F4C",
  },
  {
    title: "Contribute to open source",
    description: "Help build great software.",
    icon: "open-source",
    color: "#84A1F0",
  },
  {
    title: "Attend a tech conference",
    description: "Connect with industry peers.",
    icon: "conference",
    color: "#3C905E",
  },
];
