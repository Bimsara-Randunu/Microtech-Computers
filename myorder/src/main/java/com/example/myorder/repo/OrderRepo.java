package com.example.myorder.repo;

import com.example.myorder.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepo extends JpaRepository<Orders, Integer> {
    // Find orders by customer's email
    List<Orders> findByEmail(String email);
}
