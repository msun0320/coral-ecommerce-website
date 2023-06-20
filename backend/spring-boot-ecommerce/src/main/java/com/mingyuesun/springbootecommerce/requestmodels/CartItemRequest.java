package com.mingyuesun.springbootecommerce.requestmodels;

import lombok.Data;

@Data
public class CartItemRequest {

    private Long productId;

    private int quantity;

}
