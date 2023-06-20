package com.mingyuesun.springbootecommerce.service;

import com.mingyuesun.springbootecommerce.dao.CartItemRepository;
import com.mingyuesun.springbootecommerce.dao.InventoryRepository;
import com.mingyuesun.springbootecommerce.dao.OrderRepository;
import com.mingyuesun.springbootecommerce.entity.*;
import org.springframework.boot.context.properties.bind.validation.BindValidationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class OrderService {

    private OrderRepository orderRepository;

    private CartItemRepository cartItemRepository;

    private InventoryRepository inventoryRepository;

    public OrderService(OrderRepository orderRepository, CartItemRepository cartItemRepository, InventoryRepository inventoryRepository) {
        this.orderRepository = orderRepository;
        this.cartItemRepository = cartItemRepository;
        this.inventoryRepository = inventoryRepository;
    }

    public List<Order> getOrders(User user) {
        return orderRepository.findByUser(user);
    }

    public Order addOrder(User user) throws Exception {
        Order order = new Order();
        order.setUser(user);

        List<CartItem> cartItems = cartItemRepository.findAll();

        if (cartItems == null || cartItems.size() <= 0) {
            throw new Exception("Cart is empty");
        }

        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : cartItems) {
            Inventory inventory = inventoryRepository.findByProductId(cartItem.getProduct().getId());
            if (inventory == null || inventory.getQuantity() <= cartItem.getQuantity()) {
                throw new Exception("Product is not available");
            }
            inventory.setQuantity(inventory.getQuantity() - cartItem.getQuantity());
            inventoryRepository.save(inventory);

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItems.add(orderItem);
        }

        order.setOrderItems(orderItems);

        return order;
    }

}
