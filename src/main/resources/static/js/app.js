import { loadProducts, saveProduct }
from "./productService.js";

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("productForm");
    const table = document.getElementById("productTable");

    loadProducts(table);

    form.addEventListener("submit", async e => {
        e.preventDefault();

        await saveProduct(form);
        loadProducts(table);
    });

});