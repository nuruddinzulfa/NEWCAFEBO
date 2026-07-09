const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const result = await postData(

        "/auth/login",

        {

            email,

            password

        }

    );

    console.log(result);

    if(result.success){

        localStorage.setItem(

            "token",

            result.data.accessToken

        );

        localStorage.setItem(

            "user",

            JSON.stringify(result.data.user)

        );

        alert(result.message);

        window.location.href="reservasi.html";

    }else{

        alert(result.message);

    }

});

function logout(){

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href="login.html";

}