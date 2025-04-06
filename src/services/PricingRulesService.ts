import { SpecialPricingRule } from '../interfaces/SpecialPricingRule';
import { Product } from '../models/Product';

export class PricingRulesService {
  private pricingRules: any;
  private specialPricingRulesList: SpecialPricingRule[];

  constructor(pricingRules: any, specialPricingRulesList: SpecialPricingRule[]) {
    this.pricingRules = pricingRules;
    this.specialPricingRulesList = specialPricingRulesList;
  }

  calculateTotal(products: Product[]): number {
    let total = 0;
    const usedSkus = new Set<string>();

    for (const rule of this.specialPricingRulesList) {
      const { sku, finalPrice } = rule.applyRuleAndReturnFinalPrice(products, this.pricingRules);
      total += finalPrice;
      usedSkus.add(sku);
    }

    const remainingProducts = products.filter(product => !usedSkus.has(product.sku));

    for (const product of remainingProducts) {
      total += product.price;
    }

    return total;
  }
}