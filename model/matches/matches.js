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
       
            // for-loopet som tager arrayet og looper gennem matches
            for(var i=0; i< allMatches.length; i++){

            // variabel en div genenem variablen match, herved simplificeres HTML 
            var match = document.createElement('div');
         
            // Her bliver de forskellige properties fra klassen udvalgt og kan displayes på siden 
            match.className = "match";
            
            // displayer navne på oprettede brugere i matches.html 
            match.innerHTML += '<div class="matchName" id='+allMatches[i].username+' onClick="interMatch('+allMatches[i].username+')">'+allMatches[i].username+'</div>';
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

function findMatch(username) {
   
   
   
   
}

async function interMatch(username){
   const xhr = new XMLHttpRequest();
   xhr.responseType = "json"

   xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
         var allMatches = this.response;
         for (var i = 0; i < allMatches.length; i++) {            
            if (allMatches[i].username == username.id) {
                let founduser =  allMatches[i];
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