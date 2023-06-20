package com.mingyuesun.springbootecommerce.controller;

import com.mingyuesun.springbootecommerce.entity.Product;
import com.mingyuesun.springbootecommerce.requestmodels.ProductRequest;
import com.mingyuesun.springbootecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getProducts() {
        return productService.getProducts();
    }

    @GetMapping("/{productId}")
    public Product getProduct(@PathVariable Long productId) throws Exception {
        return productService.getProduct(productId);
    }

    @PostMapping
    public Product addProduct(@RequestBody ProductRequest productRequest) throws Exception {
        return productService.addProduct(productRequest);
    }

    @DeleteMapping("/{productId}")
    public void deleteProduct(@PathVariable("productId") long productId) throws Exception {
        productService.deleteProduct(productId);
    }

}