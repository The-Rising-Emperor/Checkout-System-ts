import { PricingRulesService } from '../src/services/PricingRulesService';
import { Product } from '../src/models/Product';
import { SpecialPricingRule } from '../src/interfaces/SpecialPricingRule';

describe('PricingRulesService', () => {
  const pricingRules = {
    atv: { sku: 'atv', name: 'Apple TV', price: 109.50 },
    ipd: { sku: 'ipd', name: 'Super iPad', price: 549.99 },
    mbp: { sku: 'mbp', name: 'MacBook Pro', price: 1399.99 },
    vga: { sku: 'vga', name: 'VGA adapter', price: 30.00 }
  };

  const createMockRule = (sku: string, finalPrice: number): SpecialPricingRule => ({
    applyRuleAndReturnFinalPrice: jest.fn().mockImplementation(() => ({
      sku,
      finalPrice
    }))
  });

  it('applies a mock rule and returns correct total', () => {
    const mockRule = createMockRule('atv', 200);
    const service = new PricingRulesService(pricingRules, [mockRule]);

    const products: Product[] = [
      pricingRules.atv,
      pricingRules.atv
    ];

    const result = service.calculateTotal(products);
    expect(result).toBe(200);
    expect(mockRule.applyRuleAndReturnFinalPrice).toHaveBeenCalledWith(products, pricingRules);
  });

  it('calculates mixed rule and default product prices correctly', () => {
    const mockRule = createMockRule('atv', 100);
    const service = new PricingRulesService(pricingRules, [mockRule]);

    const products: Product[] = [
      pricingRules.atv,
      pricingRules.ipd
    ];

    const result = service.calculateTotal(products);
    expect(result).toBe(100 + pricingRules.ipd.price);
  });

  it('applies multiple mock rules correctly', () => {
    const atvRule = createMockRule('atv', 150);
    const ipdRule = createMockRule('ipd', 999);
    const service = new PricingRulesService(pricingRules, [atvRule, ipdRule]);

    const products: Product[] = [
      pricingRules.atv,
      pricingRules.atv,
      pricingRules.ipd,
      pricingRules.ipd
    ];

    const result = service.calculateTotal(products);
    expect(result).toBe(150 + 999);
  });

  it('returns regular prices if no rules match', () => {
    const unrelatedRule = createMockRule('mbp', 0);
    const service = new PricingRulesService(pricingRules, [unrelatedRule]);

    const products: Product[] = [
      pricingRules.atv,
      pricingRules.vga
    ];

    const result = service.calculateTotal(products);
    expect(result).toBe(109.50 + 30);
  });

  it('calls all mock rules with the correct inputs', () => {
    const atvRule = createMockRule('atv', 50);
    const ipdRule = createMockRule('ipd', 600);
    const service = new PricingRulesService(pricingRules, [atvRule, ipdRule]);

    const products: Product[] = [
      pricingRules.atv,
      pricingRules.ipd
    ];

    service.calculateTotal(products);

    expect(atvRule.applyRuleAndReturnFinalPrice).toHaveBeenCalledWith(products, pricingRules);
    expect(ipdRule.applyRuleAndReturnFinalPrice).toHaveBeenCalledWith(products, pricingRules);
  });
});
