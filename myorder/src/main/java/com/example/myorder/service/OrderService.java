package com.example.myorder.service;

import com.example.myorder.dto.OrderDTO;
import com.example.myorder.model.Orders;
import com.example.myorder.repo.OrderRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private ModelMapper modelMapper;

    // Create an order
    public OrderDTO createOrder(OrderDTO orderDTO) {
        Orders order = modelMapper.map(orderDTO, Orders.class);
        Orders savedOrder = orderRepo.save(order);
        return modelMapper.map(savedOrder, OrderDTO.class);
    }

    // Get order by ID
    public OrderDTO getOrderById(Integer orderId) {
        Orders order = orderRepo.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        return modelMapper.map(order, OrderDTO.class);
    }

    // Get all orders
    public List<OrderDTO> getAllOrders() {
        List<Orders> ordersList = orderRepo.findAll();
        return ordersList.stream()
                .map(order -> modelMapper.map(order, OrderDTO.class))
                .collect(Collectors.toList());
    }

    // Delete an order by ID
    public void deleteOrder(Integer orderId) {
        orderRepo.deleteById(orderId);
    }
}
