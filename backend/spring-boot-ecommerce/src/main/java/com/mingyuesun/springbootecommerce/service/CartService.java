package com.mingyuesun.springbootecommerce.service;

import com.mingyuesun.springbootecommerce.dao.CartItemRepository;
import com.mingyuesun.springbootecommerce.dao.ProductRepository;
import com.mingyuesun.springbootecommerce.entity.CartItem;
import com.mingyuesun.springbootecommerce.entity.Product;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Service
@Transactional
public class CartService {

    private ProductRepository productRepository;

    private CartItemRepository cartItemRepository;

    public CartService(ProductRepository productRepository, CartItemRepository cartItemRepository) {
        this.productRepository = productRepository;
        this.cartItemRepository = cartItemRepository;
    }

    public Product addProduct(String userEmail, Long productId, Integer quantity) throws Exception {
        Optional<Product> product = productRepository.findById(productId);

        CartItem cartItem = cartItemRepository.findByUserEmailAndProductId(userEmail, productId);

        if (!product.isPresent() || product.get().getQuantity() <= 0) {
            throw new Exception();
        }

        product.get().setQuantity(product.get().getQuantity() - quantity);
        productRepository.save(product.get());

        if (cartItem != null) {
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        } else {
            cartItem = new CartItem(userEmail, productId, quantity, LocalDate.now().toString(), LocalDate.now().toString());
        }

        cartItemRepository.save(cartItem);

        return product.get();
    }

    public int currentCartItemsCount(String userEmail) {
        return cartItemRepository.findCartItemsByUserEmail(userEmail).size();
    }

}
