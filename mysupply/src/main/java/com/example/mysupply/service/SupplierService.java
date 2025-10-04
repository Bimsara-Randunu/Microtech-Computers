package com.example.mysupply.service;

import com.example.mysupply.model.Supplier;
import com.example.mysupply.repo.SupplierRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SupplierService {
    @Autowired
    private SupplierRepo supplierRepo;

    public Supplier addSupplier(Supplier supplier) {
        return supplierRepo.save(supplier);
    }

    public Supplier updateSupplier(Long id, Supplier updatedSupplier) {
        Optional<Supplier> existingSupplier = supplierRepo.findById(id);
        if (existingSupplier.isPresent()) {
            Supplier supplier = existingSupplier.get();
            supplier.setName(updatedSupplier.getName());
            supplier.setContactNumber(updatedSupplier.getContactNumber());
            supplier.setEmail(updatedSupplier.getEmail());
            supplier.setAddress(updatedSupplier.getAddress());
            return supplierRepo.save(supplier);
        }
        return null;
    }

    public Supplier getSupplierById(Long id) {
        return supplierRepo.findById(id).orElse(null);
    }

    public List<Supplier> getAllSuppliers() {
        return supplierRepo.findAll();
    }

    public String deleteSupplier(Long id) {
        if (supplierRepo.existsById(id)) {
            supplierRepo.deleteById(id);
            return "Supplier deleted successfully!";
        }
        return "Supplier not found!";
    }
}
