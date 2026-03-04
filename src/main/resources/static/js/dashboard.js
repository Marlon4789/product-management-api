function updateDashboard(products){

    document.getElementById("totalProducts")
        .innerText = products.length;

    document.getElementById("totalStock")
        .innerText =
        products.reduce((a,p)=>a+p.stock,0);

    document.getElementById("totalValue")
        .innerText =
        "$" +
        products.reduce(
            (a,p)=>a+(p.price*p.stock),0
        ).toFixed(2);
}