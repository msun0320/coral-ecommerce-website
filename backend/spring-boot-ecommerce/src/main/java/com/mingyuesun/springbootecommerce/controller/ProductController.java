package com.mingyuesun.springbootecommerce.controller;

import com.mingyuesun.springbootecommerce.entity.Product;
import com.mingyuesun.springbootecommerce.requestmodels.ProductRequest;
import com.mingyuesun.springbootecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

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
    public Page<Product> getProducts(Pageable pageable) {
        return productService.getProducts(pageable);
    }

    @GetMapping("/category/{category}")
    public Page<Product> getProductsByCategory(@PathVariable("category") String category,
                                               Pageable pageable) {
        return productService.getProductsByCategory(category, pageable);
    }

    @GetMapping("/search")
    public Page<Product> getProductsByNameContaining(@RequestParam String name,
                                                     Pageable pageable) {
        return productService.getProductsByNameContaining(name, pageable);
    }

    @GetMapping("/{productId}")
    public Product getProduct(@PathVariable("productId") Long productId) throws Exception {
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