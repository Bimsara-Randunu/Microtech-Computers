package com.example.myorder.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private Integer orderId;
    private String productName;
    private Integer stock;
    private Double price;
    private String email; // Customer who placed the order
}
