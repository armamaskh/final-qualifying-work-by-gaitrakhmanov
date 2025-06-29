import localFont from "next/font/local";


export const gothamPro = localFont({
  src: 
  [
    {
      path: "../../../../public/fonts/Gotham Pro/gothampro.ttf",
      style: "normal",
      weight: "400"
    },
    {
      path: "../../../../public/fonts/Gotham Pro/gothampro_light.ttf",
      weight: "300"
    },
    {
      path: "../../../../public/fonts/Gotham Pro/gothampro_medium.ttf",
      weight: "500"
    },
    {
      path: "../../../../public/fonts/Gotham Pro/gothampro_bold.ttf",
      weight: "700"
    },
  ],
  variable: "--font-gothamPro"
});