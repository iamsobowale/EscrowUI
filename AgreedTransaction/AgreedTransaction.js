console.log("flhfjd")
const fetchs = async () => {
    const getTransaction = await fetch('https://localhost:5001/api/Transaction/GetAgreedTransactions',{
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
    });
   let fetched = getTransaction.json()
    console.log(fetched)
   return fetched
}

const showTableAsync = async () => {
    let tableBodyValue = document.querySelector('#table-Body');
    let tableBody = await fetchs();
    console.log(tableBody);
    tableBody.transactionList.forEach(element => {
        tableBodyValue.innerHTML += `
        <tr>
            <td>${element.reference_id}</td>
            <td>${element.buyerId}</td>
            <td>${element.sellerId}</td>
            <td>${element.itemTitle}</td>
            <td>${element.deliveryAddress}</td>
            <td>${element.totalPrice}</td>
            <td>${element.transaction_status}</td>
            <td>${element.createdDate}</td>
            <td><button type='button' class="btn" id = ${element.reference_id} style="background-color:green">Pay-</button></td>
            <td><button type='button' class="btn2" id = ${element.reference_id} style="background-color:green">Verify</button></td>
        </tr>
      `
        makePayment()
        verifyPayment()
    });
}
function makePayment(){
    const getbtn = document.querySelectorAll('.btn');
    getbtn.forEach(e => {
        e.addEventListener('click', (e) => {
            console.log(e.target.id);
            process(e.target.id);
        })
    })
}
function process(para){
    console.log("dfff")
    fetch(`https://localhost:5001/api/Payment/MakePayment/`,
    {
        method: "POST",
        headers: { 
            "content-type": "application/json" 
        },
        body : JSON.stringify(para)
    })
    .then(res => res.json())
    .then(data => {
        console.log("DATA", data)
        if(data.status==false){
            window.alert(data.message)
        }
        window.location.href = data.message;
        window.reload(true)
        
    })
    .catch(err => {
        console.log(err);
    })

}
function verifyPayment (){
    const getverify = document.querySelectorAll(".btn2")
    console.log("hekjhhff")
    getverify.forEach(e => {
        e.addEventListener("click", (e)=>{
            console.log(e.target.id);
            verify(e.target.id)
        })
    })
}
function verify(para){
    fetch("https://localhost:5001/api/Payment/VerifyPayment/" + para
    ).then(res => res.json()
    ).then(data => {
        if (data.isSuccess==false) {
            window.alert(data.message)
        }
        window.alert(data.message);
            window.location.reload(true)
    })
    
}
 showTableAsync()
