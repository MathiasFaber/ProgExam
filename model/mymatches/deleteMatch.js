/*document.getElementsByClassName('btn-danger')[0].addEventListener('click', function (){

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
})



*/









/* Sørger for at html siden er loadet, så de html elementer, som javascript koden benytter faktisk eksisterer.
Sålænge document.readystate er "loading", så venter vi på at det er færdigt med at loade,
og når eventen DOMContentLoaded indtræffer, så udfør funktionen ready. Såfremt siden allerede er loadet skal vi
ikke vente på noget (else delen) og kalder direkte funktionen ready*/


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)  /*Der benyttes et load event listener kald hvor
callback funktionen indeholder det kode som skal udføres når HTML siden er loadet.*/

} else {
    ready()
}


function ready() {
    /*Check i localStorage om der er gemt matches, og hvis det er tilfældet så indlæses de myMatches arrayet.
    Hvert element er et object af typen match */
    
    var myMatches = JSON.parse(localStorage.getItem("likes")); //dette skal ændres til matches

    if(myMatches != null) {  //Tjek om der er gemt et match array object i localStorage
        //For hvert match i myMatches arrayet tilføjer vi det til siden my matches 

        
        myMatches.forEach(function (key) { /*forEach løkken løber igennem index for myMatchesarrayet og
             function(key) udføres for hvert index. (Marijn Haverbeke, 2019 p. 95) */

             
            addMatch(key._matchName, key._matchImage);
        })

    }

}


//addMatch sørger for at tilføje matchet med tilhørende info til siden My Matches
function addMatch(title, imageSrc) {
    var matchRow = document.createElement('div');
    matchRow.classList.add('match-row'); //vi bruger CSS stilen 'match-row'for div elementet matchRow
    var matchItems = document.getElementsByClassName('match-items')[0]; /*vi vil senere tilføje en række til  div sektionen 'match-items'
    hvor de valgte personer listes */
    var matchTitleNames = matchItems.getElementsByClassName('match-item-title');


//Generer html-indholdet til en linje med det valgte match, (Web Dev Simplified - youtube, 2018)
    // laver en knap til at fjerne matchet fra matchlisten
    let matchRowContents = `   
        <div class="match-items match-column">
            <img class="match-name-image" src="${imageSrc}" width="100" height="100">
            <span class="match-name">${title}</span>
                   
        </div>
    
        <div class="match-quantity match-column">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`

  matchRow.innerHTML = matchRowContents; //html koden indeholdt i matchRowContents variablen indøres i elementet matchRow
    matchItems.append(matchRow) //matchRow tilføjes til sektionen matchItems på html siden
    //De næste to linjer Sørger for at henholdsvis removeMatch funktion kaldes når der trykkes på knappen
    matchRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeMatch);
}


/*
//funktion for at fjerne et match fra både HTML siden og arrayet i local storage 
function removeMatch(event) {
    var buttonClicked = event.target; //ved button.clicked refereres der til den aktuelle element, som skal fjernes
    //Få fat i den aktuelle række, hvor ”remove” knappen er blevet aktiveret
    var pickedMatchRow = buttonClicked.parentElement.parentElement;
    //De næste to linjer udtrækker match navnet (titleElement.innerText) fra den aktuelle række
    var titleElement = pickedMatchRow.getElementsByClassName('match-items')[0];
    var title = titleElement.innerText;
    buttonClicked.parentElement.parentElement.remove(); // fjerner den aktuelle html række, for det match, som brugeren ønskede fjernet.


    /*Udover at fjerne matches på html siden skal vi også fjerne matches fra match listen,
    som er gemt som ”likes” på localStorage. Vi finder det object, som svarer til matchnavnet
     og fjerner det fra localstorage ved at udskifte arrayed i localStorage med et nyt array, hvor matched er fjernet */
   /*
   var myMatches = JSON.parse(localStorage.getItem("likes"));
    var i;
    for (i = 0; i < myMatches.length; i++) {
        if (myMatches[i]._matchName === title){
            myMatches.splice(i,1); 
            */
            /*der slettes et element ved position index i myMatches arrayet,
            så det pågældende element også slettes fra localStorage: inspireret fra (Stack Overflow Spice, 2016) og  (W3schools splice, 2019)*/
          
            //localStorage.setItem("likes", JSON.stringify(myMatches));
            //break 
        //}
        

   // }

//}
