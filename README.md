# Checkout-System-ts
This is a repository which includes a TypeScript-based  flexible checkout system with support for flexible product-specific pricing rules.

## Features

- Scan items using their SKU
- Flexible pricing rules inside the rules folder which can be changed in the future easily
- Clean separation between core logic and pricing rules
- Fully tested using Jest

---

## Technologies

- TypeScript
- Jest for unit testing
- Node.js

## Getting Started

### 1. Clone the Repository
- git clone https://github.com/yourusername/checkout-system-ts.git
- cd checkout-system-ts

### 2. Install Dependencies
- npm install
### 3. Run the Tests
- npm test
### 4. Run the Application
- npm start (It will build the project and move the built files inside the dist folder and run )
- Entry point: src\index.ts

## Pricing Rules Included
-Apple TV: Buy 3, pay for 2.
-Super iPad: Bulk discount if 4 or more are purchased where the price will drop to $499.99 each.
-Other items: Priced normally.

## Adding New Rules
- Create a new class in src/rules/ implementing SpecialPricingRule.
- Inject it into the specialPricingRulesList array in CheckoutService.ts.



