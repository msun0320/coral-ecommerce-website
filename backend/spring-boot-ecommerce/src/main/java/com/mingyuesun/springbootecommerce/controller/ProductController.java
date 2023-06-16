package com.mingyuesun.springbootecommerce.controller;

import com.mingyuesun.springbootecommerce.entity.Cart;
import com.mingyuesun.springbootecommerce.entity.Product;
import com.mingyuesun.springbootecommerce.service.ProductService;
import com.mingyuesun.springbootecommerce.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/cart")
public class ProductController {

    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/secure")
    public List<Cart> getCart(@RequestHeader(value = "Authorization") String token) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return productService.getCart(userEmail);
    }

    @GetMapping("/secure/count")
    public int cartCount() {
        String userEmail = "test@test.com";
        return productService.cartCount(userEmail);
    }

    @PutMapping("/secure/add")
    public Product addToCart(@RequestHeader(value = "Authorization") String token,
            @RequestParam Long productId, Integer quantity) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return productService.addToCart(userEmail, productId, quantity);
    }

    @PutMapping("/secure/delete")
    public void deleteFromCart(@RequestHeader(value = "Authorization") String token,
                               @RequestParam Long productId) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        productService.deleteFromCart(userEmail, productId);
    }
}
