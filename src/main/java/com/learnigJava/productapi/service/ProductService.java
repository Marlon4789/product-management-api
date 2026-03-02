package com.learnigJava.productapi.service;

import com.learnigJava.productapi.dto.request.ProductRequestDTO;
import com.learnigJava.productapi.dto.response.ProductResponseDTO;
import com.learnigJava.productapi.mapper.ProductMapper;
import com.learnigJava.productapi.model.Product;
import com.learnigJava.productapi.repository.ProductRepository;
import org.springframework.stereotype.Service;
import com.learnigJava.productapi.exception.ResourceNotFoundException;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repository;
    private final ProductMapper mapper;

    public ProductService(ProductRepository repository, ProductMapper mapper){
        this.repository = repository;
        this.mapper = mapper;
    }

    public ProductResponseDTO create(ProductRequestDTO dto){
        Product product = mapper.toEntity(dto);
        Product saved = repository.save(product);
        return mapper.toResponseDTO(saved);
    }

    public List<ProductResponseDTO> getAll(){
        return repository.findAllByOrderByIdAsc()
                .stream()
                .map(mapper::toResponseDTO)
                .toList();
    }

    public ProductResponseDTO getById(Long id){
        Product product = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product with id " + id + " not found"));
        return mapper.toResponseDTO(product);
    }

    public ProductResponseDTO update(Long id, ProductRequestDTO dto){
        Product existing = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product with id " + id + " not found"));


        Product updated = mapper.toEntity(dto);
        updated.setId(existing.getId());

        return mapper.toResponseDTO(repository.save(updated));
    }

    public ProductResponseDTO partialUpdate(Long id, ProductRequestDTO dto){
        Product existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));


        mapper.updateProductFromDto(dto, existing);

        Product saved = repository.save(existing);
        return mapper.toResponseDTO(saved);
    }

    public void delete(Long id){

        Product product = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product with id " + id + " not found"
                        ));

        repository.delete(product);
    }
}