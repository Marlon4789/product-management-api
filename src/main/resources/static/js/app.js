document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("productForm");
    const message = document.getElementById("message");
    const table = document.getElementById("productTable");

    // =====================================
    // MOSTRAR MENSAJES
    // =====================================
    function showMessage(text, color) {

        message.innerHTML = text;
        message.style.color = color;

        setTimeout(() => {
            message.innerHTML = "";
        }, 3000);
    }

    // =====================================
    // CREAR PRODUCTO
    // =====================================
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const product = {
            name: document.getElementById("name").value,
            price: parseFloat(document.getElementById("price").value),
            stock: parseInt(document.getElementById("stock").value)
        };

        try {

            const response = await fetch("/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(product)
            });

            const text = await response.text();
            const data = text ? JSON.parse(text) : {};

            // ✅ SI HAY ERROR BACKEND
            if (!response.ok) {

                let errors = "";

                for (const field in data) {
                    errors += `${field}: ${data[field]} <br>`;
                }

                showMessage(errors || "❌ Error al crear producto", "red");
                return;
            }

            // ✅ ÉXITO
            showMessage("✅ Producto creado correctamente", "green");

            form.reset();
            loadProducts();

        } catch (error) {

            console.error(error);
            showMessage("❌ Error de conexión con el servidor", "red");
        }
    });

    // =====================================
    // CARGAR PRODUCTOS
    // =====================================
    async function loadProducts() {

        try {

            const response = await fetch("/products");
            const products = await response.json();

            table.innerHTML = "";

            products.forEach(p => {

                table.innerHTML += `
                    <tr>
                        <td>${p.id}</td>
                        <td>${p.name}</td>
                        <td>${p.price}</td>
                        <td>${p.stock}</td>
                    </tr>
                `;
            });

        } catch (error) {

            console.error(error);
            showMessage("❌ Error cargando productos", "red");
        }
    }

    // =====================================
    // AUTO LOAD
    // =====================================
    loadProducts();

});