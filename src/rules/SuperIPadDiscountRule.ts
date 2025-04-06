import { SpecialPricingRule } from '../interfaces/SpecialPricingRule';
import { Product } from '../models/Product';

export class SuperIPadBulkDiscountRule implements SpecialPricingRule {
  applyRuleAndReturnFinalPrice(products: Product[], pricingData: any): any {
    const count = products.filter(product => product.sku === 'ipd').length;
    const price = count > 4 ? 499.99 : pricingData['ipd'].price;
    return { "sku": "ipd", "finalPrice": count * price };
  }
}