package com.mingyuesun.springbootecommerce.dao;

import com.mingyuesun.springbootecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
