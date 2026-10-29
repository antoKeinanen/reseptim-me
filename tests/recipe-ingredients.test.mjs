import assert from 'node:assert/strict';
import test from 'node:test';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import recipeIngredients from '../src/plugins/rehype-recipe-ingredients.ts';

test('keeps quantities and units together for scaling, separate from names and notes', async () => {
  const renderer = await createMarkdownProcessor({ rehypePlugins: [recipeIngredients] });
  const { code } = await renderer.render(`
| Ingredient | Amount | Unit | Note |
| --- | --- | --- | --- |
| Jauhoja | **1½** | dl | Siivilöitynä |
| Sokeria | 1 | rkl | Pinnalle per brûlée |
| Öljyä | 3 | osaa | |
| Etikkaa | 1 osa | | |
| Suolaa | | | Maun mukaan |

## Valmistus

Paista 175 °C:ssa 20 minuuttia.
`);
  assert.match(code, /<span data-ingredient-amount=""><strong>1½<\/strong> dl<\/span> Jauhoja, Siivilöitynä/);
  assert.equal((code.match(/data-ingredient-amount/g) ?? []).length, 1);
  assert.match(code, /<span>1 rkl<\/span> Sokeria, Pinnalle per brûlée/);
  assert.match(code, /<span>3 osaa<\/span> Öljyä/);
  assert.match(code, /<span>1 osa<\/span> Etikkaa/);
  assert.match(code, /Suolaa, Maun mukaan/);
  assert.match(code, /Paista 175 °C:ssa 20 minuuttia\./);
});
