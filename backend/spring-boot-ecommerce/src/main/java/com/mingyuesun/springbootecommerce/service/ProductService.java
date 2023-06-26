package com.mingyuesun.springbootecommerce.service;

import com.mingyuesun.springbootecommerce.dao.CartItemRepository;
import com.mingyuesun.springbootecommerce.dao.InventoryRepository;
import com.mingyuesun.springbootecommerce.dao.ProductRepository;
import com.mingyuesun.springbootecommerce.entity.Inventory;
import com.mingyuesun.springbootecommerce.entity.Product;
import com.mingyuesun.springbootecommerce.requestmodels.ProductRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class ProductService {

    private ProductRepository productRepository;

    private InventoryRepository inventoryRepository;

    private CartItemRepository cartItemRepository;

    public ProductService(ProductRepository productRepository, InventoryRepository inventoryRepository, CartItemRepository cartItemRepository) {
        this.productRepository = productRepository;
        this.inventoryRepository = inventoryRepository;
        this.cartItemRepository = cartItemRepository;
    }

    public Page<Product> getProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    public Page<Product> getProductsByCategory(String category, Pageable pageable) {
        return productRepository.findByCategory(category, pageable);
    }

    public Page<Product> getProductsByNameContaining(String name, Pageable pageable) {
        return productRepository.findByNameContaining(name, pageable);
    }

    public Product getProduct(Long productId) throws Exception {
        Optional<Product> product = productRepository.findById(productId);

        if (!product.isPresent()) {
            throw new Exception("Product does not exist");
        }

        return product.get();
    }

    public Product addProduct(ProductRequest productRequest) {
        Product product = new Product();
        product.setName(productRequest.getName());
        product.setDescription(productRequest.getDescription());
        product.setPrice(productRequest.getPrice());
        product.setCategory(productRequest.getCategory());
        product.setImg(productRequest.getImg());

        Inventory inventory = new Inventory();
        inventory.setProduct(product);
        inventory.setQuantity(productRequest.getQuantity());
        inventoryRepository.save(inventory);

        return productRepository.save(product);
    }

    public void deleteProduct(long productId) throws Exception {
        Optional<Product> product = productRepository.findById(productId);
        if (!product.isPresent()) {
            throw new Exception("Product does not exist");
        }
        productRepository.delete(product.get());

        Inventory inventory = inventoryRepository.findByProductId(productId);
        if (inventory == null) {
            throw new Exception("Inventory does not exist");
        }
        inventoryRepository.delete(inventory);
    }

}