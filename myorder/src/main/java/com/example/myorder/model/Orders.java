package com.example.myorder.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Integer orderId;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "stock")
    private Integer stock;

    @Column(name = "price")
    private Double price;

    @Column(name = "email")
    private String email; // Email of the logged-in customer who placed the order
}