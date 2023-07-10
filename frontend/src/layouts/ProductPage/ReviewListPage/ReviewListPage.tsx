import { useEffect, useState } from "react";
import ReviewModel from "../../../models/ReviewModel";
import { Pagination } from "../../Utils/Pagination";
import { Review } from "../../Utils/Review";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";

export const ReviewListPage = () => {
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5);
  const [totalAmountOfReviews, setTotalAmountOfReviews] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Product to lookup reviews
  const productId = window.location.pathname.split("/")[2];

  useEffect(() => {
    const fetchProductReviewsData = async () => {
      const reviewUrl: string = `${
        process.env.REACT_APP_API
      }/reviews/product/${productId}?page=${
        currentPage - 1
      }&size=${reviewsPerPage}`;

      const responseReviews = await fetch(reviewUrl);

      if (!responseReviews.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJsonReviews = await responseReviews.json();

      const responseData = responseJsonReviews.content;

      setTotalAmountOfReviews(responseJsonReviews.totalElements);
      setTotalPages(responseJsonReviews.totalPages);

      const loadedReviews: ReviewModel[] = [];

      for (const key in responseData) {
        loadedReviews.push({
          id: responseData[key].id,
          user: responseData[key].user,
          createdAt: responseData[key].createdAt,
          rating: responseData[key].rating,
          product: responseData[key].product,
          reviewDescription: responseData[key].reviewDescription,
        });
      }

      setReviews(loadedReviews);
      setIsLoading(false);
    };
    fetchProductReviewsData().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [currentPage]);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const indexOfLastReview: number = currentPage * reviewsPerPage;
  const indexOfFirstReview: number = indexOfLastReview - reviewsPerPage;

  let lastItem =
    reviewsPerPage * currentPage <= totalAmountOfReviews
      ? reviewsPerPage * currentPage
      : totalAmountOfReviews;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="container-fluid mt-3">
        <h3>Customer reviews: ({reviews.length})</h3>
        <p>
          {indexOfFirstReview + 1} to {lastItem} of {totalAmountOfReviews}{" "}
          items:
        </p>
        <div>
          {reviews.map((review) => (
            <Review review={review} key={review.id} />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />
        )}
      </div>
    </div>
  );
};
