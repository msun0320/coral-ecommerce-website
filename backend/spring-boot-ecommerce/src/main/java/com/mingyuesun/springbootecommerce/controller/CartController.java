package com.mingyuesun.springbootecommerce.controller;

import com.mingyuesun.springbootecommerce.entity.Product;
import com.mingyuesun.springbootecommerce.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api")
public class CartController {

    private CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PutMapping("/cart/add")
    public Product addProductToCart(@RequestParam Long productId, Integer quantity) throws Exception {
        Long userId = 1L;
        return cartService.addProduct(userId, productId, 2);
    }
}
