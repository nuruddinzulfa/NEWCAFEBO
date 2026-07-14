const menuContainer = document.getElementById("menuContainer");
const scheduleContainer = document.getElementById("scheduleContainer");

function goReservation() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
        return;
    }
    window.location.href = "reservasi.html";
}

function getImageUrl(menu) {
    let image = menu.imageUrl;
    if (!image || image === "") {
        return "assets/images/no-image.png";
    }
    if (image.startsWith("http") || image.startsWith("assets")) {
        return image;
    }
    return `http://localhost:5000/uploads/${image}`;
}

async function loadRecommendedMenus() {
    menuContainer.innerHTML = `<p style="text-align:center;padding:20px;">Memuat menu...</p>`;

    try {
        const result = await getData("/menus/recommended");

        if (!result || !result.success) {
            menuContainer.innerHTML = `<p style="color:red;">Gagal mengambil data menu.</p>`;
            return;
        }

        const menus = result.data;
        menuContainer.innerHTML = "";

        if (menus.length === 0) {
            menuContainer.innerHTML = `<p>Menu rekomendasi belum tersedia.</p>`;
            return;
        }

        const recommended = menus.slice(0, 2);

        recommended.forEach(menu => {
            const image = getImageUrl(menu);

            menuContainer.innerHTML += `
                <div class="today-menu-card">
                    <div class="today-menu-left">
                        <img
                            src="${image}"
                            alt="${menu.name}"
                            class="today-menu-image"
                            onerror="this.src='assets/images/no-image.png'">
                        <div>
                            <h3 class="today-menu-title">${menu.name}</h3>
                            <p class="today-menu-desc">${menu.description ?? "-"}</p>
                        </div>
                    </div>
                    <div class="today-menu-right">
                        <span class="today-menu-price">Rp ${Number(menu.price).toLocaleString("id-ID")}</span>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error(error);
        menuContainer.innerHTML = `<p style="color:red;">Terjadi kesalahan mengambil data menu.</p>`;
    }
}

function formatTime(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

function formatDateFull(dateStr) {
    const d = new Date(dateStr);
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabit"];
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
                     "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function getDayNum(dateStr) {
    return new Date(dateStr).getDate();
}

function getDayLabel(dateStr) {
    const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    return days[new Date(dateStr).getDay()];
}

function getDateKey(dateStr) {
    const d = new Date(dateStr);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getStatusLabel(status) {
    const map = {
        PENDING: "Menunggu",
        CONFIRMED: "Dikonfirmasi",
        CANCELLED: "Dibatalkan",
        COMPLETED: "Selesai"
    };
    return map[status] || status;
}

async function loadUpcomingReservations() {
    scheduleContainer.innerHTML = `<p style="text-align:center;padding:20px;">Memuat jadwal...</p>`;

    try {
        const result = await getData("/reservations/upcoming");

        if (!result || !result.success) {
            scheduleContainer.innerHTML = `<p style="color:red;">Gagal mengambil data jadwal.</p>`;
            return;
        }

        const reservations = result.data;

        if (!reservations || reservations.length === 0) {
            scheduleContainer.innerHTML = `
                <div class="schedule-empty">
                    <div class="schedule-empty-icon">📅</div>
                    <h3>Belum Ada Reservasi</h3>
                    <p>Belum ada reservasi yang dijadwalkan untuk 7 hari ke depan.</p>
                </div>
            `;
            return;
        }

        const grouped = {};
        reservations.forEach(r => {
            const key = getDateKey(r.reservationDate);
            if (!grouped[key]) {
                grouped[key] = {
                    date: r.reservationDate,
                    items: []
                };
            }
            grouped[key].items.push(r);
        });

        let html = "";
        const today = getDateKey(new Date());

        Object.keys(grouped).sort().forEach(dateKey => {
            const group = grouped[dateKey];
            const isToday = dateKey === today;
            const label = isToday ? "Hari Ini" : formatDateFull(group.date);
            const count = group.items.length;

            html += `
                <div class="schedule-day-group">
                    <div class="schedule-day-header">
                        <div class="schedule-day-icon">
                            <span class="day-num">${getDayNum(group.date)}</span>
                            <span class="day-label">${getDayLabel(group.date)}</span>
                        </div>
                        <div class="schedule-day-info">
                            <h3>${label}</h3>
                            <p>${count} reservasi</p>
                        </div>
                        <span class="schedule-day-count">${count} booking</span>
                    </div>
                    <div class="schedule-cards">
            `;

            group.items.forEach(r => {
                const statusClass = r.status.toLowerCase();
                html += `
                    <div class="schedule-card">
                        <div class="schedule-card-top">
                            <span class="schedule-card-time">${formatTime(r.reservationDate)}</span>
                            <span class="schedule-card-status ${statusClass}">${getStatusLabel(r.status)}</span>
                        </div>
                        <div class="schedule-card-details">
                            <div class="schedule-card-detail">
                                <span>🪑</span>
                                <span>Meja ${r.table ? r.table.tableNumber : "-"}</span>
                            </div>
                            <div class="schedule-card-detail">
                                <span>👥</span>
                                <span>${r.numberOfGuests} Orang</span>
                            </div>
                            <div class="schedule-card-detail">
                                <span>📐</span>
                                <span>Kapasitas ${r.table ? r.table.capacity : "-"} Orang</span>
                            </div>
                        </div>
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        });

        scheduleContainer.innerHTML = html;
    } catch (error) {
        console.error(error);
        scheduleContainer.innerHTML = `<p style="color:red;">Terjadi kesalahan mengambil data jadwal.</p>`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadRecommendedMenus();
    loadUpcomingReservations();
});
