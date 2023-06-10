// post request to create a new trader
const createfirstName = document.querySelector('#firstName');
const createlastName = document.querySelector('#lastName');
const createemail = document.querySelector('#email');
const createpassword = document.querySelector('#password');
const createaddress = document.querySelector('#address');
const createcity = document.querySelector('#ci');
const createstate = document.querySelector('#s');
const creategender = document.querySelector('#genderbutton');
const createcountry = document.querySelector('#c');
const myformvalue = document.querySelector('#myform');
myformvalue.addEventListener('submit', (e) => {
    e.preventDefault();
});
//validate email
function validateEmail(){
    if (createemail.value.indexOf('@') == -1) {
        window.alert("Invalid Email");
        createemail.value = "";
    }
    else{
        let create = () => {
            Data = {
                firstName: createfirstName.value,
                lastName: createlastName.value,
                email: createemail.value,
                password: createpassword.value,
                address: createaddress.value,
                city: createcity.value,
                state: createstate.value,
                country: "Nigeria",
                gender: creategender.value,
            };
            console.log("1")
            fetch('https://localhost:5001/api/TraderContoller/AddTrader',
            {
                method: "POST",
                headers: { 
                    "content-type": "application/json" 
                },
                body: JSON.stringify(Data)
            })
            .then(res => res.json())
            .then(data => {
                console.log("2")
                console.log(data);
                if (data.isSuccess) {
                    window.location.href = "/Sign-In Page/signin.html";
                }
                else{
                    window.alert(data.message)
                }
            })
            .catch(err => {
                console.log(err);
                console.log("3");
            })
            
        } 
        create();
    }
        
}





let fetchAddress = async () =>{
    let a = await fetch('https://countriesnow.space/api/v0.1/countries/states');
    let b = a.json();
    return b;
}
let getCountry = document.querySelector("#c")
let getState = document.querySelector("#s")
let getCities = document.querySelector("#ci")


let displayState = async () => {
    let c = await fetchAddress();
    let d = c.data;
    d.forEach(x =>{
        if (x.name == "Nigeria") {
            x.states.forEach(r => {
                getState.innerHTML += `<option value="${r.name}">${r.name}</option>`
            })
        }
        
    })
}

displayState();
let fetchcities = async () =>{
    let a = await fetch("http://locationsng-api.herokuapp.com/api/v1/lgas");
    let b = a.json();
    return b;
}

let displayCities = async () => {
    let c = await fetchcities();
    console.log(c);
        console.log(getState.value);
    c.forEach(x =>{
        if (`${x.state} State` == getState.value) {
            x.lgas.forEach(r => {
                getCities.innerHTML += `<option value="${r}">${r}</option>`
            })
        }
        
    })
}
