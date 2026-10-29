import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const recipes = defineCollection({
	loader: glob({ pattern: '*.md', base: './recipes' }),
	schema: z.object({
		name: z.string().trim().min(1),
		category: z.enum(['starter', 'main', 'dessert', 'other']),
		portions: z.number().positive(),
		diet: z.array(z.string()),
		cost: z.number().nonnegative(),
		dateOfCost: z.iso.date(),
	}),
});

export const collections = { recipes };
