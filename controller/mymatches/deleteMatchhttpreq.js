// egne forsøg på at slette en bruger fra JSON-filen
// virker ikke!
/*
deleteUser = document.getElementById("deleteButton")
    
deleteUser.addEventListener('click', function() {
        let allUsers;
        let newUsers;
        const xhr = new XMLHttpRequest();
        xhr.responseType = "json"
    
        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
        allUsers = this.response;
        //     console.log(allUsers);
        let currentUser = JSON.parse(localStorage.getItem("currentUser"))
          newUsers = allUsers.filter(allUser => allUser.username !== currentUser.username);
         console.log(this.response)
        } });
        
        xhr.open("GET", "http://localhost:2500/allusers", true);
           
// definerer at det er en JSON-fil der skal arbejdes med
        // xhr.setRequestHeader("Content-Type", "application/json");
// Sender http requested afsted. Den sender altså den data som er indtastet af brugeren, til vores server (localhost).
        xhr.send();
    })
    
*/

/*

async function slet() {
await deleteUser.addEventListener('click', function() {
        let allUsers;
        let newUsers;
        const xhr = new XMLHttpRequest();
        xhr.responseType = "json"
    
        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
        allUsers = this.response;
        //     console.log(allUsers);
        let currentUser = JSON.parse(localStorage.getItem("currentUser"))
          newUsers = allUsers.filter(allUser => allUser.username !== currentUser.username);
         console.log(this.response)
        } });
        
        xhr.open("GET", "http://localhost:2500/allusers", true);
           
// definerer at det er en JSON-fil der skal arbejdes med
        // xhr.setRequestHeader("Content-Type", "application/json");
// Sender http requested afsted. Den sender altså den data som er indtastet af brugeren, til vores server (localhost).
        xhr.send();
    })
    //her vil i kunne gå i gang med nyt req
    document.addEventListener("DOMContentLoaded", function() {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "json"

        xhr.addEventListener("readystatechange", function() {
                if(this.readyState === 4) {
                allUsers = this.response;
                //     console.log(allUsers);
                let currentUser = JSON.parse(localStorage.getItem("currentUser"))
                  newUsers = allUsers.filter(allUser => allUser.username !== currentUser.username);
                 console.log(this.response)
                } });
                
                xhr.open("DELETE", "http://localhost:2500/deleteUser", true);
                   
        // definerer at det er en JSON-fil der skal arbejdes med
                // xhr.setRequestHeader("Content-Type", "application/json");
        // Sender http requested afsted. Den sender altså den data som er indtastet af brugeren, til vores server (localhost).
                xhr.send(allUser);
    })

    }
*/