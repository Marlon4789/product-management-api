package com.learnigJava.productapi.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class ProductRequestDTO {

    @NotBlank(message = "Name is required")
    private String name;

    @NotNull(message = "The price is required")
    @Positive(message = "The price must be greater than 0")
    private Double price;

    @NotNull(message = "Stock is required")
    @Positive(message = "The stock must be positive")
    private Integer stock;

    //GETTERS
    public String getName() {
        return name;
    }

    public Double getPrice() {
        return price;
    }

    public Integer getStock() {
        return stock;
    }

    // SETTERS

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }
}
