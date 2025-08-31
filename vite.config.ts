import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/prythian-real-estate/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        gallery: resolve(__dirname, "src/pages/gallery.html"),
        contacts: resolve(__dirname, "src/pages/contacts.html"),
      },
    },
  },
});
