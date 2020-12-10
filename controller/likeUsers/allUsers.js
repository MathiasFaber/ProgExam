// store dele af dette stykke kode er udarbejdet i samarbejde med min studiegruppe. 
// tjekker om brugeren er logged ind. Brugeren kan kun se siderne: matches, myMatches og My profile, hvis brugeren er logged ind.
var areyouloggedin = localStorage.getItem("currentUser");
if (areyouloggedin == null){
   // informere brugeren om at han/hun ikke er logget ind, brugeren sendes til login siden. 
    alert ("Please login, or create a user to login :-)")
    window.location.href = "../view/signIn.html";
} else {
   // Hvis brugeren er logget ind, sendes et http request til serveren.
   document.addEventListener("DOMContentLoaded", function() {
      const xhr = new XMLHttpRequest();
      xhr.responseType = "json"
   
      // her henter jeg userContainer fra HTML-filen, for at kunne bruge den senere, når der skal laves de forskellige brugere der er i systemet. 
      var userContainer = document.getElementById('usersContainer');
   
      xhr.addEventListener("readystatechange", function() {
         if(this.readyState === 4) {
            var allUsers = this.response;
         
               // Dette for loop, looper igennem alle brugerne i systemet, og laver en div til hver bruger
               for(var i=0; i < allUsers.length; i++){
               
                  // Her laves omtalte div, for hver bruger
                  var users = document.createElement('div');
               
                  // Her bliver de forskellige properties fra klassen udvalgt og kan displayes på siden 
                  users.className = "match";
                  
                  // displayer navne på oprettede brugere i matches.html 
                  users.innerHTML += '<div class="matchName" id='+allUsers[i].username+' onclick="oneUser('+allUsers[i].username+')">'+allUsers[i].username+'</div>';
               
                  // For hver bruger laves et "child". Brugeren vises altså i forlængelse af forrige bruger.
                  userContainer.appendChild(users);
               }

            }
               
         })
   
         
      // Her spørger vi om at få den data som ligger i model/storage.JSON, så vi kan vise brugeren en liste over alle brugere i systemet.
      xhr.open("GET", "http://localhost:2500/allUsers", true);
         
      // definerer at det er en JSON-fil der skal arbejdes med
      xhr.setRequestHeader("Content-Type", "application/json");

      // Da det er et GET-request, sendes der ikke noget data afsted fra controlleren. Det er udelukkende en forespørgsel om data fra serveren (model). 
      xhr.send();
      })      
      
      
      
   }
   
  
   
   // Denne funktion kaldes, når brugeren har trykket sig ind på en profil. Her kastes den valgte bruger ind i localstorage med key'en: founduser. 
   // localstorage key'en founduser bruges i dokumentet "oneUser.js", når man liker en bruger. 
   // Når man liker en bruger kastes den bruger der er logget ind, samt den bruger der ligger i founduser i localstorage, ind i likes.JSON i model.
   // Dette foregår i oneUser dokumentet. 
   function oneUser(username){
      const xhr = new XMLHttpRequest();
      xhr.responseType = "json"
   
      xhr.addEventListener("readystatechange", function() {
         if(this.readyState === 4) {
            var allUsers = this.response;
            for (var i = 0; i < allUsers.length; i++) {            
               if (allUsers[i].username == username.id) {
                   let founduser = allUsers[i];
                   localStorage.setItem('founduser', JSON.stringify(founduser))

                   window.location = "../view/oneUser.html"
               }
               
           }
         }
   
      })
      
      // Viser at det er et GET request, og at vi efterspørger det som serveren henter fra JSON filen, på http://localhost:2500/allUsers
      xhr.open("GET", "http://localhost:2500/allUsers", true);
         
      // Sender http requested afsted. Vi sender ingen data afsted sammen med forespørgslen, men selve requested sendes afsted her. 
      xhr.send();
   }




