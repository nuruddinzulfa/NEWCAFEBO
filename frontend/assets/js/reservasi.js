// ===============================
// CEK LOGIN
// ===============================

const token = localStorage.getItem("token");

if (!token) {

    alert("Silakan login terlebih dahulu.");

    window.location.href = "login.html";

}

const form = document.getElementById("reservationForm");
const tableSelect = document.getElementById("tableId");

// ==============================
// LOAD TABLE
// ==============================

async function loadTables() {

    try {

        const result = await getData("/tables");

        if (!result.success) {

            alert(result.message);

            return;

        }

        tableSelect.innerHTML = "";

        result.data.forEach(table => {

            tableSelect.innerHTML += `

                <option value="${table.id}" data-capacity="${table.capacity}">

                    Meja ${table.tableNumber}
                    (${table.capacity} Orang)

                </option>

            `;

        });

    } catch (error) {

        console.log(error);

    }

}

loadTables();

document.getElementById("reservationDate").min = new Date().toISOString().split("T")[0];


// ==============================
// SUBMIT
// ==============================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const timeValue = document.getElementById("reservationTime").value;

    if (timeValue < "07:00" || timeValue > "22:00") {
        alert("Jam reservasi hanya 07.00 - 22.00.");
        return;
    }

    const reservationDate = new Date(

        `${document.getElementById("reservationDate").value}T${timeValue}`

    );

    const numberOfGuests = Number(document.getElementById("numberOfGuests").value);
    const selectedOption = tableSelect.options[tableSelect.selectedIndex];
    const tableCapacity = selectedOption ? parseInt(selectedOption.getAttribute("data-capacity") || "0") : 0;

    if (numberOfGuests > tableCapacity) {
        alert(`Jumlah orang (${numberOfGuests}) melebihi kapasitas meja (${tableCapacity} Orang). Silakan pilih meja yang sesuai.`);
        return;
    }

    const data = {

        reservationDate,

        numberOfGuests,

        tableId:
        tableSelect.value

    };

    const result = await postData("/reservations", data);

    if (result.success) {

        localStorage.setItem("reservedTableId", tableSelect.value);

        alert("Reservasi berhasil! Mengalihkan ke menu...");

        window.location.href = "menu.html?from=reservation";

    } else {

        alert(result.message);

    }

});
