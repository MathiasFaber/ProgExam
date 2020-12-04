
// tjekker om brugeren er logged ind. Brugeren kan kun se siderne: matches, myMatches og My profile, hvis brugeren er logged in.
var areyouloggedin = localStorage.getItem("currentUser");
if (areyouloggedin == null){
    alert ("Please login, or create a user to login :-)")
    window.location.href = "file:///Users/mathiasfaber/Library/Mobile%20Documents/com~apple~CloudDocs/Ha.it%20-%201.%20semester/Programmering/29:11/view/signIn.html";
} else {
   document.addEventListener("DOMContentLoaded", function() {
      const xhr = new XMLHttpRequest();
      xhr.responseType = "json"
   
      //henter matchescontainer fra HTMLfilen 
      var matchesContainer = document.getElementById('matchesContainer');
      //console.log(matchesContainer)
   
      xhr.addEventListener("readystatechange", function() {
         if(this.readyState === 4) {
            var allMatches = this.response;
            console.log(allMatches)
            var thisUser = JSON.parse(localStorage.getItem('currentUser'))
            console.log(thisUser.username)

          
               // for-loopet som tager arrayet og looper gennem matches
               for(var i=0; i < allMatches.length; i++){
               
                  // variabel en div genenem variablen match, herved simplificeres HTML 
                  var match = document.createElement('div');
               
                  // Her bliver de forskellige properties fra klassen udvalgt og kan displayes på siden 
                  match.className = "match";
                  
                  // displayer navne på oprettede brugere i matches.html 
                  match.innerHTML += '<div class="matchName" id='+allMatches[i].username+' onclick="interMatch('+allMatches[i].username+')">'+allMatches[i].username+'</div>';
                  // displayer navnet på det eventuelle match 
               
                  // tager Child af matchescontaine
                  matchesContainer.appendChild(match);

                  

                  }
   
                 
               }
               
            })
   
         
   
      xhr.open("GET", "http://localhost:2500/matches", true);
         
      // definerer at det er en JSON-fil der skal arbejdes med
      xhr.setRequestHeader("Content-Type", "application/json");
         
      // Sender http requested afsted. Den sender altså den data som er indtastet af brugeren, til vores server (localhost). 
      xhr.send();
         })      
      
      
      
   }
   
  
   
   function interMatch(username){
      const xhr = new XMLHttpRequest();
      xhr.responseType = "json"
   
      xhr.addEventListener("readystatechange", function() {
         if(this.readyState === 4) {
            var allMatches = this.response;
            for (var i = 0; i < allMatches.length; i++) {            
               if (allMatches[i].username == username.id) {
                   let founduser = allMatches[i];
                   localStorage.setItem('founduser', JSON.stringify(founduser))



                   window.location = "../view/intermatch.html"
               }
               
           }
         }
   
      })
   
         
            
   
         xhr.open("GET", "http://localhost:2500/matches", true);
            
         // definerer at det er en JSON-fil der skal arbejdes med
         xhr.setRequestHeader("Content-Type", "application/json");
            
         // Sender http requested afsted. Den sender altså den data som er indtastet af brugeren, til vores server (localhost). 
         xhr.send();
                  
   
      
   }




