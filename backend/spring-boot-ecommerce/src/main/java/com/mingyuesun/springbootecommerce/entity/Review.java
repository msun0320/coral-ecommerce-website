package com.mingyuesun.springbootecommerce.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Table(name = "review")
@Data
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "create_at")
    @CreationTimestamp
    private Date createAt;

    @Column(name = "rating")
    private double rating;

    @Column(name = "product_id")
    private Long productId;

    @Column(name = "review_description")
    private String reviewDescription;
}
