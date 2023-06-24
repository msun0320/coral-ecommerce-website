import ProductModel from "./ProductModel";
import UserModel from "./UserModel";

class CartItemModel {
  id: number;
  user: UserModel;
  product: ProductModel;
  quantity: number;

  constructor(
    id: number,
    user: UserModel,
    product: ProductModel,
    quantity: number
  ) {
    this.id = id;
    this.user = user;
    this.product = product;
    this.quantity = quantity;
  }
}

export default CartItemModel;
