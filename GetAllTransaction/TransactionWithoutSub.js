const fetchTableAsync = async () => {
    const fet = await fetch('https://localhost:5001/api/Transaction/GetAllTransactionByTraderEmail',{
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
    });
    let fetJson = fet.json();
    console.log(fetJson);
    return fetJson;
}
const showTableAsync = async () => {
    let tableBodyValue = document.querySelector('#table-Body');
    let tableBody = await fetchTableAsync();
    console.log(tableBody);
    tableBody.transactionList.forEach(element => {
        //check if transaction has subtransaction if not then dont show the button
        if(element.numberOfSub==0){
            tableBodyValue.innerHTML += `
        <tr>
            <td>${element.reference_id}</td>
            <td>${element.buyerId}</td>
            <td>${element.sellerId}</td>
            <td>${element.itemTitle}</td>
            <td>${element.description}</td>
            <td>${element.deliveryAddress}</td>
            <td>${element.totalPrice}</td>
            <td>${element.transaction_status}</td>
            <td>${element.createdDate}</td>
            <td><button type='button' class="btn" id = ${element.reference_id} style="background-color:green">Appeal</button></td>
        </tr>
      `
        }
        });
    test();
}
const test = () => {
    buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn=> {
        btn.addEventListener('click', (e)=>{ 
            console.log(e.target.id)
            const savetransaction = window.confirm("Are you sure you want to appeal this transaction?");
            if(savetransaction == true){
                window.localStorage.setItem("transaction_idd", e.target.id);
                window.location.href = `/Dispute/CreateDispute.html`;
            }
            else{
                window.location.reload(true)
            }
            
        })
    })
}


showTableAsync();