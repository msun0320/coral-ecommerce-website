package com.mingyuesun.springbootecommerce.dao;

import com.mingyuesun.springbootecommerce.entity.Cart;
import com.mingyuesun.springbootecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {

    Cart findByUserEmailAndProduct(String userEmail, Product product);

    List<Cart> findCartByUserEmail(String userEmail);

}
