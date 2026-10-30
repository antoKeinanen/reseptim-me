import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getRecipeSlug } from '../lib/recipes';

export const GET: APIRoute = async ({ site }) => {
  const recipes = await getCollection('recipes');
  const paths = ['/', '/about/', '/tips/', '/terms/', ...recipes.map((recipe) => `/recipes/${getRecipeSlug(recipe)}/`)];
  const urls = paths.map((path) => `<url><loc>${new URL(path, site).href.replaceAll('&', '&amp;')}</loc></url>`);
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
