package com.mingyuesun.springbootecommerce.dao;

import com.mingyuesun.springbootecommerce.entity.Order;
import com.mingyuesun.springbootecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUser(User user);

}
