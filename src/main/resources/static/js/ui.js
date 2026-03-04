let currentPage = 1;
const rowsPerPage = 5;

function renderTable(products) {

    const table = document.getElementById("productTable");
    table.innerHTML = "";

    const start = (currentPage - 1) * rowsPerPage;

    products
        .slice(start, start + rowsPerPage)
        .forEach(p => {

            table.innerHTML += `
<tr>
<td>${p.id}</td>
<td>${p.name}</td>
<td>$${p.price}</td>
<td>${p.stock}</td>

<td>
<button class="btn btn-warning btn-sm"
onclick="editProduct(${p.id})">
Editar
</button>

<button class="btn btn-danger btn-sm"
onclick="openDeleteModal(${p.id})">
Eliminar
</button>
</td>
</tr>`;
        });
}


/* ✅ PAGINATION */
function renderPagination(products) {

    const pagination =
        document.getElementById("pagination");

    pagination.innerHTML = "";

    const pages =
        Math.ceil(products.length / rowsPerPage);

    for (let i = 1; i <= pages; i++) {

        pagination.innerHTML += `
<li class="page-item ${i===currentPage?'active':''}">
<a class="page-link"
onclick="changePage(${i})">${i}</a>
</li>`;
    }
}

function changePage(page) {
    currentPage = page;
    loadProducts();
}


/* ✅ TOAST */
function showToast(message, type) {

    const toastEl =
        document.getElementById("liveToast");

    const toastBody =
        document.getElementById("toastMessage");

    toastBody.textContent = message;

    toastEl.classList.remove(
        "bg-success",
        "bg-danger"
    );

    toastEl.classList.add(
        type === "danger"
            ? "bg-danger"
            : "bg-success",
        "text-white"
    );

    new bootstrap.Toast(toastEl).show();
}


/* ✅ LOADER */
function showLoader(show) {

    document
        .getElementById("loader")
        .classList.toggle("d-none", !show);
}