package com.mingyuesun.springbootecommerce.controller;

import com.mingyuesun.springbootecommerce.entity.Payment;
import com.mingyuesun.springbootecommerce.entity.User;
import com.mingyuesun.springbootecommerce.requestmodels.PaymentRequest;
import com.mingyuesun.springbootecommerce.service.PaymentService;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("api/payments")
public class PaymentController {

    private PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping("/user")
    public Payment getPayment(@AuthenticationPrincipal User user) {
        return paymentService.getPayment(user);
    }

    @PostMapping("/payment-intent")
    public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentRequest paymentRequest) throws Exception {

        PaymentIntent paymentIntent = paymentService.createPaymentIntent(paymentRequest);
        String paymentStr = paymentIntent.toJson();

        return new ResponseEntity<>(paymentStr, HttpStatus.OK);
    }

    @PutMapping("payment-complete")
    public ResponseEntity<String> stripePaymentComplete(@AuthenticationPrincipal User user) throws Exception {
        if (user == null) {
            throw new Exception("User info is missing");
        }
        return paymentService.stripePayment(user);
    }

}
