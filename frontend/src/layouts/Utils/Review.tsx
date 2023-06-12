import ReviewModel from "../../models/ReviewModel";
import { StarsReview } from "./StarsReview";

export const Review: React.FC<{ review: ReviewModel }> = (props) => {
  const createAt = new Date(props.review.createdAt);

  const longMonth = createAt.toLocaleString("en-us", { month: "long" });
  const day = createAt.getDate();
  const year = createAt.getFullYear();

  const createAtRender = longMonth + " " + day + ", " + year;

  return (
    <div>
      <h5>{props.review.userEmail}</h5>
      <StarsReview rating={props.review.rating} size={16} />
      <h6>{createAtRender}</h6>
      <p>{props.review.reviewDescription}</p>
    </div>
  );
};
