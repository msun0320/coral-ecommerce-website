class ReviewModel {
  id: number;
  userId: number;
  createAt: string;
  rating: number;
  productId: number;
  reviewDescription?: string;

  constructor(
    id: number,
    userId: number,
    createAt: string,
    rating: number,
    productId: number,
    reviewDescription: string
  ) {
    this.id = id;
    this.userId = userId;
    this.createAt = createAt;
    this.rating = rating;
    this.productId = productId;
    this.reviewDescription = reviewDescription;
  }
}

export default ReviewModel;
