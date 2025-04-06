import { CheckoutService } from './services/CheckoutService';

export class Checkout {
  private checkoutService: CheckoutService;

  constructor() {
    this.checkoutService = new CheckoutService();
  }

  scan(item: string): void {
    this.checkoutService.scan(item);
  }

  total(): number {
    return this.checkoutService.total();
  }
} 