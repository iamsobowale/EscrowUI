function getProfile (){
    const fet = fetch("https://localhost:5001/api/Transaction/GetAllAcceptedTransactions", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }).then(res => res.json(console.log(res)))
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
                <td><button type='button' class="btn" id = ${element.reference_id} style="background-color:green">Release</button></td>
            </tr>
          `
          getId()
            }
         
        })
    })
}

function getId () {
    const get = document.querySelectorAll('.btn');
 get.forEach(d =>  {
    d.addEventListener('click', (e) =>{
        console.log(e.target.id)
        process(e.target.id)
    })
})
} 
const process = (para)=> {
    fetch(`https://localhost:5001/api/Payment/ReleaseForTransaction?transactionReference=${para}`,
    {
        method: "POST",
        headers: { 
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            "content-type": "application/json" 
        },
        body : JSON.stringify(para)
    })
    .then(res => res.json())
    .then(data => {
        console.log("2")
        if(data.status==true){
            window.alert(data.message)
            window.location.reload(true)
        }
        window.alert(data.message)
    })
    .catch(err => {
        console.log(err);
    })

}

getProfile()