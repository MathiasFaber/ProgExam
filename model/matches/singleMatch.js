//URL SearchParams. Dette er den måde hvorpå når der trykkes på et billede i match oversigten bliver man sendt til det pågældende match siden
//Vi bruger en indbygget klasse der hedder URLSearchParams, som giver muligheden for at hente query-parameteren 'matchId'.

'div class="singleMatchContainer">'
//Fundamentet for at finde det rigtige mulige match, som der er klikket på. Her er der forekommet en refakturering. Således at den går fra at benytte matches[i]
// overalt, til at benytte den funktion istedet. nedsat kompleksitet, øget læsbarhed, rykket en logik som stod flere steder til et(centralisering)
var match = JSON.parse(localStorage.getItem('founduser'));
//console.log(match)
// DOM - kommenter på valget af måde for udførsel af DOM. Dynamisk.
/* variabel som indhenter matchContainer i HTMLfilen */
var matchContainer = document.getElementById('match');
// der laves enn container , hvori det valgte match bliver vist med tilhørende information
var container = document.createElement('container');

/* Her bliver de forskellige properties fra klassen udvalgt og kan displayes på siden */
container.className = "container";

/* displayer image 
container.innerHTML = '<img class="match_img"' + ' onClick ="interMatch"(' + match._matchId + ')">';
*/
/* displayer matchnavnet */
container.innerHTML += '<div class="matchName">' + match.username + '</div>';
// ligesom linjen herover, skal man kunne se alle oplysninger om brugeren.

/*displayer beskrivelsen*/
//container.innerHTML += '<div class="matchDescription"> Description: ' + match._matchDescription + '</div> <br>' ;

// tager Child af matchContainer 
matchContainer.appendChild(container);

/* Add A Like button, som gør at detaljerne fra det valgte match kan videreføres til My Matcges*/
var addALike = '<button type="button" onclick="addToLike()" class ="addALikeBtn">Like';
container.innerHTML += addALike;


 // Ved at sætte noget ind i input feltet på html siden, og trykke submit, gemmes dataen i en JSON fil. 
function addToLike() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json"
    console.log("hej")

   //HTTP-request
   let foundUser = JSON.parse(localStorage.getItem("founduser"))
   console.log(foundUser)
   let currentUser = JSON.parse(localStorage.getItem("currentUser"))
   console.log(currentUser)

    // Pusher current user ind på likesarray indeks 0, og herefter den der likes
    var likes = {
        username : currentUser.username,
        likedUser : foundUser.username
    }
    /*
    if(likes[0] != currentUser.username){
        likes.push(currentUser.username)
        likes.push(foundUser.username)
    }else{
    likes.push(foundUser.username)
    }
   console.log(likes)
   */

   // Lav en funktion der pusher dit eget username ind plus den likede persons username
   // if statement: hvis dit eget username allerede er i dette array, push kun likede persons username. 

    // idk den tjekker vel for om siden er klar, og sender en fejl hvis den ikk er
    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        const respo = this.response 
        console.log(respo); //Til at se, om request kommer tilbage
        if (respo.err == 'Failed'){
           alert("You already liked this person")
            
        }
   
    }
    });

    // "Åbner" vores http request og angiver at det er POST request fra serveren på localhost:3000
    xhr.open("POST", "http://localhost:2500/interMatch", true);

    // definerer at det er en JSON-fil der skal arbejdes med
    xhr.setRequestHeader("Content-Type", "application/json");

    // Sender http requested afsted. Den sender altså den data som er indtastet af brugeren, til vores server (localhost). 
    xhr.send(JSON.stringify(likes));

}


function addToMylikes() {
    var matchToLike = match;
    //Hent vores nuværende matches fra localstorage
    //Hvis der ikke er nogen likes, så sikrer den at det er et tomt array.
    var likes = localStorage.getItem('likes');
    if (likes == null) {
        likes = [];
    } else {
        likes = JSON.parse(likes);
    }
    //tjekker om identitisk match er tilføjet, således den ikke popper op dobbelt. Da der ikke er modificeret i likes bunken til
    //at kunne tage i imod flere af samme og stacke.
    /*  code review: Man kan ikke tilføje et match flere gange, hvilket ikke er helt optimalt, da man skal have mulighed
    for at tilføje flere identiske matches til kurven, således de stacker */

    var chosenMatches = JSON.parse(localStorage.getItem("likes"));
    var i;
    var  matchAlreadySelected = false;
    for (i = 0; i < likes.length; i++) {
        if (likes[i]._matchName === matchToLike._matchName){
            alert('You have already liked this person');
            matchAlreadySelected = true;
            break
        }
    }
    if (matchAlreadySelected === false) {
        alert('A pottential match has been added to your likes. Wait and see if the person likes you');
        likes.push(matchToLike);
        localStorage.setItem('likes', JSON.stringify(likes));
    }
    window.location = ("matches.html");

}


//Dislike knap 
var disLike = '<button type="button" class ="disLikeBtn" onclick="addDislikes()">Dislike';
container.innerHTML += disLike;


function addDislikes() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json"
    console.log("hej")

    //HTTP-request
    let foundUser = JSON.parse(localStorage.getItem("founduser"))
    console.log(foundUser)
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    console.log(currentUser)

    // Pusher current user ind på likesarray indeks 0, og herefter den der likes
    var disLikes = {
        username : currentUser.username,
        disLikedUser : foundUser.username
    }
  
    // idk den tjekker vel for om siden er klar, og sender en fejl hvis den ikk er
    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        const respo = this.response 
        console.log(respo); //Til at se, om request kommer tilbage
        if (respo.err == 'Failed'){
            alert("You already disliked this person")
            
        }
    
    }
    });

    // "Åbner" vores http request og angiver at det er POST request fra serveren på localhost:3000
    xhr.open("POST", "http://localhost:2500/interMatchDis", true);

    // definerer at det er en JSON-fil der skal arbejdes med
    xhr.setRequestHeader("Content-Type", "application/json");

    // Sender http requested afsted. Den sender altså den data som er indtastet af brugeren, til vores server (localhost). 
    xhr.send(JSON.stringify(disLikes));

}

 // window.location: returns the href (URL) of the current page


// code review: Ifølge objektorienteret programmering, kunne denne funktion have sin egen fil

function findMatch(matchId) {
    for (var i = 0; i < matches.length; i++) {
        if (matches[i]._matchId == matchId) {
            return matches[i];
        }
    }
}

'</div>'
