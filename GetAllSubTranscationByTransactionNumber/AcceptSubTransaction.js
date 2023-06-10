const PosttoAcceptSubTransaction = () => {
    let Data = {
        id: window.location.href.split('=')[1]
    }
fetch('https://localhost:5001/api/TransactionType/AcceptTransactionType',
    {
        method: "POST",
        headers: { 
            "content-type": "application/json" 
        },
        body: JSON.stringify(Data)
    })
    .then(res => res.json())
    .then(data => {
        console.log("2")
        console.log(data);
        if(data.status==true){
            window.alert(data.message)
            window.location.href = "/UserDashBoard/index.html";
        }
    })
    .catch(err => {
        console.log(err);
        console.log("3");
    })
}
    