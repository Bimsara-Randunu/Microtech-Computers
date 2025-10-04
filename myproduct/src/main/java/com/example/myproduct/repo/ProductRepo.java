package com.example.myproduct.repo;

import com.example.myproduct.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepo extends JpaRepository<Product,Long> {
    Optional<Product> findById(Long id);

    List<Product> findByCategory(String category);
    List<Product> findByPriceBetween(double minPrice, double maxPrice);
}
