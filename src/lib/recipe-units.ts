const metricUnits = new Map([
	['kg', { family: 'mass', multiplier: 1000 }],
	['g', { family: 'mass', multiplier: 1 }],
	['l', { family: 'volume', multiplier: 1000 }],
	['dl', { family: 'volume', multiplier: 100 }],
	['ml', { family: 'volume', multiplier: 1 }],
]);

export function readableMetricQuantity(values: number[], unit: string): { values: number[]; unit: string } {
	const source = metricUnits.get(unit.toLowerCase());
	if (!source) return { values, unit };
	const baseValues = values.map((value) => value * source.multiplier);
	const largest = Math.max(...baseValues);
	const target = source.family === 'mass'
		? largest >= 1000 ? 'kg' : 'g'
		: largest >= 1000 ? 'l' : largest >= 100 ? 'dl' : 'ml';
	const multiplier = metricUnits.get(target)?.multiplier ?? 1;
	return { values: baseValues.map((value) => value / multiplier), unit: target };
}
