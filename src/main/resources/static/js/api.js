const API_URL = "/products";

export async function getProducts() {
    const res = await fetch(API_URL);
    return await res.json();
}

export async function createProduct(product) {
    return fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    });
}

export async function updateProduct(id, product) {
    return fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    });
}

export async function deleteProduct(id) {
    return fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
}