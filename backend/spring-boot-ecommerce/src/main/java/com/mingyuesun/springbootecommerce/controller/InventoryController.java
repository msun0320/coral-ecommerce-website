package com.mingyuesun.springbootecommerce.controller;

import com.mingyuesun.springbootecommerce.entity.Inventory;
import com.mingyuesun.springbootecommerce.requestmodels.InventoryRequest;
import com.mingyuesun.springbootecommerce.service.InventoryService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/inventories")
public class InventoryController {

    private InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping("/{inventoryId}")
    public Inventory getInventory(@PathVariable("inventoryId") long inventoryId) throws Exception {
        return inventoryService.getInventory(inventoryId);
    }

    @PutMapping("/{inventoryId}")
    public Inventory updateInventory(@RequestBody InventoryRequest inventoryRequest,
                                     @PathVariable("inventoryId") long inventoryId) throws Exception {
        return inventoryService.updateInventory(inventoryRequest, inventoryId);
    }

}