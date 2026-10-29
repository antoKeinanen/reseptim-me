# reseptim-me

A recipe book built with Astro. Recipes live in `recipes/` as Markdown files,
and Astro builds a static page for each recipe.

## Run locally

Install Node.js 22.23.4 or later and pnpm 12.9.0, then run:

```sh
pnpm install
pnpm dev
```

Open `http://localhost:4321`.

## Build and preview

Run `pnpm build` to write the static site to `dist/`.
Run `pnpm preview` to serve that build locally.

Pages live in `src/pages/`. Static assets live in `public/`.

## Find a recipe

The home page lists recipes alphabetically. Search by name, author, category,
portions, dietary tags, cost, or cost date. Each search word must appear in the
recipe's metadata. Search ignores capitalization and accents, and treats numbers
and dates as text.

Clear the search to show all recipes. Search requires JavaScript, but you can
browse and read recipes without it.

## Add a recipe

Create a `.md` file in `recipes/` using this format:

```markdown
---
name: Tomato pasta
author: ""
category: main
portions: 2
diet: []
cost: 4
dateOfCost: "2026-10-29"
---

| Ingredient  | Amount | Unit | Note     |
| ----------- | ------ | ---- | -------- |
| Dried pasta | 200    | g    |          |
| Tomatoes    | 400    | g    | Chopped  |
| Salt        |        |      | To taste |

## Instructions

1. Cook the pasta in salted water.
2. Simmer the tomatoes and toss with the pasta.
```

All frontmatter fields except `author` are required:

- Set `name` to the recipe's name.
- Set `author` to the original recipe creator's name. Leave it blank or omit it if the creator is unknown.
- Use `starter`, `main`, `dessert`, or `other` for `category`.
- Use a positive number for `portions`.
- List dietary tags as strings in `diet`. Use `[]` if none apply.
- Use a nonnegative number for `cost`. The site assumes no currency.
- Quote `dateOfCost` and use a valid date in `YYYY-MM-DD` format.

Keep the four ingredient table columns shown above, in that order. Leave `Amount`,
`Unit`, or `Note` cells blank when they do not apply. The site displays each row as
one line with the quantity, ingredient, and any note.

Write the instructions below the table in Markdown.

The recipe's `name` determines its URL. For example, `name: Tomato pasta` produces
`/recipes/tomato-pasta/`. The filename does not affect the URL.

Astro converts names to lowercase, removes accents, and replaces punctuation and
spaces with hyphens. Each name must produce a unique, nonempty URL slug.
Invalid frontmatter, empty slugs, and duplicate slugs fail the build.
Renaming a recipe changes its URL.

## Share a recipe

On a recipe page, select **Jaa Telegramissa** to open Telegram with the recipe name,
metadata, ingredients, instructions, and page URL as a plain text message.
Choose a chat in Telegram and send the message. Sharing requires JavaScript.
