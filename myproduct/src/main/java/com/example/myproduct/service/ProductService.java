package com.example.myproduct.service;

import com.example.myproduct.model.Product;
import com.example.myproduct.repo.ProductRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ProductService {
    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private ModelMapper modelMapper;

    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }
    public Product getProductById(Long id) {
        return productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
    }

    public Product addProduct(Product product) {
        return productRepo.save(product);
    }

    public Product updateProduct(Product product) {
        return productRepo.save(product);
    }

    public void deleteProduct(Long id) {
        productRepo.deleteById(id);
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepo.findByCategory(category);
    }

    public List<Product> getProductsByPriceRange(double minPrice, double maxPrice) {
        return productRepo.findByPriceBetween(minPrice, maxPrice);
    }


}
