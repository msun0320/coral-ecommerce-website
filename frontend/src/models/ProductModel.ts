class ProductModel {
  id: number;
  title: string;
  description?: string;
  price?: number;
  quantity?: number;
  category?: string;
  img?: string;

  constructor(
    id: number,
    title: string,
    description: string,
    price: number,
    quantity: number,
    category: string,
    img: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.category = category;
    this.img = img;
  }
}

export default ProductModel;
