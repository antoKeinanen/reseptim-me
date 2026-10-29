import { readableMetricQuantity } from './recipe-units.ts';

const fractions = new Map([
	['¼', 1 / 4], ['½', 1 / 2], ['¾', 3 / 4], ['⅐', 1 / 7],
	['⅑', 1 / 9], ['⅒', 1 / 10], ['⅓', 1 / 3], ['⅔', 2 / 3],
	['⅕', 1 / 5], ['⅖', 2 / 5], ['⅗', 3 / 5], ['⅘', 4 / 5],
	['⅙', 1 / 6], ['⅚', 5 / 6], ['⅛', 1 / 8], ['⅜', 3 / 8],
	['⅝', 5 / 8], ['⅞', 7 / 8],
]);
const quantity = String.raw`(?:\d+\s+\d+\s*\/\s*\d+|\d+\s*\/\s*\d+|\d*\s*[¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]|\d+(?:[.,]\d+)?)`;
const measurement = new RegExp(`(${quantity})(\\s*[–—-]\\s*(${quantity}))?(?:\\s*(kg|g|ml|dl|l)(?![\\p{L}\\p{N}]))?`, 'giu');
const numberFormat = new Intl.NumberFormat('fi-FI', { maximumSignificantDigits: 4, useGrouping: false });

function parseQuantity(match: string): number | undefined {
	const token = match.trim();
	const fraction = fractions.get(token.slice(-1));
	if (fraction !== undefined) return Number(token.slice(0, -1).trim() || 0) + fraction;
	if (token.includes('/')) {
		const parts = token.split('/');
		const [wholeOrNumerator, numerator] = (parts[0] ?? '').trim().split(/\s+/).map(Number);
		const denominator = Number(parts[1]);
		if (!denominator) return;
		return numerator === undefined
			? (wholeOrNumerator ?? 0) / denominator
			: (wholeOrNumerator ?? 0) + numerator / denominator;
	}
	return Number(token.replace(',', '.'));
}

export function scaleAmount(amount: string, factor: number): string {
	if (factor === 1) return amount;
	return amount.replace(measurement, (match: string, first: string, range: string | undefined, second: string | undefined, unit: string | undefined) => {
		const quantities = second === undefined ? [first] : [first, second];
		const values = quantities.map((quantity) => {
			const value = parseQuantity(quantity);
			return value === undefined ? NaN : value * factor;
		});
		if (!values.every(Number.isFinite)) return match;
		const converted = readableMetricQuantity(values, unit ?? '');
		const separator = range && second ? range.slice(0, -second.length) : '';
		const formatted = converted.values.map((value) => numberFormat.format(value)).join(separator);
		const leadingSpace = first.match(/^\s*/)?.[0] ?? '';
		return `${leadingSpace}${formatted}${unit ? ` ${converted.unit}` : ''}`;
	});
}
