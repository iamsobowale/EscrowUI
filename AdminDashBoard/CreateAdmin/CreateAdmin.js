// post request to create a new trader
const createfirstName = document.querySelector('#firstName');
const createlastName = document.querySelector('#lastName');
const createemail = document.querySelector('#email');
const createdob = document.querySelector('#dob');
const createpassword = document.querySelector('#password');
const createphoneNumber = document.querySelector('#phoneNumber');
const createaddress = document.querySelector('#address');
const createcity = document.querySelector('#ci');
const createstate = document.querySelector('#s');
const creategender = document.querySelector('#genderbutton');
const createcountry = document.querySelector('#c');
const myformvalue = document.querySelector('#myform');
myformvalue.addEventListener('submit', (e) => {
    e.preventDefault();
});
let getBankName = document.querySelector("#bank-name");
let create = () => {
    Data = {
        firstName: createfirstName.value,
        lastName: createlastName.value,
        email: createemail.value,
        dob: createdob.value,
        password: createpassword.value,
        phoneNumber: createphoneNumber.value,
        address: createaddress.value,
        city: createcity.value,
        state: createstate.value,
        country: createcountry.value,
        gender: creategender.value,
    };
    console.log("1")
    fetch('https://localhost:5001/api/Admin/CreateAdmin',
    {
        method: "POST",
        headers: { 
            "content-type": "application/json" 
        },
        body: JSON.stringify(Data)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.isSuccess==true){
            window.alert(data.message)
            window.location.href = "/AdminDashBoard/index.html";
           
        }
    })
    .catch(err => {
        console.log(err);
        console.log("3");
    })
    
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
