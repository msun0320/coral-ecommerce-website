package com.mingyuesun.springbootecommerce.dao;

import com.mingyuesun.springbootecommerce.entity.CartItem;
import com.mingyuesun.springbootecommerce.entity.Product;
import com.mingyuesun.springbootecommerce.entity.Review;
import com.mingyuesun.springbootecommerce.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    CartItem findByUserAndProduct(User user, Product product);

    List<CartItem> findByUser(User user);

}
