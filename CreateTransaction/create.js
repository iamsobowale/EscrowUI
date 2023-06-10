let sellerEmailValue = document.querySelector('#seller');
let itemQuantity = document.querySelector('#item-Quantity');
let itemName = document.querySelector('#item-Name');
let deliveryaddress = document.querySelector('#delivery-address');
let transactiontype = document.querySelector('#typeOfTransaction');
let itemTitle = document.querySelector('#item-Title');
let myFormValue = document.querySelector('#my-form');
let getpro = localStorage.getItem('email');
let mydiv = document.querySelector('#transa');
console.log(myFormValue);
myFormValue.addEventListener('submit', (e) => {
    e.preventDefault();
});


function select(){
    let transactiontype = document.querySelector('#typeOfTransaction');
    let transactiontypeValue = transactiontype.value;
    const price = document.querySelector('#price');
    if (transactiontypeValue === "single" && price === null) {
        mydiv.innerHTML += `
    <div class="row mb-3">
    <label class="col-sm-2 col-form-label" for="basic-default-company">Price</label>
    <div class="col-sm-10">
        <input
        type="number"
        class="form-control"
        id="price"
        />
    </div>
    </div>
    <div class="row mb-3">
    <label class="col-sm-2 col-form-label" for="basic-default-company">Delivery-Date</label>
    <div class="col-sm-10">
        <input
        placeholder="number of days"
        type="number"
        class="form-control"
        id="delivery"
        />
    </div>
    </div>
    <div class="row mb-3">
    <label class="col-sm-2 col-form-label" for="basic-default-company">Description</label>
    <div class="col-sm-10">
        <input
        type="text"
        class="form-control"
        id="description"
        />
    </div>
    </div>
  `

    }
    
        
}


function getProfile (){
    const fet = fetch(`https://localhost:5001/api/TraderContoller/GetTraderByEmail/${getpro}`)
   .then(res => res.json())
   .then(data => {
       console.log(data)     
   if(data.traders.accountNumber == null){
    window.alert("Please Complete your profile")
    window.location.href = "/UserProfile/page-profile.html";
    }
    else{
        create();
    }

   })
   .catch(err => {
         console.log(err)
   })


}

//check if accountNumber is null


const create = () => {
    const transactionType = document.querySelector('#typeOfTransaction');
    const price = document.querySelector('#price');
    const deliverys = document.querySelector('#delivery');
    const descriptions = document.querySelector('#description');
    const Data = {
        sellerid: sellerEmailValue.value,
        itemTitle: itemTitle.value,
        deliveryAddress: deliveryaddress.value,
    };

    if(price !== null){
        Data.deliveryDate = deliverys.value;
        Data.price = price.value;
        Data.description = descriptions.value
    }
   
    console.log("1")
    fetch('https://localhost:5001/api/Transaction/CreateTransaction',
    {

        method: "POST",
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(Data)})
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);
            if (data.isSuccess==true) {  
                window.localStorage.setItem("transactionId", data.transaction.reference_id);
                if (data.transaction.totalPrice == 0) {
                    console.log("dfgvhbjnm,")
                    window.location.href = "/CreateSubTransaction/CreateSubTransaction.html";
                }
                else {
                    window.location.href = "/UserDashBoard/index.html";
                }
                
                
            }

            window.alert(data.message)
        })
        .catch(err => {
            console.log(err);
        })
}