package com.mingyuesun.springbootecommerce.controller;

import com.mingyuesun.springbootecommerce.entity.Review;
import com.mingyuesun.springbootecommerce.entity.User;
import com.mingyuesun.springbootecommerce.requestmodels.ReviewRequest;
import com.mingyuesun.springbootecommerce.service.ReviewService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping
    public Page<Review> getReviews(Pageable pageable) {
        return reviewService.getReviews(pageable);
    }

    @GetMapping("/product/{productId}")
    public Page<Review> getReviewsByProductId(@PathVariable("productId") Long productId,
                                              Pageable pageable) {
        return reviewService.getReviewsByProductId(productId, pageable);
    }

    @PostMapping
    public Review postReview(@AuthenticationPrincipal User user,
                           @RequestBody ReviewRequest reviewRequest) throws Exception {
        return reviewService.postReview(user, reviewRequest);
    }

}
