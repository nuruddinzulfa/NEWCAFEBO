// ================================
// ORDER PAGE
// ================================

const menuContainer = document.getElementById("menuContainer");
const cartContainer = document.getElementById("cartContainer");
const grandTotal = document.getElementById("grandTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

const token = localStorage.getItem("token");

if (!token) {

    alert("Silakan login terlebih dahulu.");

    window.location.href = "login.html";

}

let menus = [];
let cart = [];

// ================================
// LOAD MENU
// ================================

async function loadMenu() {

    try {

        const result = await getData("/menus");

        if (!result.success) {

            menuContainer.innerHTML = `
                <h3>Menu tidak ditemukan.</h3>
            `;

            return;

        }

        menus = result.data;

        renderMenu();

    } catch (error) {

        console.log(error);

    }

}

loadMenu();


// ================================
// RENDER MENU
// ================================

function renderMenu() {

    menuContainer.innerHTML = "";

    menus.forEach(menu => {

        let image = menu.imageUrl;

        if (!image || image === "") {

            image = "assets/images/no-image.png";

        }

        if (
            !image.startsWith("http") &&
            !image.startsWith("assets")
        ) {

            image = `http://localhost:5000/uploads/${image}`;

        }

        menuContainer.innerHTML += `

        <div class="menu-item">

            <div class="menu-info">

                <img src="${image}" onerror="this.src='assets/images/no-image.png'">

                <div>

                    <h3>

                        ${menu.name}

                    </h3>

                    <p>

                        ${menu.description ?? ""}

                    </p>

                    <div class="menu-price">

                        Rp ${Number(menu.price).toLocaleString("id-ID")}

                    </div>

                </div>

            </div>

            <button
                class="btn btn-primary"
                onclick="addCart('${menu.id}')">

                Tambah

            </button>

        </div>

        `;

    });

}


// ================================
// ADD CART
// ================================

function addCart(menuId) {

    const menu = menus.find(item => item.id === menuId);

    const exist = cart.find(item => item.id === menuId);

    if (exist) {

        exist.qty++;

    } else {

        cart.push({

            id: menu.id,

            name: menu.name,

            price: menu.price,

            qty: 1

        });

    }

    renderCart();

}


// ================================
// RENDER CART
// ================================

function renderCart() {

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <p>Belum ada menu.</p>
        `;

        grandTotal.innerHTML = "Rp0";

        return;

    }

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.qty;

        cartContainer.innerHTML += `

        <div class="cart-item">

            <div>

                <strong>

                    ${item.name}

                </strong>

                <br>

                Rp ${Number(item.price).toLocaleString("id-ID")}

            </div>

            <div class="qty">

                <button
                    onclick="minusQty('${item.id}')">

                    -

                </button>

                ${item.qty}

                <button
                    onclick="plusQty('${item.id}')">

                    +

                </button>

            </div>

        </div>

        `;

    });

    grandTotal.innerHTML =
        "Rp " + Number(total).toLocaleString("id-ID");

}


// ================================
// PLUS
// ================================

function plusQty(id){

    const item = cart.find(x=>x.id===id);

    item.qty++;

    renderCart();

}


// ================================
// MINUS
// ================================

function minusQty(id){

    const item = cart.find(x=>x.id===id);

    item.qty--;

    if(item.qty<=0){

        cart=cart.filter(x=>x.id!==id);

    }

    renderCart();

}

// ================================
// CHECKOUT
// ================================

checkoutBtn.addEventListener("click", async () => {

    if (cart.length === 0) {

        alert("Keranjang masih kosong.");

        return;

    }

    const customerName = prompt("Nama Pemesan");

    const customerPhone = prompt("Nomor HP");

    const tableId = prompt("Masukkan ID Meja");

    const orderNumber =
        "ORD" + Date.now();

    try {

        // ======================
        // CREATE ORDER
        // ======================

        const orderResult = await postData("/orders", {

            orderNumber,

            customerName,

            customerPhone,

            tableId

        });

        if(!orderResult.success){

            alert(orderResult.message);

            return;

        }

        const orderId =
            orderResult.data.id;

        // ======================
        // CREATE ORDER ITEM
        // ======================

        for(const item of cart){

            await postData("/order-items", {

                orderId,

                menuId:item.id,

                quantity:item.qty

            });

        }

        alert("Order berhasil dibuat.");

        window.location.href=
        `payment.html?id=${orderId}`;

    } catch(error){

        console.log(error);

    }

});