const fetchTableAsync = async () => {
    var refId = window.location.href.split('=')[1]; 
    console.log(refId);
    const fet = await fetch("https://localhost:5001/api/TransactionType/GetAllTransactionTypeByTransactionReferenceNumber/" + refId);
    let fetJson = fet.json();
    console.log(fetJson);
    return fetJson;
}

console.log("seen")
const showTableAsync = async () => {
    console.log("mbjghcvybhjnklmjk,l.mnbhgffghjkm,jhgfhjkl")
    let tableBodyValue = document.querySelector('#table-Body');
    let tableBody = await fetchTableAsync();
    console.log(tableBody);
    tableBody.transaction.forEach(element => {
        tableBodyValue.innerHTML += `
        <tr>
            <td id = "ids">${element.transactionReferenceNumber}</td>
            <td>${element.price}</td>
            <td>${element.status}</td>
            <td>${element.description}</td>
            <td>${element.createdDate}</td>
        </tr>
     `
    //  test();
    //  test2();
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
    fetch(`https://localhost:5001/api/TransactionType/AcceptTransaction/${para}`, 
    {
        method: "POST",
        headers: { 
            "content-type": "application/json" 
        },
    })
    .then(res => res.json())

    .then(data => {
        console.log("2")
        console.log("accept",data);
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
const test2 = () => {
    buttons = document.querySelectorAll('.btn2');
    buttons.forEach(btn=> {
        btn.addEventListener('click', (e)=>{ 
            changeStatusToReject(e.target.id)
           console.log(e.target.id)
        })
    })
}

function changeStatusToReject(para) {
    console.log(para);

    fetch(`https://localhost:5001/api/TransactionType/RejectTransaction/${para}`, 
    {
        method: "POST",
        headers: { 
            "content-type": "application/json" 
        },
    })
    .then(res => res.json())

    .then(data => {
        // console.log("2")
        console.log("reject", data);
        if(data.isSuccess==true){
            window.alert(data.message)
            window.location.reload(true)
        }
    })
    .catch(err => {
        console.log(err);
        console.log("3");
    })

}




showTableAsync();


