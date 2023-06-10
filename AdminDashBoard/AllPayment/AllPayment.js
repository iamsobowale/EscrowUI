console.log("seen");
function getProfile (){
    const fet = fetch("https://localhost:5001/api/Payment/GetAllPayment", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => res.json(console.log(res)))
    .then(data => {
        console.log(data)
        const table = document.querySelector("#table-Body")
        data.payments.forEach(element => {
            table.innerHTML += `
            <tr>
                <td>${element.referenceNumber}</td>
                <td>${element.paymentMethodName}</td>
                <td>${element.amount}</td>
                <td>${element.paymentStatus}</td>
                <td>${element.paymentDate}</td>
                <td>${element.transactionReferenceNumber}</td>
               
            </tr>
          `
        })
    })
}
getProfile();