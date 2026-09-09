import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/constants";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Poly Cleaner",
    description: "Hot washed rPET flakes supplier, exported from Azerbaijan.",
    start_url: "/",
    display: "standalone",
    background_color: "#062B3A",
    theme_color: "#062B3A",
    icons: [
      { src: "/icon.png", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
