console.log("seen");
function getProfile (){
    const fet = fetch("https://localhost:5001/api/Dispute/GetAllDispute", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => res.json(console.log(res)))
    .then(data => {
        console.log(data)
        const table = document.querySelector("#table-Body")
        data.disputes.forEach(element => {
           
                table.innerHTML += `
            <tr>
                <td>${element.transactionReference}</td>
                <td>${element.adminId}</td>
                <td>${element.createdBy}</td>
                <td>${element.reason}</td>
                <td>${element.isResolved}</td>
            </tr>
          `
        })
    })
}

getProfile()