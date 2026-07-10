const form = document.getElementById("registerForm");
const submitBtn = form.querySelector(".btn-primary");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        fullName: document.getElementById("fullName").value.trim(),
        email: document.getElementById("email").value.trim(),
        phoneNumber: document.getElementById("phoneNumber").value.trim(),
        password: document.getElementById("password").value
    };

    if (!data.fullName || !data.email || !data.password) {
        alert("Harap isi semua field yang wajib.");
        return;
    }

    if (data.password.length < 6) {
        alert("Password minimal 6 karakter.");
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Mendaftarkan...";

    try {
        const response = await fetch("http://localhost:5000/api/v1/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            alert("Registrasi berhasil! Silakan login.");
            window.location.href = "login.html";
        } else {
            alert(result.message || "Registrasi gagal.");
        }
    } catch (error) {
        alert("Terjadi kesalahan. Coba lagi.");
        console.error(error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Daftar";
    }
});