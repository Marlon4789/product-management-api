import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from "./api.js";

import { showToast } from "./toast.js";

export async function loadProducts(table) {

    try {

        const products = await getProducts();

        table.innerHTML = "";

        products.forEach(p => {

            table.innerHTML += `
                <tr>
                    <td>${p.id}</td>
                    <td>${p.name}</td>
                    <td>$${p.price.toFixed(2)}</td>
                    <td>${p.stock}</td>
                </tr>
            `;
        });

    } catch {
        showToast("Error cargando productos", "danger");
    }
}

export async function saveProduct(form) {

    const product = {
        name: name.value,
        price: parseFloat(price.value),
        stock: parseInt(stock.value)
    };

    const response = await createProduct(product);

    if (!response.ok)
        return showToast("Error guardando", "danger");

    form.reset();

    showToast("Producto creado ✅");
}