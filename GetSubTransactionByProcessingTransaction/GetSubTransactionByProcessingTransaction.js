console.log("mbjghcvyb")
const fetchTableAsync = async () => {
    var refId = window.location.href.split('=')[1]; 
    console.log(refId);
    const fet = await fetch("https://localhost:5001/api/TransactionType/GetSubTransactionByTransactionRef/" + refId);
    let fetJson = fet.json();
    console.log(fetJson);
    return fetJson;
}

const showTableAsync = async () => {
    console.log("mbjghcvybhjnklmjk,l.mnbhgffghjkm,jhgfhjkl")
    let tableBodyValue = document.querySelector('#table-Body');
    let tableBody = await fetchTableAsync();
    console.log(tableBody);
    tableBody.transaction.forEach(element => {
        //if transaction doesn't have sub transaction create a new page for it
        tableBodyValue.innerHTML += `
        <tr>
            <td id = "ids">${element.transactionReferenceNumber}</td>
            <td>${element.price}</td>
            <td>${element.status}</td>
            <td>${element.createdDate}</td>
            <td><button type='submit' class="btn" id= ${element.reference} style="background-color:green">Deliver</button></td>
        </tr>
     `
     test();
    });
}

const test = () => {
    buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn=> {
        btn.addEventListener('click', (e)=>{ 
           changeStatus(e.target.id)
           console.log(e.target.id)
        })
    })
}

function changeStatus(para) {
    // var id = document.querySelector('#ids').innerHTML;
    console.log("hello")
    console.log(para);

    fetch(`https://localhost:5001/api/TransactionType/MakeSubTransactionDone/${para}`, 
    {
        method: "POST",
        headers: { 
            "content-type": "application/json" 
        },
    })
    .then(res => res.json())

    .then(data => {
        console.log("2")
        if(data.isSuccess==true){
            // console.log("accept", data);
            window.alert(data.message)
            window.location.reload(true)
        }
    })
    .catch(err => {
        console.log(err);
        console.log("3");
    })

}
fetchTableAsync()
showTableAsync()