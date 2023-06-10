const getsearchbutton = document.querySelector('#search-button');
const fetchTableAsync = async () => {
    const fet = await fetch(`https://localhost:5001/api/Transaction/GetTransactionByReferenceId?referenceId=${getsearchbutton.value}`,{
        
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
    tableBodyValue.innerHTML +=  `
    <tr>
        <td>${tableBody.transaction.reference_id}</td>
        <td>${tableBody.transaction.buyerId}</td>
        <td>${tableBody.transaction.sellerId}</td>
        <td>${tableBody.transaction.itemTitle}</td>
        <td>${tableBody.transaction.deliveryAddress}</td>
        <td>${tableBody.transaction.totalPrice}</td>
        <td>${tableBody.transaction.transaction_status}</td>
        <td>${tableBody.transaction.createdDate}</td>
        <td><button type='button' onclick="comfirm()" class="process" class="btn" id = ${tableBody.transaction.reference_id} style="background-color:green">Process</button></td>
    </tr>
  `  

}

const comfirm = () => {
    const gett = window.confirm("Do you want to release Fund")
    if(gett == true){
        makeRefund()
    }
    else{
        window.location.href = "/AdminDashBoard/DashBoard/index.html";
    }
}

const makeRefund = ()=>{
        const get = document.querySelector(".process").addEventListener('blur', (e)=>{
                console.log("dfff")
                fetch(`https://localhost:5001/api/Payment/RefundPayment?transactionReference=${e.target.id}`,
                {
                    method: "POST",
                    headers: { 
                        "content-type": "application/json" 
                    },
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if(data.isSucess==false){
                        window.alert(data.message)
                    }
                    else{
                        window.alert(data.message)
                    }
                    
                    
                })
                .catch(err => {
                    console.log(err);
                })
            
        })
        
} 