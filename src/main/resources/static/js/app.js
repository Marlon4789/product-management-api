/* ================= CONFIG ================= */

const API = "/products";

let products = [];
let filtered = [];

let editId = null;
let deleteId = null;

let newProductId = null;
let updatedProductId = null;

let currentPage = 1;
const rows = 5;


/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("createBtn")
        .addEventListener("click", createProduct);

    document.getElementById("confirmEdit")
        .addEventListener("click", updateProduct);

    document.getElementById("confirmDelete")
        .addEventListener("click", deleteConfirmed);

    document.getElementById("search")
        .addEventListener("input", searchProducts);

    loadProducts();
});


/* ================= LOAD ================= */

async function loadProducts() {

    const res = await fetch(API);
    products = await res.json();

    filtered = [...products];

    const totalPages = Math.ceil(filtered.length / rows);

    if (currentPage > totalPages && totalPages > 0) {
        currentPage = totalPages;
    }

    renderTable();
    renderPagination();
    updateDashboard();
}

// ===== Dark mode =========

const toggleBtn = document.getElementById("darkToggle");

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        toggleBtn.innerHTML = '<i class="bi bi-sun-fill"></i>';
    } else {
        toggleBtn.innerHTML = '<i class="bi bi-moon-fill"></i>';
    }
});


/* ================= CREATE ================= */

async function createProduct() {

    const nameInput = document.getElementById("name");
    const priceInput = document.getElementById("price");
    const stockInput = document.getElementById("stock");

    const product = {
        name: nameInput.value.trim(),
        price: Number(priceInput.value),
        stock: Number(stockInput.value)
    };

    if (!product.name || product.price <= 0 || product.stock <= 0) {
        showToast("Invalid data", "warning");
        return;
    }

    const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    });

    if (!res.ok) {
        showToast("Error saving product", "danger");
        return;
    }

    const saved = await res.json();

    newProductId = saved.id;

    products.unshift(saved);
    filtered.unshift(saved);

    document.getElementById("productForm").reset();

    currentPage = 1;

    renderTable();
    renderPagination();
    updateDashboard();

    showToast("Product created");
}


/* ================= TABLE ================= */

function renderTable() {

    const table = document.getElementById("productTable");
    table.innerHTML = "";

    const start = (currentPage - 1) * rows;

    filtered
        .slice(start, start + rows)
        .forEach(p => {

            table.innerHTML += `
            <tr id="row-${p.id}"
                class="
                ${p.id === newProductId ? 'row-new' : ''}
                ${p.id === updatedProductId ? 'row-updated' : ''}
                ">
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>$ ${formatCurrency(p.price)}</td>
                <td>${formatCurrency(p.stock)}</td>
                <td class="text-start">
                    <button class="action-btn action-edit"
                        onclick="openEdit(${p.id})">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="action-btn action-delete"
                        onclick="openDelete(${p.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
            `;
        });

    setTimeout(() => {
        newProductId = null;
        updatedProductId = null;
    }, 1500);
}


/* ================= EDIT ================= */

function openEdit(id) {

    editId = id;

    const p = products.find(x => x.id === id);

    document.getElementById("editName").value = p.name;
    document.getElementById("editPrice").value = p.price;
    document.getElementById("editStock").value = p.stock;

    new bootstrap.Modal(
        document.getElementById("editModal")
    ).show();
}

async function updateProduct() {

    const product = {
        name: document.getElementById("editName").value.trim(),
        price: Number(document.getElementById("editPrice").value),
        stock: Number(document.getElementById("editStock").value)
    };

    await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    });

    updatedProductId = editId;

    bootstrap.Modal
        .getInstance(document.getElementById("editModal"))
        .hide();

    showToast("Product updated");

    loadProducts();
}


/* ================= DELETE ================= */

function openDelete(id) {

    deleteId = id;

    new bootstrap.Modal(
        document.getElementById("deleteModal")
    ).show();
}

async function deleteConfirmed() {

    const row = document.getElementById(`row-${deleteId}`);
    row.classList.add("row-remove");

    setTimeout(async () => {

        await fetch(`${API}/${deleteId}`, {
            method: "DELETE"
        });

        bootstrap.Modal
            .getInstance(document.getElementById("deleteModal"))
            .hide();

        showToast("Product deleted", "danger");

        loadProducts();

    }, 400);
}


/* ================= SEARCH ================= */

function searchProducts(e) {

    const text = e.target.value.toLowerCase();

    filtered = products.filter(p =>
        p.name.toLowerCase().includes(text)
    );

    currentPage = 1;

    renderTable();
    renderPagination();
}


/* ================= PAGINATION ================= */

function renderPagination() {

    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    const totalPages = Math.ceil(filtered.length / rows);

    /* Ajuste inteligente de página */
    if (currentPage > totalPages && totalPages > 0) {
        currentPage = totalPages;
    }

    if (totalPages === 0) {
        currentPage = 1;
        return;
    }

    for (let i = 1; i <= totalPages; i++) {

        const li = document.createElement("li");

        li.className = `page-item ${i === currentPage ? 'active' : ''}`;

        li.innerHTML = `<button class="page-link">${i}</button>`;

        li.style.cursor = "pointer";
        li.onclick = () => changePage(i);

        pagination.appendChild(li);
    }
}

function changePage(p) {

    const table = document.getElementById("productTable");

    table.classList.add("table-fade-out");

    setTimeout(() => {

        currentPage = p;

        renderTable();
        renderPagination();

        table.classList.remove("table-fade-out");
        table.classList.add("table-fade-in");

        setTimeout(() => {
            table.classList.remove("table-fade-in");
        }, 250);

    }, 200);
}


/* ================= DASHBOARD ================= */

function formatCurrency(value) {
    return new Intl.NumberFormat("es-CO", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

function updateDashboard() {

    document.getElementById("totalProducts")
        .textContent = products.length;

    const totalStock =
        products.reduce((a, p) => a + Number(p.stock), 0);

    document.getElementById("totalStock")
        .textContent = formatCurrency(totalStock);

    const totalValue =
        products.reduce((a, p) =>
            a + (Number(p.price) * Number(p.stock)), 0
        );

    document.getElementById("totalValue")
        .textContent = "$ " + formatCurrency(Math.round(totalValue));
}

/* ================= TOAST ================= */

function showToast(message, type = "success") {

    const toastEl = document.getElementById("appToast");
    const body = document.getElementById("toastBody");

    toastEl.classList.remove("bg-success", "bg-danger");

    toastEl.classList.add(
        type === "danger" || type === "warning"
            ? "bg-danger"
            : "bg-success"
    );

    body.textContent = message;

    new bootstrap.Toast(toastEl, {
        delay: 2500,
        autohide: true
    }).show();
}

