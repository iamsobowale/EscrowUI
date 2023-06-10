const fetchTableAsync = async () => {
    const fet = await fetch('https://localhost:5001/api/Transaction/GetInitiatedTransactionByTraderEmail',{
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
    });
    let fetJson = fet.json();
    console.log(fetJson);
    return fetJson;
}

const showTableAsync = async () => {
    console.log("mbjghcvybhjnklmjk,l.mnbhgffghjkm,jhgfhjkl")
    let tableBodyValue = document.querySelector('#table-Body');
    let tableBody = await fetchTableAsync();
    console.log(tableBody);
    tableBody.transactionList.forEach(element => {
        if(element.numberOfSub==0){
        tableBodyValue.innerHTML += `
        <tr>
            <td>${element.reference_id}</td>
            <td>${element.buyerId}</td>
            <td>${element.sellerId}</td>
            <td>${element.itemTitle}</td>
            <td>${element.description}</td>
            <td>${element.deliveryAddress}</td>
            <td>${element.totalPrice}</td>
            <td>${element.transaction_status}</td>
            <td>${element.createdDate}</td>
            <td><button type='button' class="btn" id = ${element.reference_id} style="background-color:green">Agree</button></td>
            <td><button type='button' class="btn2" id = ${element.reference_id} style="background-color:green">Reject</button></td>
        </tr>
      `
      addbtn()
      reject()
}});
}
var addd = document.querySelectorAll('.btn');
function addbtn (){
    var add = document.querySelectorAll('.btn');
    add.forEach(b => {
        b.addEventListener('click', (e) => {
            console.log(e.target.id)
            clickbtn(e.target.id)
        })
    })
}
function clickbtn (reference){
    fetch('https://localhost:5001/api/Transaction/ConfirmTransaction',{
        method: "POST",
        headers: { 
            "Authorization": 'Bearer ' + localStorage.getItem('token'),
            "content-type": "application/json" 
        },
        body : JSON.stringify(reference)
    })
    .then(res => res.json())
    .then(data => {
        console.log("reject", data);
        if(data.isSuccess==true){
            window.alert(data.message)
            window.location.reload(true)
        }
    })
    .catch(err => {
        console.log(err);
        console.log("3");
    })
}

const reject = () => {
    buttons = document.querySelectorAll('.btn2');
    buttons.forEach(btn=> {
        btn.addEventListener('click', (e)=>{ 
            console.log(e.target.id);
            fetch(`https://localhost:5001/api/Transaction/CancelTransaction?reference=${e.target.id}`,{
        method: "POST",
        headers: { 
            "Authorization": 'Bearer ' + localStorage.getItem('token'),
            "content-type": "application/json" 
        },
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.isSuccess==true){
            window.alert(data.message)
            window.location.reload(true)
        }
    })
    .catch(err => {
        console.log(err);
        console.log("3");
    })
        })
    })
}
showTableAsync();
