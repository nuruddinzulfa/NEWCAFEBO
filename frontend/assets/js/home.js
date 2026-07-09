// ==========================================
// HOME PAGE
// ==========================================

const menuContainer = document.getElementById("menuContainer");

// ==========================================
// RESERVASI
// ==========================================

function goReservation() {

    const token = localStorage.getItem("token");

    if (!token) {

        window.location.href = "login.html";
        return;

    }

    window.location.href = "reservasi.html";

}

// ==========================================
// LOAD MENU
// ==========================================

async function loadMenu() {

    menuContainer.innerHTML = `
        <p style="text-align:center;padding:20px;">
            Memuat menu...
        </p>
    `;

    try {

        const result = await getData("/menus");

        console.log("Response Menu :", result);

        if (!result || !result.success) {

            menuContainer.innerHTML = `
                <p style="color:red;">
                    Gagal mengambil data menu.
                </p>
            `;

            return;

        }

        const menus = result.data;

        menuContainer.innerHTML = "";

        if (menus.length === 0) {

            menuContainer.innerHTML = `
                <p>Menu belum tersedia.</p>
            `;

            return;

        }

        menus.slice(0, 3).forEach(menu => {

            let image = menu.imageUrl;

            if (!image || image === "") {

                image = "assets/images/no-image.png";

            }

            if (
                image &&
                !image.startsWith("http") &&
                !image.startsWith("assets")
            ) {

                image = `http://localhost:5000/uploads/${image}`;

            }

            menuContainer.innerHTML += `

                <div class="today-menu-card">

                    <div class="today-menu-left">

                        <img
                            src="${image}"
                            alt="${menu.name}"
                            class="today-menu-image">

                        <div>

                            <h3 class="today-menu-title">

                                ${menu.name}

                            </h3>

                            <p class="today-menu-desc">

                                ${menu.description ?? "-"}

                            </p>

                        </div>

                    </div>

                    <div class="today-menu-right">

                        <span class="today-menu-price">

                            Rp ${Number(menu.price).toLocaleString("id-ID")}

                        </span>

                    </div>

                </div>

            `;

        });

    } catch (error) {

        console.error(error);

        menuContainer.innerHTML = `
            <p style="color:red;">
                Terjadi kesalahan mengambil data menu.
            </p>
        `;

    }

}

// ==========================================
// START
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    loadMenu();

});