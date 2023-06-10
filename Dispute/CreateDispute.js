const getReason = document.querySelector("#reason");
const get = window.localStorage.getItem("transaction_idd");
let create = () => {    
    Data = {
        reason: getReason.value,
        transactionReference: get,
        createdBy : localStorage.getItem("email"),
    };
    fetch('https://localhost:5001/api/Dispute/CreateDispute',
    {
        method: "POST",
        headers: { 
            "content-type": "application/json" 
        },
        body: JSON.stringify(Data)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.isSucess==true){
            window.location.href = "/UserDashBoard/index.html";
        }
        else{
            window.alert(data.message)
            window.location.href = "/UserDashBoard/index.html";
        }
    })
    .catch(err => {
        console.log(err);
        console.log("3");
    })
    
}