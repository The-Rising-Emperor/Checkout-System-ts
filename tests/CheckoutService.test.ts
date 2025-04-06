import { CheckoutService } from '../src/services/CheckoutService';
import { pricingRules } from '../src/config/pricingRules';

describe('CheckoutService', () => {
  let checkout: CheckoutService;

  beforeEach(() => {
    checkout = new CheckoutService();
  });

  test('returns zero total when no items are scanned', () => {
    expect(checkout.total()).toBe(0);
  });

  test('throws error when invalid SKU is scanned', () => {
    expect(() => checkout.scan('invalid')).toThrow('Invalid SKU: invalid');
  });

  test('calculates total for a single MacBook Pro', () => {
    checkout.scan('mbp');
    expect(checkout.total()).toBe(pricingRules['mbp'].price);
  });

  test('calculates total for multiple unique items', () => {
    checkout.scan('mbp');
    checkout.scan('ipd');
    checkout.scan('vga');
    const expectedTotal = pricingRules['mbp'].price + pricingRules['ipd'].price + pricingRules['vga'].price;
    expect(checkout.total()).toBe(expectedTotal);
  });

  test('applies Apple TV deal for 3 units', () => {
    checkout.scan('atv');
    checkout.scan('atv');
    checkout.scan('atv');
    const expectedTotal = pricingRules['atv'].price * 2;
    expect(checkout.total()).toBe(expectedTotal);
  });

  test('applies Super iPad discount when quantity is 5', () => {
    checkout.scan('ipd');
    checkout.scan('ipd');
    checkout.scan('ipd');
    checkout.scan('ipd');
    checkout.scan('ipd');
    const expectedTotal = 5 * 499.99;
    expect(checkout.total()).toBe(expectedTotal);
  });

  test('mixes regular pricing and special pricing rules', () => {
    checkout.scan('atv');
    checkout.scan('atv');
    checkout.scan('atv');
    checkout.scan('ipd');
    checkout.scan('ipd');
    checkout.scan('ipd');
    checkout.scan('ipd');
    checkout.scan('ipd');
    const expectedTotal = 2 * pricingRules['atv'].price + 5 * 499.99;
    expect(checkout.total()).toBe(expectedTotal);
  });

  test('scanning a VGA with MBP does not alter total (free VGA handled externally)', () => {
    checkout.scan('mbp');
    checkout.scan('vga');
    const expectedTotal = pricingRules['mbp'].price + pricingRules['vga'].price;
    expect(checkout.total()).toBe(expectedTotal);
  });

  test('handles empty checkout correctly', () => {
    const total = checkout.total();
    expect(total).toBe(0);
  });
});
