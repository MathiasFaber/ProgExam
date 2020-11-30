const { each } = require("jquery");

// Create an event listner for the submit button
document.getElementById('editBtn').addEventListener('click',updateInfo);

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
function updateInfo(){


    //get the value from HTML form 
    username = document.getElementById("editUsername").value;
    phone = document.getElementById("editPhone").value;
    city = document.getElementById("newCity").value;
    zip = document.getElementById("newZip").value;
    adress = document.getElementById("newAddress").value;
    email = document.getElementById("newEmail").value;
    password = document.getElementById("newPassword").value;
    
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

    //pusher ny bruger ind i et array 


    var i;
    for (i = 0; i < updatesUser.length; i++) {
        email = updatesUser[i].email 
        console.log(address);
        if /* check om email er det samme så:*/
             updatesUser[i] = new updatedUser (username, password, phone, city, zip, address, email)

    }

    updatesUser.push(new updatedUser (username, password, phone, city, zip, address, email));
    console.log(updatesUser);

    //createduser laves til en string 
    var updatesUser = JSON.stringify(createdUser);
    //tilføjes til local storage
    localStorage.setItem("User", updatesUser);
    //tilføjer en alert 
    alert('New User has been created');


}





//constructor(username, password, phone, city, zip, address, email, gender)

/*
//Herefter oprettes en variable for oprettede bruger, som sendes til localstorage
    var updatesUser = JSON.parse(localStorage.getItem("User"));

    //pusher ny bruger ind i et array 
    updatesUser.push(new updatedUser (username, password, phone, city, zip, address, email));
    console.log(updatesUser);

    //createduser laves til en string 
    var updatesUser = JSON.stringify(createdUser);
    //tilføjes til local storage
    localStorage.setItem("User", updatesUser);
    //tilføjer en alert 
    alert('New User has been created');
*/
