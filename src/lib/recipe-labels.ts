import type { CollectionEntry } from 'astro:content';

export const categoryLabels = {
	starter: 'Alkuruoka',
	main: 'Pääruoka',
	dessert: 'Jälkiruoka',
	other: 'Muu',
} satisfies Record<CollectionEntry<'recipes'>['data']['category'], string>;

const dietLabels = new Map([
	['vegetarian', 'Kasvis'],
	['vegan', 'Vegaaninen'],
	['gluten-free', 'Gluteeniton'],
	['dairy-free', 'Maidoton'],
	['lactose-free', 'Laktoositon'],
	['egg-free', 'Munaton'],
	['nut-free', 'Pähkinätön'],
]);

export function getDietLabel(tag: string): string {
	return dietLabels.get(tag) ?? tag;
}

export function formatRecipeCost(cost: number): string {
	return cost.toLocaleString('fi-FI', { maximumFractionDigits: 2 });
}

export function formatRecipeDate(date: string): string {
	return new Date(date).toLocaleDateString('fi-FI', { timeZone: 'UTC' });
}
