package com.mingyuesun.springbootecommerce.requestmodels;

import lombok.Data;

import java.util.Optional;

@Data
public class ReviewRequest {

    private double rating;

    private Long productId;

    private Optional<String> reviewDescription;
}
