// Vi laver et post request der ligner likesarrayet meget! 
// Inde i API skal vi så loope igennem likesarrayet, og finde matches. 
// dvs. if (likesarray[i].username == likesarray[j].likedPerson && likesarray[j].username == likesarray[i].likedPerson)
document.addEventListener("DOMContentLoaded", function() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json"
 
    //henter matchescontainer fra HTMLfilen 
    var matchesContainer1 = document.getElementById('findMatches');
    //console.log(matchesContainer)
 
    xhr.addEventListener("readystatechange", function() {
       if(this.readyState === 4) {
          var findingMatches = this.response;
          console.log(findingMatches)

          let currentUser = JSON.parse(localStorage.getItem("currentUser"))
            console.log(currentUser)
        
            // for-loopet som tager arrayet og looper gennem matches
            for(var i=0; i< findingMatches.length; i++){
                for(var j=0; j < findingMatches.length; j++){
                    if (currentUser.username === findingMatches[i].username 
                        && 
                        findingMatches[i].username === findingMatches[j].likedUser 
                        && 
                        findingMatches[i].likedUser === findingMatches[j].username ){
                        console.log(findingMatches[i].likedUser)  
                        
                        var matchRow = document.createElement('div');
                        matchRow.classList.add('match-row'); //vi bruger CSS stilen 'match-row'for div elementet matchRow
                        var matchItems = document.getElementsByClassName('match-items')[0]; /*vi vil senere tilføje en række til  div sektionen 'match-items'
                        hvor de valgte personer listes */
                        var matchTitleNames = matchItems.getElementsByClassName('match-item-title');
                    
                        //Generer html-indholdet til en linje med det valgte match, (Web Dev Simplified - youtube, 2018)
                        // laver en knap til at fjerne matchet fra matchlisten
                        let matchRowContents = `   
                            <div class="match-items match-column">
                                <span class="match-name">${findingMatches[i].likedUser}</span>
                                        
                            </div>
                        
                            <div class="match-quantity match-column">
                                <button class="btn btn-danger" type="button">REMOVE</button>
                            </div>`
                           // <script> function deleteMatch(){console.log("removemymatchb)}</script>` // inline javascript funktion virker ikke
                        
                    
                        matchRow.innerHTML = matchRowContents; //html koden indeholdt i matchRowContents variablen indøres i elementet matchRow
                        matchItems.append(matchRow) //matchRow tilføjes til sektionen matchItems på html siden
                        //De næste to linjer Sørger for at henholdsvis removeMatch funktion kaldes når der trykkes på knappen
                        matchRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeMatch);

                        // Vi kan muligvis lave onclick funktionen herinde? altså når der trykkes remove, så skal den fjerne det fra JSON filen. 
                        

                    } 
                } 
            }
            alert ("It's a match!!!!!!!")  
            /*
            function deleteMatch (){ // Fungerer ikke pt. men burde det ikke virke?
                console.log("remove my match")
        
            }
            */
        }
    })

    

    xhr.open("GET", "http://localhost:2500/findMatch", true);
        
    // definerer at det er en JSON-fil der skal arbejdes med
    xhr.setRequestHeader("Content-Type", "application/json");
        
    // Sender http requested afsted. Den sender altså den data som er indtastet af brugeren, til vores server (localhost). 
    xhr.send();
})


function removeMatch(event){
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    
    console.log("hej")

    var buttonClicked = event.target; //ved button.clicked refereres der til den aktuelle element, som skal fjernes
    //Få fat i den aktuelle række, hvor ”remove” knappen er blevet aktiveret
    var pickedMatchRow = buttonClicked.parentElement.parentElement;
    //De næste to linjer udtrækker match navnet (titleElement.innerText) fra den aktuelle række
    var titleElement = pickedMatchRow.getElementsByClassName('match-items')[0];
    var title = titleElement.innerText;
    buttonClicked.parentElement.parentElement.remove(); // fjerner den aktuelle html række, for det match, som brugeren ønskede fjernet.
    
 
    xhr.addEventListener("readystatechange", function() {
       if(this.readyState === 4) {
          var removedMatch = this.response;
          console.log(removedMatch)
       }
    })

    xhr.open("POST", "http://localhost:2500/removeMatch", true);
        
    // definerer at det er en JSON-fil der skal arbejdes med
    xhr.setRequestHeader("Content-Type", "application/json");
        
    // Sender http requested afsted. Den sender altså den data som er indtastet af brugeren, til vores server (localhost). 
    xhr.send(/*Hvad skal den sende afsted?? Den skal sende det array afsted hvor matchet er blevet fjernet!*/);
}





    /*
    console.log("hej")
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json"
 
    xhr.addEventListener("readystatechange", function() {
       if(this.readyState === 4) {
          var findingMatches = this.response;
          console.log(findingMatches)

       }
    })
    xhr.open("GET", "http://localhost:2500/findMatch", true);
        
    // definerer at det er en JSON-fil der skal arbejdes med
    xhr.setRequestHeader("Content-Type", "application/json");
        
    // Sender http requested afsted. Den sender altså den data som er indtastet af brugeren, til vores server (localhost). 
    xhr.send();
}

*/