// ==============================
// API CONFIG
// ==============================

const BASE_URL = "http://localhost:5000/api/v1";

// ==============================
// TOKEN
// ==============================

function getToken() {

    return localStorage.getItem("token");

}

// ==============================
// GET
// ==============================

async function getData(endpoint) {

    try {

        const response = await fetch(

            BASE_URL + endpoint,

            {

                headers: {

                    Authorization: `Bearer ${getToken()}`

                }

            }

        );

        return await response.json();

    } catch (error) {

        console.error(error);

        return {

            success:false,

            message:"Gagal mengambil data"

        };

    }

}

// ==============================
// POST
// ==============================

async function postData(endpoint,data){

    try{

        const response=await fetch(

            BASE_URL+endpoint,

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json",

                    Authorization:`Bearer ${getToken()}`

                },

                body:JSON.stringify(data)

            }

        );

        return await response.json();

    }catch(error){

        console.log(error);

        return{

            success:false,

            message:"Terjadi kesalahan"

        };

    }

}

// ==============================
// PATCH
// ==============================

async function patchData(endpoint,data){

    try{

        const response=await fetch(

            BASE_URL+endpoint,

            {

                method:"PATCH",

                headers:{

                    "Content-Type":"application/json",

                    Authorization:`Bearer ${getToken()}`

                },

                body:JSON.stringify(data)

            }

        );

        return await response.json();

    }catch(error){

        console.log(error);

    }

}

// ==============================
// DELETE
// ==============================

async function deleteData(endpoint){

    try{

        const response=await fetch(

            BASE_URL+endpoint,

            {

                method:"DELETE",

                headers:{

                    Authorization:`Bearer ${getToken()}`

                }

            }

        );

        return await response.json();

    }catch(error){

        console.log(error);

    }

}