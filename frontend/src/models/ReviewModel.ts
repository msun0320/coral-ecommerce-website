import ProductModel from "./ProductModel";
import UserModel from "./UserModel";

class ReviewModel {
  id: number;
  user: UserModel;
  createdAt: string;
  rating: number;
  product: ProductModel;
  reviewDescription?: string;

  constructor(
    id: number,
    user: UserModel,
    createdAt: string,
    rating: number,
    product: ProductModel,
    reviewDescription: string
  ) {
    this.id = id;
    this.user = user;
    this.createdAt = createdAt;
    this.rating = rating;
    this.product = product;
    this.reviewDescription = reviewDescription;
  }
}

export default ReviewModel;
