import { Product } from "../models/Product";

export interface SpecialPricingRule {
  applyRuleAndReturnFinalPrice(items: Product[], pricingRules: any): any;
}