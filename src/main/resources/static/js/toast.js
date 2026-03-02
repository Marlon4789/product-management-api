export function showToast(text, type = "success") {

    const toastEl = document.getElementById("appToast");
    const toastMessage = document.getElementById("toastMessage");

    toastEl.className =
        `toast align-items-center text-bg-${type} border-0`;

    toastMessage.textContent = text;

    const toast = bootstrap.Toast.getOrCreateInstance(toastEl, {
        delay: 3000
    });

    toast.show();
}