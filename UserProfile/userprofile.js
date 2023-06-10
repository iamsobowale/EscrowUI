console.log("seen");
const sirstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const dob = document.querySelector("#dob");
const email = document.querySelector("#email");
const account = document.querySelector("#account-Number");
const accountname = document.querySelector("#account-Name");
const phoneNumber = document.querySelector("#phoneNumber");
const address = document.querySelector("#Address");
const city = document.querySelector("#city");
const state = document.querySelector("#state");
const banke = document.querySelector("#bank")
const getpro = localStorage.getItem("email")
console.log("seen");
function getProfile (){
     const fet = fetch(`https://localhost:5001/api/TraderContoller/GetTraderByEmail/${getpro}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        sirstName.value = data.traders.firstName
        lastName.value = data.traders.lastName
        email.value = data.traders.email
        address.value = data.traders.address
        accountname.value = data.traders.accountName
        banke.value = data.traders.bankName
        account.value = data.traders.accountNumber
        city.value = data.traders.city
        state.value = data.traders.state  
    })
}
//split accountname into first and last name

//compare account name with user fullname
function compare(){
    const accountname = document.querySelector("#account-Name");
    const name = accountname.value
    const spli = name.split(" ")
    console.log(name)
    console.log(sirstName.value.toUpperCase())
    console.log(lastName.value.toUpperCase())
    console.log(spli[0].toUpperCase())
    console.log(spli[2].toUpperCase())
    

    if(sirstName.value.toUpperCase() != spli[0].toUpperCase() && lastName.value.toUpperCase() != spli[2].toUpperCase()){
        window.alert("Account name does not match with your full name")
    }
    else{
        update()
        
    }

}

function update(){
    // const updatestatus = document.querySelector("#savechanges")
    // updatestatus.addEventListener("click", ()=>{
        const fetchdata = fetch("https://localhost:5001/api/TraderContoller/UpdateTrader", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                firstName: sirstName.value,
                lastName: lastName.value,
                email: email.value,
                accountNumber: account.value,
                accountName: accountname.value,
                bankName: banke.value,
                city: city.value,
                state: state.value,
                address: address.value,
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
}
//fetch all banks in nigeria
function getBanks(){
    console.log("ffdd")
    const fet = fetch("https://api.paystack.co/bank?currency=NGN")
    .then(res => res.json())
    .then(data => {
        console.log(data)
       //foreach all banks in the console
         data.data.forEach(bank => {
                const option = document.createElement("option")
                option.value = bank.code
                option.innerHTML = bank.name
                banke.appendChild(option)
         })
    }
    )
    
}
//get details of the user from bank
function getDetails(){
    const fet = fetch(`https://api.paystack.co/bank/resolve?account_number=${account.value}&bank_code=${banke.value}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer sk_test_6483775b59a2152f947af8583a987e98eb5c7af2"
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data.data.account_name)
        accountname.value = data.data.account_name
        account.innerHTML = data.data.account_name
    })
}
getProfile()

// displayBankName();