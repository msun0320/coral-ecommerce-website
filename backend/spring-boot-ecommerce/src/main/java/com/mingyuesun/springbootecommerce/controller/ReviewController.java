package com.mingyuesun.springbootecommerce.controller;

import com.mingyuesun.springbootecommerce.entity.Product;
import com.mingyuesun.springbootecommerce.entity.Review;
import com.mingyuesun.springbootecommerce.entity.User;
import com.mingyuesun.springbootecommerce.requestmodels.ReviewRequest;
import com.mingyuesun.springbootecommerce.service.ReviewService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping
    public List<Review> getReviews() {
        return reviewService.getReviews();
    }

    @PostMapping
    public void postReview(@AuthenticationPrincipal User user,
                           @RequestBody ReviewRequest reviewRequest) throws Exception {
        reviewService.postReview(user, reviewRequest);
    }

}
