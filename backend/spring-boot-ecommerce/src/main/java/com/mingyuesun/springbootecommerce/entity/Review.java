package com.mingyuesun.springbootecommerce.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "created_at")
    @CreationTimestamp
    private Date createdAt;

    @Column(name = "rating")
    private Double rating;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "review_description")
    private String reviewDescription;
}
