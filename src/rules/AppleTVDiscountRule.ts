import { SpecialPricingRule } from '../interfaces/SpecialPricingRule';
import { Product } from '../models/Product';

export class AppleTVDiscountRule implements SpecialPricingRule {
  applyRuleAndReturnFinalPrice(products: Product[], pricingData: any): any {
    const count = products.filter(product => product.sku === 'atv').length;
    const price = pricingData['atv'].price;
    return { "sku": "atv", "finalPrice": (Math.floor(count / 3) * 2 + (count % 3)) * price };
  }
}