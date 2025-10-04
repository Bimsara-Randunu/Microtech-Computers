package com.example.myproduct.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductDTO {
    private Long id;

    private String name;
    private String category;  // laptop gpu cpu likewise
    private double price;
    private int stock;  // available quantity
}
