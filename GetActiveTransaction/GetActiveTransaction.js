const fetchTableAsync = async () => {
    const fet = await fetch('https://localhost:5001/api/Transaction/GetActiveTransactionByTraderEmail',{
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
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
    tableBody.transactionList.forEach(element => {
        tableBodyValue.innerHTML += `
        <tr>
            <td>${element.reference_id}</td>
            <td>${element.buyerId}</td>
            <td>${element.sellerId}</td>
            <td>${element.itemTitle}</td>
            <td>${element.deliveryAddress}</td>
            <td>${element.totalPrice}</td>
            <td>${element.transaction_status}</td>
            <td>${element.createdDate}</td>
            <td><button type='button' class="btn" id = ${element.reference_id} style="background-color:green">Process</button></td>
        </tr>
      `
      getId()
    });
}
function getId () {
    const get = document.querySelectorAll('.btn');
 get.forEach(d =>  {
    d.addEventListener('click', (e) =>{
        console.log()
        process(e.target.id)
    })
})
} 
const process = (para)=> {
    fetch(`https://localhost:5001/api/Transaction/ProcessTrasaction/`,
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
        if(data.isSuccess==true){
            window.alert(data.message)
            window.location.reload(true)
        }
    })
    .catch(err => {
        console.log(err);
    })

}
showTableAsync();