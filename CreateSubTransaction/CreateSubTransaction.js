let itemName = document.querySelector('#Name');
let itemPrice = document.querySelector('#Price');
let DeliveryDate = document.querySelector('#DeliveryDate');
let itemDescription = document.querySelector('#Item-Description');
var gettransaction = window.localStorage.getItem("transactionId");
// console.log(gettransaction);

let myFormValue = document.querySelector('#my-form');
myFormValue.addEventListener('submit', (e) => {
    e.preventDefault();
});
const adds = () => 
{
    const getform = document.querySelector(".createform");
getform.innerHTML += `
<div class="row mb-3">
<label class="col-sm-2 col-form-label" for="basic-default-company">Price</label>
<div class="col-sm-10">
  <input
    type="number"
    class="form-control"
    id="Price"
  />
</div>
</div>
<div class="row mb-3">
  <label class="col-sm-2 col-form-label" for="basic-default-company">Delivery-Date</label>
  <div class="col-sm-10">
    <input
      type="number"
      class="form-control"
      id="DeliveryDate"
    />
  </div>
</div>
<div class="row mb-3">
<label class="col-sm-2 col-form-label" for="basic-default-phone">Item-Description</label>
<div class="col-sm-10">
  <input
    type="text"
    id="Item-Description"
    class="form-control phone-mask"
    aria-describedby="basic-default-phone"
  />
</div>
</div>
<div class="row justify-content-end">
<div class="col-sm-10">
  <button type="submit" onclick="create()" class="btn btn-primary">Send</button>
</div>
</div>
</div>
</div>`
hideClass()
}
const hideClass = () => {
  document.getElementsByClassName("hidesub")[0].style.visibility = "hidden";
}


const create = () => {
let itemPrice = document.querySelector('#Price');
let DeliveryDate = document.querySelector('#DeliveryDate');
let itemDescription = document.querySelector('#Item-Description');
var gettransaction = window.localStorage.getItem("transactionId");

    console.log("2")
        fetch(`https://localhost:5001/api/TransactionType/Create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "price": itemPrice.value,
                "deliveryDate": DeliveryDate.value,
                "description": itemDescription.value,
                "transactionReferenceNumber": gettransaction
            })
        }).then(res => res.json(console.log("dfdfd")))
        .then(data => {
            console.log(data)
            if (data.isSuccess==true) {
                const addmore = window.confirm("Do you want to add more items?")
                if (addmore) {
                   window.location.reload(true)
                }
                else {
                    window.location.href = "/UserDashBoard/index.html";
                }
               
            }
            else {
                window.alert(data.message)
            }})
            
        .catch(err => {
            console.log(err)
        }
        )
   
}


  const fetchTableAsync = async () => {
    const fet = await fetch("https://localhost:5001/api/TransactionType/GetAllTransactionTypeByTransactionReferenceNumber/" + gettransaction);
    let fetJson = fet.json();
    console.log(fetJson);
    return fetJson;
}

console.log("seen")
const showTableAsync = async () => {
    console.log("mbjghcvybhjnklmjk,l.mnbhgffghjkm,jhgfhjkl")
    let tableBodyValue = document.querySelector('#table-body');
    let tableBody = await fetchTableAsync();
    console.log(tableBody);
    tableBody.transaction.forEach(element => {
        tableBodyValue.innerHTML += `
        <tr>
            <td id = "ids">${element.name}</td>
            <td>${element.price}</td>
            <td>${element.deliveryDate}</td>
            <td>${element.description}</td>
        </tr>
     `
    //  test();
    //  test2();
    });
}
fetchTableAsync()
showTableAsync()
