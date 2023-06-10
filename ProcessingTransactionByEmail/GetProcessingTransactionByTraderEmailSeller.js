console.log("seen");
function getProfile (){
    const fet = fetch("https://localhost:5001/api/Transaction/GetProcessingTransactionByTraderEmailSeller", {
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
            //if transaction does not have sub transaction add a done button
            if(element.numberOfSub >0){
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
                    <td><button type='button' class="btn" id =${element.reference_id} style="background-color:green"><strong>View</strong></button></td>
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
                window.location.href = `/GetSubTransactionByProcessingTransaction/GetSubTransactionByProcessingTransaction.html?id=${e.target.id}`;
                console.log(e.target.id)
            })
        }) 
    }
 



// function completeTransaction (){
    
//     const get2 = document.querySelectorAll('.btn2');
//     get2.forEach(d =>  {
//         d.addEventListener('click', (e) =>{
//             console.log("fghjghjhgffhghg")
//             console.log(e.target.id)
//             // const fet = fetch("https://localhost:5001/api/Transaction/CompleteTransaction", {
//             //     method: "POST",
//             //     headers: {
//             //         "Content-Type": "application/json",
//             //         "Authorization": "Bearer " + localStorage.getItem("token")
//             //     },
//             // }).then(res => res.json(console.log(res)))
//             // .then(data => {
//             //     console.log(data)
//             //     window.location.href = "/GetProcessingTransaction/GetProcessingTransaction.html";
//             // }
//             // )
//         })
//     }
//     )   
// }

getProfile();