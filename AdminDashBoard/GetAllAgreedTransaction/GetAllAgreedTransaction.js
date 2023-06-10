console.log("seen");
function getProfile (){
    const fet = fetch("https://localhost:5001/api/Transaction/GetAllAgreedTransactions", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => res.json(console.log(res)))
    .then(data => {
        console.log(data)
        const table = document.querySelector("#table-Body")
        data.transactionList.forEach(element => {
            table.innerHTML += `
            <tr>
                <td>${element.reference_id}</td>
                <td>${element.buyerId}</td>
                <td>${element.sellerId}</td>
                <td>${element.itemTitle}</td>
                <td>${element.deliveryAddress}</td>
                <td>${element.itemQuantity}</td>
                <td>${element.totalPrice}</td>
                <td>${element.transaction_status}</td>
                <td>${element.createdDate}</td>
                            </tr>
          `
        })
    })
}
getProfile();