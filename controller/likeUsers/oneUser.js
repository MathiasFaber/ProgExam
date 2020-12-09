// DOM - kommenter på valget af måde for udførsel af DOM. Dynamisk.
// variabel som henter userContainer fra HTMLfilen
var userContainer = document.getElementById('oneUser');
console.log(userContainer)

// Henter founduser fra localstorage, så vi ved hvilken person der er på skærmen.
var user = JSON.parse(localStorage.getItem('founduser'));


// Her laves en container, hvori den valgte bruger indsættes
var container = document.createElement('container');

// Her bliver de forskellige properties fra klassen udvalgt og kan displayes på siden
container.className = "container";

// Her viser vi navnet på den person brugeren har trykket ind på.  
container.innerHTML += '<div class="matchName">' + user.username + '</div>';

// Her kunne man overveje at vise flere oplysninger om brugeren på siden

// Her bruges appendChild funktionen til at sætte container efter userContainer. 
userContainer.appendChild(container);

// Her laves Like knappen for den bruger der er valgt. 
// knappen har en "onclick" funktion, som gør at når der trykkes på knappen, kører funktionen som sender liket til serveren, og det gemmes i likes.JSON. 
var addALike = '<button type="button" onclick="addToMylikes()" class ="addALikeBtn">Like';

// Indsætter addALike i containeren 
container.innerHTML += addALike;


// Ved at sætte noget ind i input feltet på html siden, og trykke submit, gemmes dataen i en JSON fil. 
// per default skal der altid stå et hardcodet like for at funktionen virker. 
// denne funktion kaldes, ved tryk på like knappen, og den sender hhv founduser og currentuser til likes.JSON
function addToLike() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json"

   let foundUser = JSON.parse(localStorage.getItem("founduser"))
   console.log(foundUser)
   let currentUser = JSON.parse(localStorage.getItem("currentUser"))
   console.log(currentUser)

    // Her laves founduser og currentuser om til et objekt. Dette sendes til likes.JSON. Begge navne er inkluderet for at skelne mellem hvem der har liket hvem, og dermed kunne lave en matchfunktion.
    var likes = {
        username : currentUser.username,
        likedUser : foundUser.username
    }
    

    xhr.addEventListener("readystatechange", function() {
    // Hvis requesten er færdigjort og svaret er klargjort.
    if(this.readyState === 4) {
        const respo = this.response 
        console.log(respo); //Til at se, om request kommer tilbage
        if (respo.err == 'Failed'){
            // Hvis brugeren allerede er liket, får brugeren denne alert. 
           alert("You already liked this person")
            
        }
   
    }
    });

    // "Åbner" vores http request og angiver at det er POST request fra serveren på localhost: 2500
    xhr.open("POST", "http://localhost:2500/interMatch", true);

    // definerer at det er en JSON-fil der skal arbejdes med
    xhr.setRequestHeader("Content-Type", "application/json");

    // Sender http requested afsted. Den sender den data som er indtastet af brugeren, til serveren. 
    xhr.send(JSON.stringify(likes));

}



// Denne funktion sætter det nye like ind i localstorage. Dette gøres for at have en mere simpel måde at tjekke om vores bruger allerede har liket den person. 
function addToMylikes() {
    var matchToLike = user;
    //Hent vores nuværende likes fra localstorage
    //Hvis der ikke er nogen likes, så sikrer den at det er et tomt array.
    var likes = localStorage.getItem('likes');
    if (likes == null) {
        likes = [];
    } else {
        //ellers så tager den likesarrayet ud så vi kan loope igennem det senere
        likes = JSON.parse(likes);
    }

    // Dette for-loop tjekker hvorvidt brugeren allerede har liket den valgte bruger.
    var  matchAlreadySelected = false;
    for (i = 0; i < likes.length; i++) {
        if (likes[i].username === matchToLike.username){
            console.log()
            alert('You have already liked this person');
            matchAlreadySelected = true;
            break;
        }
    }
    if (matchAlreadySelected === false) {
        alert('A potential match has been added to your likes. Go to "My Matches" to check if the person likes you back <3');
        likes.push(matchToLike);
        localStorage.setItem('likes', JSON.stringify(likes));
        addToLike()
    }

    // når brugeren har liket en person, sendes brugeren tilbage til matches.html
    window.location = ("findLove.html");

}


//Dislike knap, fungerer ikke rigigt. Der er ikke rigtig lagt fokus på denne del af opgaven, da den virker forholdsvis ubetydelig.
// denne knap skulle selvfølgelig fungerer i et færdigt produkt. 
var disLike = '<button type="button" class ="disLikeBtn" onclick="addDislikes()">Dislike';
container.innerHTML += disLike;


function addDislikes() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json"
    console.log("hej")

    let foundUser = JSON.parse(localStorage.getItem("founduser"))
    console.log(foundUser)
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    console.log(currentUser)

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