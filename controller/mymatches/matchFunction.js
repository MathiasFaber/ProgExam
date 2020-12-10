// Store dele af dette stykke kode er udarbejdet i samarbejde med min studiegruppe

// tjekker om brugeren er logged ind. Brugeren kan kun se siderne: matches, myMatches og My profile, hvis brugeren er logged in.
var areyouloggedin = localStorage.getItem("currentUser");
if (areyouloggedin == null){
    alert ("Please login, or create a user to login :-)")
    window.location.href = "../view/signIn.html";
} else {
// http-request som spørger efter data fra serveren. Her efterspørger den de data der ligger i likes.JSON
document.addEventListener("DOMContentLoaded", function() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json"
 
    xhr.addEventListener("readystatechange", function() {
       if(this.readyState === 4) {
           // her henter vi svaret fra serveren. dvs. listen over alle likes i systemet. 
          var findingMatches = this.response;
          console.log(findingMatches) // console.log bruges blot til at teste om vi får et svar fra serveren

          // Her tager vi fat i localstorage key'en currentUser, fordi vi i funktionen skal sammenligne den indlogede bruger med likesarrayet. 
          let currentUser = JSON.parse(localStorage.getItem("currentUser"))
            console.log(currentUser)
        
            // for-loopet som tager arrayet og looper gennem matches
            for(var i=0; i< findingMatches.length; i++){
                for(var j=0; j < findingMatches.length; j++){
                    if (currentUser.username === findingMatches[i].username 
                        // Hvis den indloggede bruger har liket en hvilken som helst person, er denne del korrekt.
                        && 
                        findingMatches[i].username === findingMatches[j].likedUser 
                        // Hvis brugeren der har liket en person, også er blevet liket tilbage (af en hvilken som helst bruger), er denne del korrekt.
                        && 
                        findingMatches[i].likedUser === findingMatches[j].username ){ 
                        // Hvis brugeren der har liket en anden bruger også er blevet liket tilbage af selv samme bruger, så er hele dette if statement korrekt, og koden nedenfor kører.
                        console.log(findingMatches[i].likedUser)  
                        
                        // Her laves en div for hver person der er matchet med. 
                        var matchRow = document.createElement('div');
                        // Her gives blot en class til "matchrow", for at kunne arbejde med den i css. 
                        matchRow.classList.add('match-row'); 

                        // Her laves inline html. Det gøres for at kunne skabe html elementerne for hvert match en bruger har fået. 
                        let matchRowContents = `   
                            <div class="match-items match-column">
                                <span>${findingMatches[i].likedUser}</span>
                                        
                            </div>
                        
                            <div class="match-quantity match-column">
                                <button class="btn btn-danger" id="deleteButton"type="button">REMOVE</button>
                            </div>`

                        // Her hentes den klasse som er lavet til hver match herover. 
                        var matchItems = document.getElementsByClassName('match-items')[0]; 

                        // Her indsættes vores inline html i matchrow.innterhtml, som er den div vi lavede på linje 36
                        matchRow.innerHTML = matchRowContents; 

                        // matchrow bliver lavet i forlængelse af matchitems. append() bruges her til at vise at matchitems skal være "parent node" og matchrow er efterfølgeren. 
                        // https://www.javascripttutorial.net/javascript-dom/javascript-append/ 
                        matchItems.append(matchRow) 

                        // Her laves eventlistener på remove match knappen (Remove match knappen virker ikke pt. da den kun fjerner matchet fra siden, ikke fra JSON.)
                        // matchRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeMatch);

                        // Hvis brugeren har fået et match, får han/hun en notofikation om dette og brugeren vises på siden. 
                        alert ("It's a match!!!!!!!")        
                    } 
                } 
            }
        }
    })

    // Viser at det er et get request, på denne url adresse som vi forespørger. 
    xhr.open("GET", "http://localhost:2500/findMatch", true);
        
    // definerer at det er en JSON-fil der skal arbejdes med
    xhr.setRequestHeader("Content-Type", "application/json");
        
    // Jeg sender ikke noget data med, da det er et get request. 
    xhr.send();
})


/*
// Does not work
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
    xhr.send(Hvad skal den sende afsted?? Den skal sende det array afsted hvor matchet er blevet fjernet!);
}
*/
}






    /*
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


