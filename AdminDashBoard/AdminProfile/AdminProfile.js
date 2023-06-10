console.log("seen");
const sirstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const dob = document.querySelector("#dob");
const email = document.querySelector("#email");
const adminid = document.querySelector("#admin-Id");
const phoneNumber = document.querySelector("#phoneNumber");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const state = document.querySelector("#state");
const gender = document.querySelector("#gender")
const getpro = localStorage.getItem("email")
console.log("seen");
function getProfile (){
     const fet = fetch(`https://localhost:5001/api/Admin/GetAdminByEmail?email=${getpro}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        sirstName.value = data.admin.firstName
        dob.value = data.admin.dob
        lastName.value = data.admin.lastName
        email.value = data.admin.email
        phoneNumber.value = data.admin.phoneNumber
        adminid.value = data.admin.adminId
        address.value = data.admin.address
        city.value = data.admin.city
        gender.value = data.admin.gender
        state.value = data.admin.state  
    })
}

function update(){
    const updatestatus = document.querySelector("#savechanges")
    updatestatus.addEventListener("click", (e)=>{
        const fetchdata = fetch("https://localhost:5001/api/Admin/UpdateAdmin", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                
                firstName: sirstName.value,
                lastName: lastName.value,
                dob: dob.value,
                email: email.value,
                adminId: adminid.value,
                phoneNumber: phoneNumber.value,
                address: address.value,
                city: city.value,
                state: state.value,
            })
        }).then(res => res.json())
        .then(data => {
            if (data.status == true) {
                window.location.reload(true)
                window.alert(data.message) 
            }
            window.alert(data.message)
        })
        window.localStorage.setItem("email", email.value)
    })
}

getProfile()
update()

// displayBankName();