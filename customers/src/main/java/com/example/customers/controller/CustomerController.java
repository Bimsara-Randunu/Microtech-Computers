package com.example.customers.controller;

import com.example.customers.dto.CustomerDTO;
import com.example.customers.model.Customer;
import com.example.customers.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(value = "api/v4/")
@RequiredArgsConstructor
@CrossOrigin
public class CustomerController {
    private final CustomerService customerService;
    private final BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<String> registerCustomer(@RequestBody CustomerDTO customerDTO) {
        customerService.registerCustomer(customerDTO);
        return ResponseEntity.ok("Customer registered successfully!");
    }

    @PostMapping("/signin")
    public ResponseEntity<String> loginCustomer(@RequestBody CustomerDTO customerDTO) {
        Optional<Customer> customer = customerService.findCustomerByEmail(customerDTO.getEmail());

        if (customer.isPresent() && passwordEncoder.matches(customerDTO.getPassword(), customer.get().getPassword())) {
            return ResponseEntity.ok("Login successful!");
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}

