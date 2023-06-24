import InventoryModel from "./InventoryModel";

class ProductModel {
  id: number;
  name: string;
  description?: string;
  price?: number;
  category?: string;
  img?: string;
  inventory: InventoryModel;

  constructor(
    id: number,
    name: string,
    description: string,
    price: number,
    category: string,
    img: string,
    inventory: InventoryModel
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.img = img;
    this.inventory = inventory;
  }
}

export default ProductModel;
