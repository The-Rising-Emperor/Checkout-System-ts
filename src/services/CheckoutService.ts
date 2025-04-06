import { PricingRulesService } from './PricingRulesService';
import { AppleTVDiscountRule } from '../rules/AppleTVDiscountRule';
import { SuperIPadBulkDiscountRule } from '../rules/SuperIPadDiscountRule';
import { pricingRules } from '../config/pricingRules';
import { Product } from '../models/Product';

export class CheckoutService {
  private pricingRulesService: PricingRulesService;
  private products: Product[];

  constructor() {
    const specialPricingRulesList = [
      new AppleTVDiscountRule(),
      new SuperIPadBulkDiscountRule()
    ];

    this.pricingRulesService = new PricingRulesService(pricingRules, specialPricingRulesList);
    this.products = [];
  }

  scan(sku: string): void {

    if (!(sku in pricingRules)) {
      throw new Error(`Invalid SKU: ${sku}`);
    }

    const product = pricingRules[sku as keyof typeof pricingRules];
    this.products.push(product);
  }

  total(): number {
    return this.pricingRulesService.calculateTotal(this.products);
  }
}