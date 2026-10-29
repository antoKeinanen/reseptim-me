// @ts-check
import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import recipeIngredients from "./src/plugins/rehype-recipe-ingredients";

export default defineConfig({
  markdown: {
    processor: unified({ rehypePlugins: [recipeIngredients] }),
  },
  site: "reseptim.me",
});
