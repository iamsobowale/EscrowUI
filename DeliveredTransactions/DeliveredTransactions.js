console.log("seen");
function getProfile (){
    const fet = fetch("https://localhost:5001/api/Transaction/DeliveredTransactions", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }).then(res => res.json())
    .then(data => {
        console.log(data)
        const table = document.querySelector("#table-Body")
        data.transactionList.forEach(element => {
            if (element.numberOfSub==0) {
                table.innerHTML += `
            <tr>
                <td>${element.reference_id}</td>
                <td>${element.buyerId}</td>
                <td>${element.sellerId}</td>
                <td>${element.itemTitle}</td>
                <td>${element.deliveryAddress}</td>
                <td>${element.totalPrice}</td>
                <td>${element.transaction_status}</td>
                <td>${element.createdDate}</td>
                <td><button type='button' class="btn" id = ${element.reference_id} style="background-color:green">Accept</button></td>
                <td><button type='button' class="btn2" id = ${element.reference_id} style="background-color:green">Reject</button></td>
            </tr>
          `
          Accept();
          Reject()
            }
            
        })
    })
}
//https://localhost:5001/api/Transaction/Acceptransaction/${e.target.id}
function Accept () {
    const get = document.querySelectorAll('.btn');
 get.forEach(d =>  {
    d.addEventListener('click', (e) =>{
        console.log(e.target.id)
        fetch(`https://localhost:5001/api/Transaction/AcceptTransaction?transactionNumber=${e.target.id}`, 
        {
            method: "POST",
            headers: { 
                "content-type": "application/json" 
            },
        })
        .then(res => res.json())
    
        .then(data => {
            console.log("2")
            if(data.isSuccess==true){
                // console.log("accept", data);
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
function Reject () {
    const get = document.querySelectorAll('.btn2');
 get.forEach(d =>  {
    d.addEventListener('click', (e) =>{
        console.log(e.target.id)
        fetch(`https://localhost:5001/api/Transaction/RejectTransaction?reference=${e.target.id}`, 
        {
            method: "POST",
            headers: { 
                "content-type": "application/json" ,
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log("2")
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

getProfile();