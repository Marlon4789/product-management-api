package com.learnigJava.productapi.mapper;

import com.learnigJava.productapi.dto.request.ProductRequestDTO;
import com.learnigJava.productapi.dto.response.ProductResponseDTO;
import com.learnigJava.productapi.model.Product;
import org.mapstruct.*;

import org.mapstruct.MappingTarget;
import org.mapstruct.BeanMapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    Product toEntity(ProductRequestDTO dto);

    ProductResponseDTO toResponseDTO(Product product);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateProductFromDto(ProductRequestDTO dto, @MappingTarget Product entity);
}