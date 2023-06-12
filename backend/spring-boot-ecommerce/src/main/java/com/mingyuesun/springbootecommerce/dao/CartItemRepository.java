package com.mingyuesun.springbootecommerce.dao;

import com.mingyuesun.springbootecommerce.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    CartItem findByUserEmailAndProductId(String userEmail, Long productId);

    List<CartItem> findByUserEmail(String userEmail);

}
