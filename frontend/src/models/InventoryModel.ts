import ProductModel from "./ProductModel";

class InventoryModel {
  id: number;
  product: ProductModel;
  quantity: number;

  constructor(id: number, product: ProductModel, quantity: number) {
    this.id = id;
    this.product = product;
    this.quantity = quantity;
  }
}

export default InventoryModel;
