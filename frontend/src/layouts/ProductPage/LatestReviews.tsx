import { Link } from "react-router-dom";
import ReviewModel from "../../models/ReviewModel";
import { Review } from "../Utils/Review";

export const LatestReviews: React.FC<{
  reviews: ReviewModel[];
  productId: number | undefined;
}> = (props) => {
  return (
    <div>
      <h3>Latest Reviews: </h3>
      <div>
        {props.reviews.length > 0 ? (
          <>
            {props.reviews.slice(0, 3).map((eachReview) => (
              <Review review={eachReview} key={eachReview.id}></Review>
            ))}

            <Link
              type="button"
              className="btn"
              to={`/reviewlist/${props.productId}`}
            >
              See all reviews.
            </Link>
          </>
        ) : (
          <p className="lead">
            Currently there are no reviews for this product.
          </p>
        )}
      </div>
    </div>
  );
};
