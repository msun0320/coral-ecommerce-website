package com.mingyuesun.springbootecommerce.dao;

import com.mingyuesun.springbootecommerce.entity.Product;
import com.mingyuesun.springbootecommerce.entity.Review;
import com.mingyuesun.springbootecommerce.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Page<Review> findByProductId(Long productId, Pageable pageable);

    Review findByUserAndProduct(User user, Product product);

}
