console.log("seen");
function getProfile (){
    const fet = fetch("https://localhost:5001/api/TransactionType/GetAcceptedSubTransaction", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => res.json(console.log(res)))
    .then(data => {
        console.log(data)
        const table = document.querySelector("#table-Body")
        data.transaction.forEach(element => {
            table.innerHTML += `
            <tr>
                <td id = "ids">${element.reference}</td>
                <td>${element.price}</td>
                <td>${element.status}</td>
                <td>${element.createdDate}</td>
                <td>${element.sellerId}</td>
                <td><button type='button' onclick="confir()" class="btn" id = ${element.reference} style="background-color:green">Release</button></td>
            </tr>
         `
        })
    })
}

//comfirm "Are you sure you want to release this transaction?
function confir(){
   const con = window.confirm("Are you sure you want to release this transaction?")
    if(con == true){
        Release()
    }
    else{
        window.alert("Transaction not released")
    }
}

function Release() {
    const get = document.querySelectorAll('.btn');
 get.forEach(d =>  {
    d.addEventListener('blur', (e) =>{
        console.log(e.target.id)
        fetch(`https://localhost:5001/api/Payment/VerifyAccountNumber?subTransactionReference=${e.target.id}`, 
        {
            method: "POST",
            headers: { 
                "content-type": "application/json" 
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.status==true){
                window.alert(data.message)
                window.location.reload(true)
            }
            window.alert(data.message)
        })
        .catch(err => {
            console.log(err);
            console.log("3");
        })
    })
})
}
getProfile();