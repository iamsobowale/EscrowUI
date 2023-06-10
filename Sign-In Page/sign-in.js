const email = document.querySelector('#email');
const password = document.querySelector('#password');
console.log(email);
console.log(email.value);
const myformvalue = document.querySelector('#myform');
myformvalue.addEventListener('submit', (e) => {
    e.preventDefault();
});
let create = () => {    
    Data = {
        email: email.value,
        password: password.value,
    };
    fetch('https://localhost:5001/api/Auth/login',
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
        console.log(data.email)
        if(data.status==true){
            window.localStorage.setItem("token", data.token);
            window.localStorage.setItem("email", data.email);
            window.localStorage.setItem("role", data.data.role);
            if(data.data.role=="Trader"){
                window.location.href = "/UserDashBoard/index.html";
            }
            else if(data.data.role=="Admin")
            {
                window.location.href = "/AdminDashBoard/DashBoard/index.html";
            }
        }
        else{
            //if email and password is wrong
            window.alert(data.message)
        }
    })
    .catch(err => {
        console.log(err);
        console.log("3");
    })
    
}