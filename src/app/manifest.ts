import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.name,
    short_name: SITE_CONFIG.alias,
    description: "Finance & Software Architecture Presentation",
    start_url: "/",
    display: "standalone",
    background_color: "#07080c",
    theme_color: "#38bdf8",
  };
}
