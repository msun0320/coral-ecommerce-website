package com.mingyuesun.springbootecommerce.service;

import com.mingyuesun.springbootecommerce.dao.InventoryRepository;
import com.mingyuesun.springbootecommerce.entity.Inventory;
import com.mingyuesun.springbootecommerce.requestmodels.InventoryRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class InventoryService {

    private InventoryRepository inventoryRepository;

    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public Inventory getInventory(Long inventoryId) throws Exception {
        Optional<Inventory> inventory = inventoryRepository.findById(inventoryId);

        if (!inventory.isPresent()) {
            throw new Exception("Inventory does not exist");
        }

        return inventory.get();
    }

    public Inventory updateInventory(InventoryRequest inventoryRequest, Long inventoryId) throws Exception {
        Optional<Inventory> inventory = inventoryRepository.findById(inventoryId);

        if (!inventory.isPresent()) {
            throw new Exception("Inventory does not exist");
        }

        inventory.get().setQuantity(inventoryRequest.getQuantity());

        return inventoryRepository.save(inventory.get());
    }

}
