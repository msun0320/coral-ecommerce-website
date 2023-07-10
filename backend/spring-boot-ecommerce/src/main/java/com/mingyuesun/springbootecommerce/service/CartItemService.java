package com.mingyuesun.springbootecommerce.service;

import com.mingyuesun.springbootecommerce.dao.CartItemRepository;
import com.mingyuesun.springbootecommerce.dao.InventoryRepository;
import com.mingyuesun.springbootecommerce.dao.ProductRepository;
import com.mingyuesun.springbootecommerce.entity.CartItem;
import com.mingyuesun.springbootecommerce.entity.Inventory;
import com.mingyuesun.springbootecommerce.entity.User;
import com.mingyuesun.springbootecommerce.requestmodels.CartItemRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CartItemService {

    private ProductRepository productRepository;

    private CartItemRepository cartItemRepository;

    private InventoryRepository inventoryRepository;

    public CartItemService(ProductRepository productRepository, CartItemRepository cartItemRepository, InventoryRepository inventoryRepository) {
        this.productRepository = productRepository;
        this.cartItemRepository = cartItemRepository;
        this.inventoryRepository = inventoryRepository;
    }

    public List<CartItem> getCartItems(User user) {
        return cartItemRepository.findByUser(user);
    }

    public CartItem getCartItem(Long cartItemId) throws Exception {
        Optional<CartItem> cartItem = cartItemRepository.findById(cartItemId);

        if (!cartItem.isPresent()) {
            throw new Exception("Product is not in cart");
        }

        return cartItem.get();
    }

    public int getCartItemsCount(User user) {
        return cartItemRepository.findByUser(user).size();
    }

    public CartItem addToCart(User user, CartItemRequest cartItemRequest) throws Exception {

        Inventory inventory = inventoryRepository.findByProductId(cartItemRequest.getProductId());

        if (inventory == null || inventory.getQuantity() <= cartItemRequest.getQuantity()) {
            throw new Exception("Product is not available");
        }

        inventory.setQuantity(inventory.getQuantity() - cartItemRequest.getQuantity());
        inventoryRepository.save(inventory);

        CartItem cartItem = cartItemRepository.findByUserAndProduct(user, inventory.getProduct());

        if (cartItem != null) {
            cartItem.setQuantity(cartItem.getQuantity() + cartItemRequest.getQuantity());
        } else {
            cartItem = new CartItem();
            cartItem.setUser(user);
            cartItem.setProduct(inventory.getProduct());
            cartItem.setQuantity(cartItemRequest.getQuantity());
        }

        return cartItemRepository.save(cartItem);
    }

    public CartItem updateCartItem(User user, CartItemRequest cartItemRequest, Long cartItemId) throws Exception {
        Inventory inventory = inventoryRepository.findByProductId(cartItemRequest.getProductId());

        if (inventory == null || inventory.getQuantity() <= cartItemRequest.getQuantity()) {
            throw new Exception("Product is not available");
        }

        CartItem cartItem = cartItemRepository.findByUserAndProduct(user, inventory.getProduct());

        cartItem.setQuantity(cartItemRequest.getQuantity());

        return cartItemRepository.save(cartItem);
    }

    public void deleteCartItem(Long cartItemId) throws Exception {
        Optional<CartItem> cartItem = cartItemRepository.findById(cartItemId);

        if (!cartItem.isPresent()) {
            throw new Exception("Product is not in cart");
        }

        Inventory inventory = inventoryRepository.findByProductId(cartItem.get().getProduct().getId());

        inventory.setQuantity(inventory.getQuantity() + cartItem.get().getQuantity());
        inventoryRepository.save(inventory);

        cartItemRepository.delete(cartItem.get());

    }

}