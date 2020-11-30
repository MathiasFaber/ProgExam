
//variabel for den bruger, som er logget ind 
var currentUser = JSON.parse(localStorage.getItem("currentUser"));

// henter information fra min User Klasse, som blev oprettet i validation.js - formålet er at man som bruger kan se sine brugeroplysninger
document.getElementById("username").value = currentUser.username;
document.getElementById("phone").value = currentUser.phone;
document.getElementById("city").value = currentUser.city;
document.getElementById("zip").value = currentUser.zip;
document.getElementById("address").value = currentUser.address;
document.getElementById("email").value = currentUser.email;



var logOutBTN = document.getElementById("logOutBtn").addEventListener("click",logOut);

function logOut() {
    return localStorage.removeItem('currentUser'); 
}


var removeItem = document.getElementById("deleteBtn").addEventListener("click",deleteAccount);

function deleteAccount() {
    var accounts = JSON.parse(localStorage.getItem("User"));
    var current = JSON.parse(localStorage.getItem("currentUser"));

    accounts = accounts.filter(account => account.username !== current.username);
    console.log(accounts);

    localStorage.setItem("User", JSON.stringify(accounts));

    return localStorage.removeItem('currentUser'); 

}










