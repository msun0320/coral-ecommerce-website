package com.mingyuesun.springbootecommerce.requestmodels;

import lombok.Data;

@Data
public class ProductRequest {

    private String name;

    private String description;

    private double price;

    private String category;

    private String img;

    private int quantity;

}
