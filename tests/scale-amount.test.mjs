import assert from 'node:assert/strict';
import test from 'node:test';
import { scaleAmount } from '../src/lib/scale-amount.ts';

test('scales recipe quantities while preserving surrounding text', () => {
  for (const [amount, factor, expected] of [
    ['400 g', 0.5, '200 g'],
    ['1,5 l', 2, '3 l'],
    ['1.5 l', 0.5, '7,5 dl'],
    ['1/2', 3, '1,5'],
    ['1 / 2 dl', 2, '1 dl'],
    ['1 1/2 dl', 2, '3 dl'],
    ['½ dl', 2, '1 dl'],
    ['1½ tl', 2, '3 tl'],
    ['2¼ dl', 0.5, '1,125 dl'],
    ['4–5', 0.5, '2–2,5'],
    ['½–¾ tl', 2, '1–1,5 tl'],
    ['6–7 (noin 525 g)', 2, '12–14 (noin 1,05 kg)'],
    ['4 rkl + 85 g', 2, '8 rkl + 170 g'],
    ['450 g tai 2,4 dl', 2, '900 g tai 4,8 dl'],
    ['noin ½ pussia', 2, 'noin 1 pussia'],
    ['1 purkki, lisää tarpeen mukaan', 2, '2 purkki, lisää tarpeen mukaan'],
    ['maun mukaan', 2, 'maun mukaan'],
    ['', 2, ''],
    ['1/0 dl', 2, '1/0 dl'],
  ]) {
    assert.equal(scaleAmount(amount, factor), expected, `${amount} × ${factor}`);
  }
});

test('keeps original notation when restored to the original portions', () => {
  for (const amount of ['½ dl', '1/2', '1,5 l', '4–5', 'noin 1½ tl', '0,5 kg', '1000 g']) {
    assert.equal(scaleAmount(amount, 1), amount);
  }
});

test('shows small quantities without rounding them to zero', () => {
  assert.equal(scaleAmount('¼ tl', 1 / 100), '0,0025 tl');
  assert.equal(scaleAmount('1 dl', 1 / 3), '33,33 ml');
});

test('uses readable metric units for mass and volume, including ranges and alternatives', () => {
  for (const [amount, factor, expected] of [
    ['1 kg', 0.5, '500 g'],
    ['1kg', 0.25, '250 g'],
    ['noin ½ kg', 0.5, 'noin 250 g'],
    ['1 KG', 0.5, '500 g'],
    ['500 g', 2, '1 kg'],
    ['400 g', 3, '1,2 kg'],
    ['1 kg', 1 / 3, '333,3 g'],
    ['1–2 kg', 0.25, '250–500 g'],
    ['1 – 2 kg', 0.75, '0,75 – 1,5 kg'],
    ['250–500 g', 4, '1–2 kg'],
    ['1 l', 0.5, '5 dl'],
    ['1 l', 0.05, '50 ml'],
    ['1 dl', 0.5, '50 ml'],
    ['500 ml', 2, '1 l'],
    ['50 ml', 4, '2 dl'],
    ['2–3 dl', 0.25, '50–75 ml'],
    ['450 g tai 2,4 dl', 3, '1,35 kg tai 7,2 dl'],
    ['4 rkl + 0,5 kg', 0.5, '2 rkl + 250 g'],
    ['1 g', 0.001, '0,001 g'],
    ['2 glass', 0.5, '1 glass'],
    ['1 cup', 0.5, '0,5 cup'],
  ]) {
    assert.equal(scaleAmount(amount, factor), expected, `${amount} × ${factor}`);
  }
});
