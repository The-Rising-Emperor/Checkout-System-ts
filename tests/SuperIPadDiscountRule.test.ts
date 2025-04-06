import { SuperIPadBulkDiscountRule } from '../src/rules/SuperIPadDiscountRule';
import { Product } from '../src/models/Product';

const products: Record<string, Product> = {
  ipd: { sku: 'ipd', name: 'Super iPad', price: 549.99 },
};

describe('SuperIPadDiscountRule', () => {
  const rule = new SuperIPadBulkDiscountRule();

  it('applies discount when more than 4 iPads are bought', () => {
    const items = Array(5).fill(products.ipd);
    const { finalPrice } = rule.applyRuleAndReturnFinalPrice(items, products);
    expect(finalPrice).toBe(5 * 499.99);
  });

  it('does not apply discount when less than 5 iPads are bought', () => {
    const items = Array(4).fill(products.ipd);
    const { finalPrice } = rule.applyRuleAndReturnFinalPrice(items, products);
    expect(finalPrice).toBe(4 * 549.99);
  });

  it('returns 0 if no iPads are present', () => {
    const { finalPrice } = rule.applyRuleAndReturnFinalPrice([], products);
    expect(finalPrice).toBe(0);
  });
});
