// Lav en eventlistener på delete knappen i mymatches.html

var delete123 = document.getElementById('deleteBtn')
console.log(delete123)

// ONLOAD FUNKTION. siden skal loades. dvs selve knappen skal laves, før vi kan køre en funktion på knappen.
delete123.addEventListener("click", function() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json"

    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    console.log(currentUser)
 
 
    xhr.addEventListener("readystatechange", function() {
       if(this.readyState === 4) {
            var allUsersObject = this.response;
            console.log(allUsersObject, "Er det et array??")

            var array = [];
            var users = JSON.stringify(allUsersObject.username)
            array.push(users)

            console.log(array)

            allUsersObject = allUsersObject.filter(allUsersObject => allUsersObject.username !== currentUser.username);
            //console.log(allUsers);
        }
    })

    xhr.open("DELETE", "http://localhost:2500/deleteUser", true);
        
    // definerer at det er en JSON-fil der skal arbejdes med
    xhr.setRequestHeader("Content-Type", "application/json");
        
    // Sender http requested afsted. Den sender altså den data som er indtastet af brugeren, til vores server (localhost). 
    xhr.send(JSON.stringify(currentUser));
})

//