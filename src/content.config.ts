import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const recipes = defineCollection({
	loader: glob({ pattern: '*.md', base: './recipes' }),
	schema: z.object({
		name: z.string().trim().min(1),
		author: z.string().trim().default(''),
		category: z.enum(['starter', 'main', 'dessert', 'other']),
		portions: z.number().positive(),
		diet: z.array(z.string()),
		cost: z.number().nonnegative().nullable(),
		dateOfCost: z.iso.date().nullable(),
	}).refine(({ cost, dateOfCost }) => (cost === null) === (dateOfCost === null), {
		message: 'Cost and dateOfCost must both be set or both be null.',
	}),
});

export const collections = { recipes };
