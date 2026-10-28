import { Required, PositiveNumber } from "./validator-decorator";

class Product {
  @Required
  productName: string;
  @PositiveNumber
  productPrice: number;

  constructor(name: string, price: number) {
    this.productName = name;
    this.productPrice = price;
  }
}
