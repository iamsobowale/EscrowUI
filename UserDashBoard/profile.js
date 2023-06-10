let email = localStorage.getItem('email');
let role = localStorage.getItem('role');
//put name from local stroage to the page
const getName = () => {
    
    document.querySelector('#gt').innerHTML = `<h5 class="fw-semibold d-block" id="profilename">${email}</h5>
    <small class="text-muted">${role}</small>`
}
getName();



//get the user details from the database
const getUserDetails = () => {
    const url = `https://localhost:5001/api/TraderContoller/GetTraderByEmail/${email}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.traders.accountNumber == null) {
                document.querySelector('#name').innerHTML = `<h5 class="fw-semibold d-block"><a href="/UserProfile/page-profile.html">Please click this link to complete your profile to enjoy all benefit of our Platform</a></h5>
                <h4 class="card-title text-primary" <a class="dropdown-item" href="/">Welcome To Our Platform ${email}</h4>`
            }
            else {
                document.querySelector('#name').innerHTML = `<h4 class="card-title text-primary">Welcome To Our Platform ${email}</h4>`
            }

        })
}
getUserDetails();