package com.mingyuesun.springbootecommerce.controller;

import com.mingyuesun.springbootecommerce.entity.Order;
import com.mingyuesun.springbootecommerce.entity.User;
import com.mingyuesun.springbootecommerce.service.OrderService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public List<Order> getOrders(@AuthenticationPrincipal User user) {
        return orderService.getOrders(user);
    }

    @PostMapping
    public Order addOrder(@AuthenticationPrincipal User user) throws Exception {
        return orderService.addOrder(user);
    }

}
