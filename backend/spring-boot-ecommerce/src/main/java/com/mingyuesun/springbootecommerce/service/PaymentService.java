package com.mingyuesun.springbootecommerce.service;

import com.mingyuesun.springbootecommerce.dao.CartItemRepository;
import com.mingyuesun.springbootecommerce.dao.PaymentRepository;
import com.mingyuesun.springbootecommerce.entity.CartItem;
import com.mingyuesun.springbootecommerce.entity.Payment;
import com.mingyuesun.springbootecommerce.entity.User;
import com.mingyuesun.springbootecommerce.requestmodels.PaymentRequest;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class PaymentService {

    private PaymentRepository paymentRepository;

    private CartItemRepository cartItemRepository;

    @Autowired
    public PaymentService(PaymentRepository paymentRepository, CartItemRepository cartItemRepository, @Value("${stripe.key.secret}") String secretKey) {
        this.paymentRepository = paymentRepository;
        this.cartItemRepository = cartItemRepository;
        Stripe.apiKey = secretKey;
    }

    public Payment getPayment(User user) {
        return paymentRepository.findByUser(user);
    }

    public PaymentIntent createPaymentIntent(PaymentRequest paymentRequest) throws StripeException {
        List<String> paymentMethodTypes = new ArrayList<>();
        paymentMethodTypes.add("card");

        Map<String, Object> params = new HashMap<>();
        params.put("amount", paymentRequest.getAmount());
        params.put("currency", paymentRequest.getCurrency());
        params.put("payment_method_types", paymentMethodTypes);

        return PaymentIntent.create(params);
    }

    public ResponseEntity<String> stripePayment(User user) throws Exception {
        Payment payment = paymentRepository.findByUser(user);

        if (payment == null) {
            throw new Exception("Payment information is missing");
        }
        payment.setAmount(00.00);
        paymentRepository.save(payment);

        List<CartItem> cartItems = cartItemRepository.findByUser(user);
        cartItemRepository.deleteAll(cartItems);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
