console.log("seen");
function getProfile (){
    const fet = fetch("https://localhost:5001/api/Transaction/GetProcessingTransactions", {
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
            </tr>
          `
            }
            getId()
        })
    })
}
function getId () {
    const get = document.querySelectorAll('.btn');
 get.forEach(d =>  {
    d.addEventListener('click', (e) =>{
        console.log(e.target.id)
    })
})
}

getProfile();