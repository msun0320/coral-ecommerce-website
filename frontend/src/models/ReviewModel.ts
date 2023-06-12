class ReviewModel {
  id: number;
  userEmail: number;
  createdAt: string;
  rating: number;
  productId: number;
  reviewDescription?: string;

  constructor(
    id: number,
    userEmail: number,
    createdAt: string,
    rating: number,
    productId: number,
    reviewDescription: string
  ) {
    this.id = id;
    this.userEmail = userEmail;
    this.createdAt = createdAt;
    this.rating = rating;
    this.productId = productId;
    this.reviewDescription = reviewDescription;
  }
}

export default ReviewModel;
