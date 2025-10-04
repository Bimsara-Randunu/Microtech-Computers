package com.example.myproduct.controller;

import com.example.myproduct.dto.ProductDTO;
import com.example.myproduct.model.Product;
import com.example.myproduct.service.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "api/v2")
public class ProductController {
    @Autowired
    private ProductService productService;
    @Autowired
    private ModelMapper modelMapper;

    @GetMapping(value = "/getAllProducts")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }
    @PostMapping(value = "/addProduct")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productService.addProduct(product));
    }
    @PutMapping(value = "/updateProduct")
    public ResponseEntity<Product> updateProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productService.updateProduct(product));
    }
    @GetMapping("/getProduct/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
        return ResponseEntity.ok(productDTO);
    }

    @DeleteMapping("/deleteProduct/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok("Product deleted successfully");
    }
    @GetMapping("/filter/{category}")
    public List<Product> getProductsByCategory(@PathVariable String category) {
        return productService.getProductsByCategory(category);
    }
    @GetMapping("/filterprice/price-range")
    public List<Product> getProductsByPriceRange(@RequestParam double min, @RequestParam double max) {
        return productService.getProductsByPriceRange(min, max);
    }
}
