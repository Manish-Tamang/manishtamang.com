import type { SVGProps } from "react";

const Seelen = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="100%" height="100%" rx="20%" ry="20%" fill="#0f0f0f" />
    <linearGradient id="seelen__screen" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#f75c46" stopOpacity="1" />
      <stop offset="50%" stopColor="#9d57f4" stopOpacity="1" />
      <stop offset="100%" stopColor="#0054b6" stopOpacity="1" />
    </linearGradient>
    <rect
      x="5%"
      y="5%"
      width="90%"
      height="90%"
      rx="16%"
      ry="16%"
      fill="url(#seelen__screen)"
    />
    <line
      strokeWidth="2.5%"
      x1="49%"
      y1="50%"
      x2="95%"
      y2="50%"
      stroke="#ffffff"
      strokeDasharray="6.5% 4%"
    />
    <line
      strokeWidth="2.5%"
      x1="50%"
      y1="5%"
      x2="50%"
      y2="95%"
      stroke="#ffffff"
      strokeDasharray="6.5% 3.95%"
    />
  </svg>
);

export { Seelen };
