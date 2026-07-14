const form = document.getElementById("loginForm");
const submitBtn = form.querySelector(".btn-primary");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Harap isi email dan password.");
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Memproses...";

    try {
        const response = await fetch("http://localhost:5000/api/v1/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (result.success) {
            localStorage.setItem("token", result.data.accessToken);
            localStorage.setItem("user", JSON.stringify(result.data.user));
            
            window.location.href = "index.html";
        } else {
            alert(result.message || "Login gagal.");
        }
    } catch (error) {
        alert("Terjadi kesalahan. Coba lagi.");
        console.error(error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Login";
    }
});

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "login.html";
}
