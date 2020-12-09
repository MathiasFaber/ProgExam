// Dette er min server, med mine CRUD endpoints. 
// Det er en node server, som kører på express pakken. 
const express = require('express');
const app = express();
// cors er en pakke som er downloadet og benyttet her, fordi man nogle gange får fejl i browseren.
// grunden til denne fejl, er at nogle browsere ikke tillader at man laver requests fra et website til et andet.
// Derfor bruger jeg cors her, så jeg kan lave mine requests uden at få fejl. 
const cors = require('cors');

// Når vi sender og modtager data til og fra serveren er det smart at bruge Body-parser.
// Bodyparseren gør, at nå vi modtager noget data fra et http-request, kan hele denne bodyen af den data fanges i req.body, så vi kan arbejde med den i serveren. 
// https://stackoverflow.com/questions/38306569/what-does-body-parser-do-with-express
const bodyParser = require('body-parser');
// Den localhost port, som serveren kører på
const port = 2500;

//fs bruges til at læse Json filerne og ændre i json filerne. 
var fs = require('fs');

// Definerer at vi skal bruge cors og bodyparser med express.
app.use(cors());
// Her definerer vi også at det er JSON data vi arbejder med, og at den derfor kun skal finde JSON data. 
app.use(bodyParser.json());


// Her defineres det at express har lov til at benytte Access-Control-Allow-Origin og Access-Control-Allow-Headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
})


// Dette get request er blot lavet for at tjekke hvorvidt min server fungerer. 
// Hvis den fungerer vil den printe 'Get request virker', på localhost 2500.
app.get('/', (req, res)=> {
    let data = 'Get request virker'
    let dataAsString = JSON.stringify(data);
    res.send(dataAsString);
})

// Ved at sætte noget ind i input feltet på html siden, og trykke submit, gemmes dataen i en JSON fil.
// Dette er det post request som lagre data fra den oprettede bruger i storage.JSON 
app.post('/', (req, res)=> {
    // den data der er sendt fra http-request, gemmes i en variabel.
    let reqData = req.body;
    // Så hentes storage.JSON filen
    var storage = JSON.parse(fs.readFileSync("model/storage.JSON"))
    // Dataen fra http-requested pushes ind i vores storage dokument (storage.JSON)
    storage.push(reqData);
    // Derefter laves en fs.writefile, som definerer at det er storage.JSON der skal skrives i, og det skal være variblen "storage", som en string for at det kan gemmes i json. 
    fs.writeFileSync("model/storage.JSON", JSON.stringify(storage, null, 2));
    // til sidst sendes svaret tilbage til httprequest, og vi har nu opdateret storagefilen, med den nye bruger. 
    res.send(JSON.stringify({besked: 'Her oprettes en bruger, her er hans oplysninger:', storage}));
})


// Dette get request gør som sådan ikke rigtig noget, men jeg har ladet den stå dobbelttjekke om serveren virker og om den kan fange de forskellige endpoints. 
app.get('/signIn', (req, res)=> {
    let data = 'Get request signin virker'
    let dataAsString = JSON.stringify(data);
    res.send(dataAsString);
})


// Dette post request bruges til at logge ind. Vi får data fra httprequested i form af input felternes værdi.
// Dette sammenlignes så med de brugere som er oprettet i systemet gennem det nedesntående for loop. 
// Hvis brugeren findes i systemet sendes der et svar tilbage med den bruger som prøver at logge ind. 
// Hvis ikke brugeren eksisterer sendes der err: "Failed" tilbage. Dette bearbejdes i http requested, som har en funktion, der ikke tillader login, hvis svaret fra serveren er failed. 
app.post('/signIn', (req, res)=> {
    let loginData = req.body;
    var createdUser = JSON.parse(fs.readFileSync("model/storage.JSON"))

    console.log(loginData)
    
    for (let i = 0; i < createdUser.length; i++) {
        if (loginData.username === createdUser[i].username && loginData.password === createdUser[i].password) {

            return res.json(createdUser[i]);

            //CurrentUser skal vise brugeroplysningerne på den bruger, som logger ind
            //localStorage.setItem('currentUser', JSON.stringify(createdUser[i]));
            //location.href = "userProfile.html";
            
            // hvis brugeroplysningerne er korrekte returneres at brugeren er inde
            // return true;
        }

    }
    res.json({err:"Failed"});
})

// GET request som henter dataen fra storage.JSON. 
// det bruges til at vise alle brugere i systemet på siden hvor man kan like ller dislike personer. 
app.get('/allUsers', (req, res)=> {
    var allMatches = JSON.parse(fs.readFileSync("model/storage.JSON"))
    res.json(allMatches)
})

// Dette post request er det som ligger på server siden af vores like funktion. 
// Når en bruger liker en anden bruger, sendes et objekt ind i likes.json, som indeholder username på den bruger der er logget ind, samt username på den bruger der bliver liket. 
app.post('/interMatch', (req, res)=> {
    let interMatchData = req.body;
    let likesArray = JSON.parse(fs.readFileSync("model/likes.JSON"))
    likesArray.push(interMatchData)
    fs.writeFileSync("model/likes.JSON", JSON.stringify(likesArray, null, 2));
    res.send(JSON.stringify({besked: 'Vi sender vores egen bruger + liked bruger til JSON', likesArray}));
})

// Post request som sender dislikes ind i en dislike.json fil. Dette benyttes ikke rigtig, da der er lagt fokus på likes og match funktionerne i appen. 
// For at optimere systemet kunne man lave en funktion der gjorde, at når man har disliket en person, ville personen forsvinde fra "possible matches" siden. 
app.post('/interMatchDis', (req, res)=> {
    let interMatchDataDis = req.body;
    let disLikesArray = JSON.parse(fs.readFileSync("model/disLike.JSON"))
    disLikesArray.push(interMatchDataDis)
    fs.writeFileSync("model/disLike.JSON", JSON.stringify(disLikesArray, null, 2));
    res.send(JSON.stringify({besked: 'Vi sender vores egen bruger + disliked bruger til JSON', disLikesArray}));
})

// Her laves et get request som finder al data fra likes.JSON, denne data bearbejdes i frontend, hvor selve matchfunktionen kører. 
// Matchfunktionen sammenligner hvorvidt en person har liket en anden og omvendt. Hvis begge har liket hinanden matcher de. 
app.get('/findMatch', (req, res)=> {
    var allLikes = JSON.parse(fs.readFileSync("model/likes.JSON"))
    res.json(allLikes)
})

// fungerer ikke pt, da man i dette system ikke kan slette sine matches endnu.
app.get('/deleteMatch', (req, res)=> {
    var allLikes = JSON.parse(fs.readFileSync("model/likes.JSON"))
    res.json(allLikes)
})

// Tanker omkring delete request. 
// Delete request virker ikke. Vi skal muligvis bruge et put request, da vi skal tage dataen fra JSON, loope igennem det, og slette noget bestemt data, for at sende dette tilbage til JSON. 
// En anden mulighed kunne være at lave et delete request som sletter det hele, og efterfølgende et post request der displayer matches, nu uden den person som brugeren har fjernet. 
// prøv evt at arbejde med det her i en ny github branch (developer branch evt), for at vise at du har styr på github branches. 

/*
// Forsøg på delete request, til at opdatere hvilke personer currentuser har liket, i JSON filen. virker ikke pt. 
app.delete('/deleteUser', (req, res)=> {
    let removeThisPerson = req.body;
    let userProfilesArray = JSON.parse(fs.readFileSync("model/storage.JSON"))
    console.log(removeThisPerson, "hej") 
    console.log(userProfilesArray, "nej")

    for (i = 0; i < userProfilesArray.length; i++){
        if (removeThisPerson.username === userProfilesArray[i].username){
            console.log("hej")
            userProfilesArray.splice(i,1);
        }
    }
    fs.writeFileSync("model/likes.JSON", JSON.stringify(userProfilesArray, null, 2));
    res.send(JSON.stringify({userProfilesArray}));
})
*/


/* 
// forsøg på at opdatere en bruger fra editProfile siden. Virker ikke pt
app.post('/editProfile', (req, res) => {
    var userToEdit = req.body;
    console.log(userToEdit)

    let data = JSON.parse(fs.readFileSync("model/storage.JSON"))
    let dataAsString = JSON.stringify(data);

    // Dette skal sandsynligvis være i apien istedet for. 
    for (i = 0; i < data.length; i++){
        for (j = 0; j < data.length; j++){
          if (userToEdit.username === data[i].username){
            // når useren der skal ændres er lig med en user i storage.JSON, skal den ændre informationen. 
            (data.splice(i,1)); // Burde fjerne personen fra storage
            // Her skal laves en funktion til at oprette en ny bruger i storage.
            // Skal det være 2 endpoints?? 1 som får tilsendt de "gamle data" om currentUser, og 1 som sender den nye data
            // umiddelbart kan det ikke lade sig gøre, da jeg kører med username som "ID". Derfor SKAL username være det samme, før man kan redigere dataen. 
            // Kan dette gøres med et update request??
            console.log("den skal sende dataen fra localstorage til serveren. Serveren skal opdatere den og sende den tilbage")
          } else {
            console.log("nope")
            //alert ("User doesn't exist, or user is not signed in.") // den alerter det aaalt for mange gange. 
          }
          
        }

    }


    res.send(dataAsString);

    /*let interMatchDataDis = req.body;
    let disLikesArray = JSON.parse(fs.readFileSync("disLike.JSON"))
    disLikesArray.push(interMatchDataDis)
    fs.writeFileSync("disLike.JSON", JSON.stringify(disLikesArray, null, 2));
    res.send(JSON.stringify({besked: 'Vi sender vores egen bruger + disliked bruger til JSON', disLikesArray}));
    
})
*/

// fjern match:
// Overvej at lave et endpoint som sørger for at "currentuser", ligger i en JSON fil og bliver overwrited hver gang en ny bruger logger ind. 
// På den måde kan man loope igennen likes.JSON, og sammenligne med om det passer med at (likes.json).likedPerson = (Den bruger der skal fjernes(dette sendes fra httpreq))
// Når de er lig hinanden skal dette likes fjernes fra likes.JSON, med .splice(i, 1), og vi laver nu en fs.writefile, nu uden det like der er fjernet 


// forsøg på delete request
// virker ikke pt
app.delete('/deleteUser', (req, res)=> {
    
    let userArray = JSON.parse(fs.readFileSync("storage.JSON"))
    let newUsers = userArray.filter(user=> user.username !== req.body.username);
    fs.writeFileSync("storage.JSON", JSON.stringify(newUsers, null, 2));
    res.send(JSON.stringify({besked: 'Vi sender det nye userarray tilbage', newUsers}));

})


app.listen(port, console.log(port));

