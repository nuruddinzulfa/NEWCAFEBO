const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "login.html";

}

const params = new URLSearchParams(window.location.search);

const orderId = params.get("id");

const form = document.getElementById("paymentForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const paymentMethod =
        document.getElementById("paymentMethod").value;

    const paidAmount =
        Number(document.getElementById("paidAmount").value);

    const result = await postData("/payments", {

        orderId,

        paymentMethod,

        paidAmount

    });

    if(result.success){

        alert("Pembayaran berhasil.");

        localStorage.removeItem("cart");

        window.location.href="success.html";

    }else{

        alert(result.message);

    }

});
