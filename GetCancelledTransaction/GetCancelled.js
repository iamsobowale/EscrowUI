const fetchTableAsync = async () => {
    const fet = await fetch('https://localhost:5001/api/Transaction/GetAllCancelledTransactions',{
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
        if(element.numberOfSub>=0){
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
            <td><button type='button' class="btn" id = ${element.reference_id} style="background-color:green">Edit</button></td>
        </tr>
      `
      addbtn()
}});
}
var addd = document.querySelectorAll('.btn');
function addbtn (){
    var add = document.querySelectorAll('.btn');
    add.forEach(b => {
        b.addEventListener('click', (e) => {
            console.log(e.target.id)
        })
    })
}
showTableAsync();
