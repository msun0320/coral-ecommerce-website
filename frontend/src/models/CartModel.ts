import ProductModel from "./ProductModel";

class CartModel {
  id: number;
  userName: string;
  product: ProductModel;
  quantity: number;
  createdAt: string;
  updatedAt?: string;

  constructor(
    id: number,
    userName: string,
    product: ProductModel,
    quantity: number,
    createdAt: string,
    updatedAt: string
  ) {
    this.id = id;
    this.userName = userName;
    this.product = product;
    this.quantity = quantity;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default CartModel;
