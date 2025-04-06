import { AppleTVDiscountRule } from '../src/rules/AppleTVDiscountRule';
import { Product } from '../src/models/Product';

const products: Record<string, Product> = {
  atv: { sku: 'atv', name: 'Apple TV', price: 109.5 },
};

describe('AppleTVDiscountRule', () => {
  const rule = new AppleTVDiscountRule();

  it('applies 3 for 2 discount correctly', () => {
    const items = [products.atv, products.atv, products.atv];
    const { finalPrice } = rule.applyRuleAndReturnFinalPrice(items, products);
    expect(finalPrice).toBe(2 * 109.5);
  });

  it('applies discount only to complete sets of 3', () => {
    const items = [products.atv, products.atv, products.atv, products.atv];
    const { finalPrice } = rule.applyRuleAndReturnFinalPrice(items, products);
    expect(finalPrice).toBe(3 * 109.5);
  });

  it('returns 0 if no matching items', () => {
    const { finalPrice } = rule.applyRuleAndReturnFinalPrice([], products);
    expect(finalPrice).toBe(0);
  });
});
