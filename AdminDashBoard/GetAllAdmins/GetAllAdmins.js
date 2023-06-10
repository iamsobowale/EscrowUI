const fetchTableAsync = async () => {
    const fet = await fetch('https://localhost:5001/api/Admin/GetAllAdmin',{
        
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
    tableBody.admin.forEach(element => {
        tableBodyValue.innerHTML += `
        <tr>
            <td>${element.firstName}</td>
            <td>${element.lastName}</td>
            <td>${element.adminId}</td>
            <td>${element.email}</td>
            <td>${element.phoneNumber}</td>
            <td>${element.state}</td>
            <td>${element.city}</td>
            <td>${element.address}</td>
            <td><button type='button' class="btn" id = ${element.email} style="background-color:green">View</button></td>
        </tr>
      `
      
    //   console.log("displaying")
      
    });
    test();
}
const test = () => {
    buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn=> {
        btn.addEventListener('click', (e)=>{ 
           deleteAdmin(e)
        })
    })
}
function deleteAdmin (e){
    console.log(e.target.id);
    const fetchDeleteAdmin = async () => {
        const fet = await fetch(`https://localhost:5001/api/Admin/DeleteAdmin?email=${e.target.id}`,{
            method: 'DELETE',
        });
        let fetJson = fet.json();
        console.log(fetJson);
        return fetJson;
    }
    fetchDeleteAdmin();
    window.location.reload();
}

showTableAsync();