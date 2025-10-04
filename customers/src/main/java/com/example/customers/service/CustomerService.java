package com.example.customers.service;

import com.example.customers.Repo.CustomerRepo;
import com.example.customers.dto.CustomerDTO;
import com.example.customers.model.Customer;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepo customerRepo;
    private final ModelMapper modelMapper;
    private final BCryptPasswordEncoder passwordEncoder;
    public void registerCustomer(CustomerDTO customerDTO) {
        Customer customer = modelMapper.map(customerDTO, Customer.class);
        customer.setPassword(passwordEncoder.encode(customerDTO.getPassword())); // Encrypt password
        customerRepo.save(customer); //  Save to database
    }

    public Optional<Customer> findCustomerByEmail(String email) {
        return customerRepo.findByEmail(email);
    }
}
