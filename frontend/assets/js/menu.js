// =========================================
// MENU PAGE
// =========================================

const menuList = document.getElementById("menuList");
const categoryContainer = document.getElementById("categoryContainer");
const searchInput = document.getElementById("searchMenu");

let menus = [];
let categories = [];
let selectedCategory = "";

// =========================================
// LOAD CATEGORY
// =========================================

async function loadCategories() {

    try {

        const result = await getData("/categories");

        if (!result.success) return;

        categories = result.data;

        categoryContainer.innerHTML = "";

        // tombol semua
        categoryContainer.innerHTML += `
            <button
                class="category-btn category-active"
                onclick="filterCategory('')">

                Semua

            </button>
        `;

        categories.forEach(category => {

            categoryContainer.innerHTML += `

                <button
                    class="category-btn"
                    onclick="filterCategory('${category.id}')">

                    ${category.name}

                </button>

            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// =========================================
// LOAD MENU
// =========================================

async function loadMenus() {

    try {

        const result = await getData("/menus");

        if (!result.success) {

            menuList.innerHTML = `
                <h2>Menu tidak ditemukan.</h2>
            `;

            return;
        }

        menus = result.data;

        renderMenu(menus);

    } catch (error) {

        console.error(error);

    }

}

// =========================================
// RENDER MENU
// =========================================

function renderMenu(data) {

    menuList.innerHTML = "";

    if (data.length === 0) {

        menuList.innerHTML = `
            <h2>Menu tidak tersedia.</h2>
        `;

        return;

    }

    data.forEach(menu => {

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

        menuList.innerHTML += `

            <div class="card">

                <img
                    src="${image}"
                    alt="${menu.name}"
                    onerror="this.src='assets/images/no-image.png'">

                <div class="card-body">

                    <h3>

                        ${menu.name}

                    </h3>

                    <p>

                        ${menu.description ?? "-"}

                    </p>

                    <div class="price">

                        <span>

                            Rp ${Number(menu.price).toLocaleString("id-ID")}

                        </span>

                        <button
                            class="btn btn-primary"
                            onclick="orderMenu('${menu.id}')">

                            Pesan

                        </button>

                    </div>

                </div>

            </div>

        `;

    });

}

// =========================================
// FILTER CATEGORY
// =========================================

function filterCategory(categoryId) {

    selectedCategory = categoryId;

    document.querySelectorAll(".category-btn")
        .forEach(btn => {

            btn.classList.remove("category-active");

        });

    event.target.classList.add("category-active");

    if (categoryId === "") {

        renderMenu(menus);

        return;

    }

    const filtered = menus.filter(menu => {

        return menu.categoryId === categoryId;

    });

    renderMenu(filtered);

}

// =========================================
// SEARCH
// =========================================

searchInput.addEventListener("keyup", () => {

    const keyword = searchInput.value.toLowerCase();

    const filtered = menus.filter(menu => {

        return menu.name
            .toLowerCase()
            .includes(keyword);

    });

    renderMenu(filtered);

});

// =========================================
// ORDER
// =========================================

function orderMenu(id) {

    const urlParams = new URLSearchParams(window.location.search);

    const from = urlParams.get("from");

    let url = `order.html?menu=${id}`;

    if (from) url += `&from=${from}`;

    window.location.href = url;

}

// =========================================
// START
// =========================================

loadCategories();

loadMenus();