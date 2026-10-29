import type { CollectionEntry } from 'astro:content';

export function getRecipeSlug(recipe: CollectionEntry<'recipes'>): string {
	const slug = recipe.data.name
		.normalize('NFKD')
		.replace(/\p{M}/gu, '')
		.toLowerCase()
		.replace(/[^\p{L}\p{N}]+/gu, '-')
		.replace(/^-+|-+$/g, '');

	if (!slug) {
		throw new Error(`Recipe "${recipe.id}" needs a name with letters or numbers.`);
	}

	return slug;
}
