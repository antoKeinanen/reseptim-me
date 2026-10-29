# reseptim-me

A recipe book with recipes stored as Markdown files in a Git repository.
Astro builds a page for each file in `recipes/`.

## Run locally

Use Node.js 22.23.4 or later and pnpm 12.9.0.

1. Install dependencies with `pnpm install`.
2. Start the development server with `pnpm dev`.
3. Open `http://localhost:4321`.

## Build and preview

1. Build the static site with `pnpm build`. Astro writes the output to `dist/`.
2. Serve the build locally with `pnpm preview`.

Pages live in `src/pages/`. Static assets live in `public/`.

## Find a recipe

The home page lists all recipes alphabetically and links to their pages.
Search matches name, author, category, portions, dietary tags, cost, and date of cost.
Every search word must match somewhere in the recipe's metadata.
Search ignores capitalization and accents. Numbers and dates match as text.
Clear the search to show all recipes. Filtering requires JavaScript.

## Add a recipe

Create a `.md` file in `recipes/` with the following format.
All frontmatter fields except `author` are required. Use `starter`, `main`, `dessert`, or `other` for `category`.
Set `author` to the original recipe creator's name. Leave it blank or omit it when the creator is unknown.
Use a positive number for `portions`, an array of strings for `diet`, and a nonnegative number for `cost`.
Use `[]` when no dietary tags apply. Cost has no assumed currency.
Quote `dateOfCost` and use a valid date in `YYYY-MM-DD` format.

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

| Ingredient | Amount | Unit | Note |
| --- | --- | --- | --- |
| Dried pasta | 200 | g | |
| Tomatoes | 400 | g | Chopped |
| Salt | | | To taste |

## Instructions

1. Cook the pasta in salted water.
2. Simmer the tomatoes and toss with the pasta.
```

Keep all four ingredient table columns. Leave `Amount`, `Unit`, or `Note` cells blank when they do not apply.
The site displays one plain text line per ingredient, including its quantity and note when provided.
Write the instructions after the table using any Markdown.

Astro derives the URL from `name`, independently of the filename.
For example, `name: Tomato pasta` produces `/recipes/tomato-pasta/`.
Names become lowercase, accents are removed, and punctuation and spaces become hyphens.
Names must produce unique, nonempty slugs. Invalid frontmatter or conflicting slugs fail the build.
Changing a recipe's name changes its URL.

## Share a recipe

On a recipe page, select **Share to Telegram** to open Telegram with a prepared plain text message.
The message includes the recipe name, metadata, ingredients, instructions, and current page URL.
Choose a chat in Telegram to send the message.
Sharing requires JavaScript. Reading recipes does not.
