package com.mingyuesun.springbootecommerce.requestmodels;

import lombok.Data;

@Data
public class PaymentRequest {

    private int amount;

    private String currency;

}
