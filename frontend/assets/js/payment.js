const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "login.html";

}

const params = new URLSearchParams(window.location.search);

const orderId = params.get("id");

const fromReservation = params.get("from") === "reservation";

const form = document.getElementById("paymentForm");

const orderInfoBox = document.getElementById("orderInfo");

const minPayNote = document.getElementById("minPayNote");

const paymentMethodSelect = document.getElementById("paymentMethod");

const bankSection = document.getElementById("bankSection");

const qrisSection = document.getElementById("qrisSection");

let orderData = null;

// ================================
// TOGGLE BANK / QRIS
// ================================

paymentMethodSelect.addEventListener("change", () => {

    const method = paymentMethodSelect.value;

    bankSection.style.display = method === "TRANSFER" ? "block" : "none";

    qrisSection.style.display = method === "QRIS" ? "block" : "none";

});

// ================================
// LOAD ORDER
// ================================

async function loadOrder() {

    if (!orderId) {

        orderInfoBox.innerHTML = `<p style="color:red;">ID pesanan tidak ditemukan.</p>`;

        return;

    }

    try {

        const result = await getData(`/orders/${orderId}`);

        if (!result.success) {

            orderInfoBox.innerHTML = `<p style="color:red;">Pesanan tidak ditemukan.</p>`;

            return;

        }

        orderData = result.data;

        const total = Number(orderData.totalAmount);

        const isReservasi = fromReservation;

        if (isReservasi) {

            const cashOption = document.querySelector('#paymentMethod option[value="CASH"]');

            if (cashOption) cashOption.remove();

        }

        const minPayPercent = isReservasi ? 0.5 : 1;

        const minPay = Math.ceil(total * minPayPercent);

        const payLabel = isReservasi

            ? `Pesan dari Reservasi - Minimal bayar DP 50%`

            : `Pesan dari Meja - Harus bayar lunas`;

        const payNote = isReservasi

            ? `Minimal DP 50%: Rp ${minPay.toLocaleString("id-ID")}`

            : `Total yang harus dibayar: Rp ${total.toLocaleString("id-ID")}`;

        orderInfoBox.innerHTML = `

            <div class="order-type-badge ${isReservasi ? 'badge-reservation' : 'badge-table'}">

                ${isReservasi ? '📋 Reservasi' : '🍽️ Pesan dari Meja'}

            </div>

            <div class="order-row">

                <span>Nomor Pesanan</span>

                <span>${orderData.orderNumber}</span>

            </div>

            <div class="order-row">

                <span>Nama Pemesan</span>

                <span>${orderData.customerName ?? "-"}</span>

            </div>

            <div class="order-row">

                <span>Nomor HP</span>

                <span>${orderData.customerPhone ?? "-"}</span>

            </div>

            <div class="order-row">

                <span>Jumlah Item</span>

                <span>${orderData.orderItems.length} item</span>

            </div>

            <div class="order-total">

                <span>Total Tagihan</span>

                <span>Rp ${total.toLocaleString("id-ID")}</span>

            </div>

            <div class="order-pay-info">

                <span>${payLabel}</span>

            </div>

        `;

        minPayNote.textContent = payNote;

        document.getElementById("paidAmount").min = minPay;

        document.getElementById("paidAmount").placeholder = isReservasi

            ? `Minimal Rp ${minPay.toLocaleString("id-ID")}`

            : `Rp ${total.toLocaleString("id-ID")}`;

        document.getElementById("paidAmount").value = minPay;

    } catch (error) {

        console.error(error);

        orderInfoBox.innerHTML = `<p style="color:red;">Gagal memuat data pesanan.</p>`;

    }

}

loadOrder();

// ================================
// SUBMIT PAYMENT
// ================================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    if (!orderData) {

        alert("Data pesanan belum dimuat.");

        return;

    }

    const paymentMethod =
        document.getElementById("paymentMethod").value;

    const bankName =
        document.getElementById("bankName").value;

    const paidAmount =
        Number(document.getElementById("paidAmount").value);

    const total = Number(orderData.totalAmount);

    const isReservasi = fromReservation;

    const minPayPercent = isReservasi ? 0.5 : 1;

    const minPay = Math.ceil(total * minPayPercent);

    if (paidAmount < minPay) {

        if (isReservasi) {

            alert(`Pesan dari reservasi harus bayar DP minimal 50%, yaitu Rp ${minPay.toLocaleString("id-ID")}`);

        } else {

            alert(`Pesan dari meja harus bayar lunas, yaitu Rp ${total.toLocaleString("id-ID")}`);

        }

        return;

    }

    const methodLabel = paymentMethod === "TRANSFER"

        ? `TRANSFER ${bankName}`

        : paymentMethod;

    const result = await postData("/payments", {

        orderId,

        paymentMethod: methodLabel,

        paidAmount

    });

    if (result.success) {

        alert("Pembayaran berhasil! Pesanan telah dikonfirmasi.");

        localStorage.removeItem("cart");

        window.location.href = "success.html";

    } else {

        alert(result.message || "Pembayaran gagal.");

    }

});
