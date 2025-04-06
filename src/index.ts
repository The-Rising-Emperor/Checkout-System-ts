import { Checkout } from './Checkout';

const checkout = new Checkout();

checkout.scan('atv');
checkout.scan('ipd');
checkout.scan('ipd');
checkout.scan('atv');
checkout.scan('ipd');
checkout.scan('ipd');
checkout.scan('ipd');

console.log('Total: $' + checkout.total().toFixed(2));
