const units = new Map([
	['kg', { family: 'mass', multiplier: 1000 }],
	['g', { family: 'mass', multiplier: 1 }],
	['l', { family: 'volume', multiplier: 1000 }],
	['dl', { family: 'volume', multiplier: 100 }],
	['ml', { family: 'volume', multiplier: 1 }],
	['tl', { family: 'volume', multiplier: 5 }],
	['rkl', { family: 'volume', multiplier: 15 }],
]);

export function readableQuantity(values: number[], unit: string): { values: number[]; unit: string } {
	const originalUnit = unit.toLowerCase();
	const source = units.get(originalUnit);
	if (!source) return { values, unit };
	const baseValues = values.map((value) => value * source.multiplier);
	const largest = Math.max(...baseValues);
	let target: string;
	if (source.family === 'mass') target = largest >= 1000 ? 'kg' : 'g';
	else if (largest >= 1000) target = 'l';
	else if (largest >= 50) target = 'dl';
	else target = originalUnit === 'tl' || originalUnit === 'rkl' ? originalUnit : 'ml';
	const multiplier = units.get(target)?.multiplier ?? 1;
	return { values: baseValues.map((value) => value / multiplier), unit: target };
}
