package com.mingyuesun.springbootecommerce.service;

import com.mingyuesun.springbootecommerce.dao.ProductRepository;
import com.mingyuesun.springbootecommerce.dao.ReviewRepository;
import com.mingyuesun.springbootecommerce.entity.Review;
import com.mingyuesun.springbootecommerce.entity.User;
import com.mingyuesun.springbootecommerce.requestmodels.ReviewRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;

@Service
@Transactional
public class ReviewService {

    private ReviewRepository reviewRepository;

    private ProductRepository productRepository;

    public ReviewService(ReviewRepository reviewRepository, ProductRepository productRepository) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
    }

    public Page<Review> getReviews(Pageable pageable) {
        return reviewRepository.findAll(pageable);
    }

    public void postReview(User user, ReviewRequest reviewRequest) throws Exception {
        Review review = new Review();
        review.setProduct(productRepository.findById(reviewRequest.getProductId()).get());
        review.setRating(reviewRequest.getRating());
        review.setUser(user);
        if (reviewRequest.getReviewDescription().isPresent()) {
            review.setReviewDescription(reviewRequest.getReviewDescription().map(
                    Object::toString
            ).orElse(null));
        }
        review.setCreatedAt(Date.valueOf(LocalDate.now()));
        reviewRepository.save(review);
    }

}
