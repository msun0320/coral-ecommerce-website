class ReviewModel {
  id: number;
  userId: number;
  createdAt: string;
  rating: number;
  productId: number;
  reviewDescription?: string;

  constructor(
    id: number,
    userId: number,
    createdAt: string,
    rating: number,
    productId: number,
    reviewDescription: string
  ) {
    this.id = id;
    this.userId = userId;
    this.createdAt = createdAt;
    this.rating = rating;
    this.productId = productId;
    this.reviewDescription = reviewDescription;
  }
}

export default ReviewModel;
