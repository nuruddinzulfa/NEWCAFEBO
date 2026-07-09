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

                <option value="${table.id}">

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


// ==============================
// SUBMIT
// ==============================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const reservationDate = new Date(

        `${document.getElementById("reservationDate").value}T${document.getElementById("reservationTime").value}`

    );

    const data = {

        customerName:
        document.getElementById("customerName").value,

        customerPhone:
        document.getElementById("customerPhone").value,

        customerEmail:
        document.getElementById("customerEmail").value,

        reservationDate,

        numberOfGuests:
        Number(document.getElementById("numberOfGuests").value),

        tableId:
        tableSelect.value

    };

    const result = await postData("/reservations", data);

    if (result.success) {

        alert("Reservasi berhasil.");

        form.reset();

    } else {

        alert(result.message);

    }

});
