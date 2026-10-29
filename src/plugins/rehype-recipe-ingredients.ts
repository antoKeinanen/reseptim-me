import type { Element, ElementContent, Root, RootContent } from 'hast';

const ingredientHeaders = ['ingredient', 'amount', 'unit', 'note'];

function textContent(node: RootContent): string {
	if (node.type === 'text') return node.value;
	if (node.type === 'element') return node.children.map(textContent).join('');
	return '';
}

function elementChildren(node: Element): Element[] {
	return node.children.filter((child): child is Element => child.type === 'element');
}

function ingredientSection(table: Element): Element | undefined {
	const sections = elementChildren(table);
	const headerRow = sections.find((section) => section.tagName === 'thead')
		?.children.find((child): child is Element => child.type === 'element' && child.tagName === 'tr');
	if (!headerRow) return;

	const headers = elementChildren(headerRow);
	if (headers.length !== ingredientHeaders.length || !headers.every((cell, index) =>
		textContent(cell).trim().toLowerCase() === ingredientHeaders[index])) return;

	const items = sections.filter((section) => section.tagName === 'tbody')
		.flatMap(elementChildren)
		.filter((row) => row.tagName === 'tr')
		.map((row): Element => {
			const [ingredient, amount, unit, note] = elementChildren(row);
			const parts = [amount, unit, ingredient].filter((cell): cell is Element =>
				cell !== undefined && textContent(cell).trim().length > 0);
			const children: ElementContent[] = parts.flatMap((cell, index) =>
				index === 0 ? cell.children : [{ type: 'text', value: ' ' }, ...cell.children]);
			if (note && textContent(note).trim()) {
				children.push({ type: 'text', value: ', ' }, ...note.children);
			}
			return {
				type: 'element', tagName: 'p', properties: { className: ['ingredient-line'] },
				children,
			};
		});

	return {
		type: 'element', tagName: 'section', properties: { className: ['recipe-ingredients'] },
		children: [
			{
				type: 'element', tagName: 'h2', properties: { id: 'ingredients' },
				children: [{ type: 'text', value: 'Ainekset' }],
			},
			{ type: 'element', tagName: 'div', properties: { className: ['ingredient-lines'] }, children: items },
		],
	};
}

export default function recipeIngredients() {
	return function transform(tree: Root | Element): void {
		tree.children.forEach((child, index) => {
			if (child.type !== 'element') return;
			if (child.tagName === 'table') {
				tree.children[index] = ingredientSection(child) ?? child;
				return;
			}
			transform(child);
		});
	};
}
