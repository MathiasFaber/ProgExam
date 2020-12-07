// Viser hvilken bruger der er logget ind. Denne del er udarbejdet på egen hånd. 
// Hvis der ikke er en bruger der er logget ind, sendes man til login siden.
var areyouloggedin = localStorage.getItem("currentUser");
if (areyouloggedin == null){
    alert ("Please login, or create a user to login :-)")
    window.location.href = "../view/signIn.html";
} else {
    // Hvis brugeren er logget ind, laves der blot et element i html filen, hvor brugerens navn sættes ind. 
    var displayUser = document.createElement("P")
    var currentUsername = JSON.parse(localStorage.getItem("currentUser"))
    var thisUser = currentUsername.username
    console.log(currentUsername)
    console.log(thisUser)

    var textUser = document.createTextNode(thisUser)

    displayUser.appendChild(textUser)
    document.getElementById("showUsername").appendChild(displayUser)

}


// Her laves en eventlistener på submit knappen. Dvs at denne skal opdatere en brugers profiloplysninger, 
// Denne funktion virker ikke pt, og ændrer kun i localstorage. Den skal kunne ændre i JSON-filen. 
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
    }
}

    


function updateInfo(){


    // Henter values som brugeren har indtastet 
    username = document.getElementById("editUsername").value;
    phone = document.getElementById("editPhone").value;
    city = document.getElementById("editCity").value;
    zip = document.getElementById("editZip").value;
    adress = document.getElementById("editAddress").value;
    email = document.getElementById("editEmail").value;
    password = document.getElementById("editPassword").value;
    
    // finder den eksisterende data fra currentUser i localstorage. 
    currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
   


    // Her ændres dataen i localstorage til at være den data som brugeren har tastet ind, da han/hun ændrede sin profil.
    currentUser["username"] = username;
    currentUser["phone"] = phone;
    currentUser["city"] = city;
    currentUser["zip"] = zip;
    currentUser["address"] = adress;
    currentUser["email"] = email;
    currentUser["password"] = password;



    // Så gemmer jeg det i localstorage igen. 
    window.localStorage.setItem('currentUser', JSON.stringify(currentUser));
    // Og sender her brugeren tilbage til samme side, for at opdatere siden. 
    window.location = ("userProfile.html");

    var updatesUser = JSON.parse(localStorage.getItem("User"));
}


/*
// Edit in progress, post request for updating user info

document.addEventListener("DOMContentLoaded", function() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json"
 
    //henter matchescontainer fra HTMLfilen 
    //var matchesContainer = document.getElementById('matchesContainer');
    //console.log(matchesContainer)
    var currentUserEdit = JSON.parse(localStorage.getItem("currentUser"));

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

 */