package com.mingyuesun.springbootecommerce.service;

import com.mingyuesun.springbootecommerce.dao.CartRepository;
import com.mingyuesun.springbootecommerce.dao.ProductRepository;
import com.mingyuesun.springbootecommerce.entity.Cart;
import com.mingyuesun.springbootecommerce.entity.Product;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductService {

    private ProductRepository productRepository;

    private CartRepository cartRepository;

    public ProductService(ProductRepository productRepository, CartRepository cartRepository) {
        this.productRepository = productRepository;
        this.cartRepository = cartRepository;
    }

    public List<Cart> getCart(String userEmail) throws Exception {
        return cartRepository.findCartByUserEmail(userEmail);
    }

    public Product addToCart(String userEmail, Long productId, Integer quantity) throws Exception {
        Optional<Product> product = productRepository.findById(productId);

        Cart cart = cartRepository.findByUserEmailAndProduct(userEmail, product.get());

        if (!product.isPresent() || product.get().getQuantity() <= 0) {
            throw new Exception();
        }

        product.get().setQuantity(product.get().getQuantity() - quantity);
        productRepository.save(product.get());

        if (cart != null) {
            cart.setQuantity(cart.getQuantity() + quantity);
        } else {
            cart = new Cart(userEmail, product.get(), quantity, LocalDate.now().toString(), LocalDate.now().toString());
        }

        cartRepository.save(cart);

        return product.get();
    }

    public int cartCount(String userEmail) {
        return cartRepository.findCartByUserEmail(userEmail).size();
    }

    public void deleteFromCart(String userEmail, Long productId) throws Exception {

        Optional<Product> product = productRepository.findById(productId);

        if (!product.isPresent()) {
            throw new Exception("Product does not exist");
        }

        Cart cart = cartRepository.findByUserEmailAndProduct(userEmail, product.get());

        if (cart == null) {
            throw new Exception("Product is not in cart");
        }

        product.get().setQuantity(product.get().getQuantity() + cart.getQuantity());

        productRepository.save(product.get());
        cartRepository.deleteById(cart.getId());
    }

}
