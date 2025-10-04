package com.example.mysupply.controller;

import com.example.mysupply.model.Supplier;
import com.example.mysupply.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/suppliers")
@CrossOrigin
public class SupplierController {
    @Autowired
    private SupplierService supplierService;

    @PostMapping("/add")
    public ResponseEntity<Supplier> addSupplier(@RequestBody Supplier supplier) {
        return ResponseEntity.ok(supplierService.addSupplier(supplier));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Supplier> updateSupplier(@PathVariable Long id, @RequestBody Supplier supplier) {
        return ResponseEntity.ok(supplierService.updateSupplier(id, supplier));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Supplier> getSupplierById(@PathVariable Long id) {
        return ResponseEntity.ok(supplierService.getSupplierById(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Supplier>> getAllSuppliers() {
        return ResponseEntity.ok(supplierService.getAllSuppliers());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteSupplier(@PathVariable Long id) {
        return ResponseEntity.ok(supplierService.deleteSupplier(id));
    }
}
