package com.mingyuesun.springbootecommerce.controller;

import com.mingyuesun.springbootecommerce.entity.CartItem;
import com.mingyuesun.springbootecommerce.entity.User;
import com.mingyuesun.springbootecommerce.requestmodels.CartItemRequest;
import com.mingyuesun.springbootecommerce.service.CartItemService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/cartItems")
public class CartItemController {

    private CartItemService cartItemService;

    public CartItemController(CartItemService cartItemService) {
        this.cartItemService = cartItemService;
    }

    @GetMapping
    public List<CartItem> getCartItems(@AuthenticationPrincipal User user) {
        return cartItemService.getCartItems(user);
    }

    @GetMapping("/{cartItemId}")
    public CartItem getCartItem(@PathVariable Long cartItemId) throws Exception {
        return cartItemService.getCartItem(cartItemId);
    }

    @GetMapping("/count")
    public int getCartItemsCount(@AuthenticationPrincipal User user) {
        return cartItemService.getCartItemsCount(user);
    }

    @PostMapping
    public CartItem addToCart(@AuthenticationPrincipal User user,
                              @RequestBody CartItemRequest cartItemRequest) throws Exception {
        return cartItemService.addToCart(user, cartItemRequest);
    }

    @PatchMapping("/{cartItemId}")
    public CartItem updateCartItem(@AuthenticationPrincipal User user,
                               @RequestBody CartItemRequest cartItemRequest,
                               @PathVariable("cartItemId") Long cartItemId) throws Exception {
        return cartItemService.updateCartItem(user, cartItemRequest, cartItemId);
    }

    @DeleteMapping("/{cartItemId}")
    public void deleteCartItem(@PathVariable("cartItemId") Long cartItemId) throws Exception {
        cartItemService.deleteCartItem(cartItemId);
    }

}
