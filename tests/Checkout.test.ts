import { Checkout } from '../src/Checkout';

describe('Checkout', () => {
  it('adds items to checkout and calculates total', () => {
    const checkout = new Checkout();
    checkout.scan('atv');
    checkout.scan('ipd');
    const total = checkout.total();
    expect(total).toBe(109.5 + 549.99);
  });

  it('adds items to checkout and calculates total by correctly applying deals and discounts', () => {
    const checkout = new Checkout();
    checkout.scan('atv');
    checkout.scan('ipd');
    checkout.scan('ipd');
    checkout.scan('atv');
    checkout.scan('ipd');
    checkout.scan('ipd');
    checkout.scan('ipd');
    const total = checkout.total();
    expect(total).toBe(2718.95);
  });

  it('returns zero for empty checkout', () => {
    const checkout = new Checkout();
    expect(checkout.total()).toBe(0);
  });

  it('throws error for invalid SKU', () => {
    const checkout = new Checkout();
    expect(() => checkout.scan('xyz')).toThrow();
  });
});
