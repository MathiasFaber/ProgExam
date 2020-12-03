//const { each } = require("jquery");


// Virker: viser hvilken bruger der er logget ind. denne del er lavet selv
var displayUser = document.createElement("P")
var currentUsername = JSON.parse(localStorage.getItem("currentUser"))
var thisUser = currentUsername.username
console.log(currentUsername)
console.log(thisUser)

var textUser = document.createTextNode(thisUser)

displayUser.appendChild(textUser)
document.getElementById("showUsername").appendChild(displayUser)
/*
window.addEventListener("DOMContentLoaded", function(){
    var showUsername = document.getElementById("showUsername");
    console.log(showUsername)

    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log(currentUser)

    showUsername.appendChild(currentUser)
})
*/


// Create an event listner for the submit button
document.getElementById('edit').addEventListener('click',updateInfo);

class updatedUser {
    constructor(username, password, phone, city, zip, address, email){

        this.username = username;
        this.password = password;
        this.phone = phone;
        this.city = city;
        this.zip = zip;
        this.address = address;
        this.email = email;
    }}

    

// Function that updates personal info
// OBS: only updates localstorage. do a HTTPRequest. 
function updateInfo(){


    //get the value from HTML form 
    username = document.getElementById("editUsername").value;
    phone = document.getElementById("editPhone").value;
    city = document.getElementById("editCity").value;
    zip = document.getElementById("editZip").value;
    adress = document.getElementById("editAddress").value;
    email = document.getElementById("editEmail").value;
    password = document.getElementById("editPassword").value;
    
    // Get the existing data
    currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
    //get user data
   


    // Add new data to localStorage Array
    currentUser["username"] = username;
    currentUser["phone"] = phone;
    currentUser["city"] = city;
    currentUser["zip"] = zip;
    currentUser["address"] = adress;
    currentUser["email"] = email;
    currentUser["password"] = password;



// Save back to localStorage
window.localStorage.setItem('currentUser', JSON.stringify(currentUser));
//window.localStorage.setItem('User', JSON.stringify(changedUser));
window.location = ("userProfile.html");

    var updatesUser = JSON.parse(localStorage.getItem("User"));
}

// Edit in progress, post request for updating user info

document.addEventListener("DOMContentLoaded", function() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json"
 
    //henter matchescontainer fra HTMLfilen 
    //var matchesContainer = document.getElementById('matchesContainer');
    //console.log(matchesContainer)
 
    xhr.addEventListener("readystatechange", function() {
       if(this.readyState === 4) {
          var userInformation = this.response;
          console.log(userInformation) //virker, vi får dataen fra serveren

          var currentUserEdit = JSON.parse(localStorage.getItem("currentUser"));
          console.log(currentUserEdit.username)
          }
 
       })
 
       xhr.open("POST", "http://localhost:2500/editProfile", true);
          
       // definerer at det er en JSON-fil der skal arbejdes med
       xhr.setRequestHeader("Content-Type", "application/json");
          
       // Sender http requested afsted. Den sender altså den data som er indtastet af brugeren, til vores server (localhost). 
       xhr.send(currentUserEdit); 
 })
