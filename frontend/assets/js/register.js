const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {

        fullName:
        document.getElementById("fullName").value,

        email:
        document.getElementById("email").value,

        phoneNumber:
        document.getElementById("phoneNumber").value,

        password:
        document.getElementById("password").value

    };

    const result = await postData(

        "/auth/register",

        data

    );

    if(result.success){

        alert("Registrasi berhasil.");

        window.location.href="login.html";

    }else{

        alert(result.message);

    }

});