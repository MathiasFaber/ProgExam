// dette er et udkast, fra en server der fungerer
const express = require('express');
const app = express();
//const bodyParser = require('body-parser');
const cors = require('cors'); // Hvad bruges cors til? 
const bodyParser = require('body-parser');
const port = 2500;
var fs = require('fs');

app.use(cors());
app.use(bodyParser.json()); //finder kun json data

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
})


app.get('/', (req, res)=> {
    let data = 'Get request virker'
    let dataAsString = JSON.stringify(data);
    res.send(dataAsString);
})

// Ved at sætte noget ind i input feltet på html siden, og trykke submit, gemmes dataen i en JSON fil. 
app.post('/', (req, res)=> {
    let reqData = req.body;
    console.log('Post request virker')
    console.log(reqData)
    var storage = JSON.parse(fs.readFileSync("storage.JSON"))
    storage.push(reqData);
    fs.writeFileSync("storage.JSON", JSON.stringify(storage, null, 2));

    //console.log(reqData);
    res.send(JSON.stringify({besked: 'Her oprettes en bruger, her er hans oplysninger:', storage}));
})



app.get('/signIn', (req, res)=> {
    let data = 'Get request signin virker'
    let dataAsString = JSON.stringify(data);
    res.send(dataAsString);
})

app.post('/signIn', (req, res)=> {
    let loginData = req.body;
    var createdUser = JSON.parse(fs.readFileSync("storage.JSON"))

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


app.get('/matches', (req, res)=> {
    var allMatches = JSON.parse(fs.readFileSync("storage.JSON"))
    res.json(allMatches)
})

// like knap: tag data fra localstorage (founduser), og send dette til en likes.json fil. 
app.post('/interMatch', (req, res)=> {
    let interMatchData = req.body;
    let likesArray = JSON.parse(fs.readFileSync("likes.JSON"))
    likesArray.push(interMatchData)
    console.log(likesArray, "hej")
    fs.writeFileSync("likes.JSON", JSON.stringify(likesArray, null, 2));
    res.send(JSON.stringify({besked: 'Vi sender vores egen bruger + liked bruger til JSON', likesArray}));
    /*
    var likeAlreadyMade = false; 
    for (i = 0; i < likesArray; i++){
        for (j = 0; j < interMatchData; j++){
            if (likesArray[i].username === interMatchData[j].username && likesArray[i].likedUser === interMatchData[j].likedUser){
                //res.send("Failed")
                likeAlreadyMade = true;
                console.log(likeAlreadyMade)
                break
            } 
            if (likeAlreadyMade===false) {
                likesArray.push(interMatchData)
                fs.writeFileSync("likes.JSON", JSON.stringify(likesArray, null, 2));
                console.log(interMatchData)
            }
        }
    }
    //fs.writeFileSync("likes.JSON", JSON.stringify(likesArray, null, 2));
    res.send(JSON.stringify({besked: 'Vi sender vores egen bruger + liked bruger til JSON', likesArray}));
*/

    //console.log(createdUser)
    /*
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
*/
})

app.post('/interMatchDis', (req, res)=> {
    let interMatchDataDis = req.body;
    let disLikesArray = JSON.parse(fs.readFileSync("disLike.JSON"))
    disLikesArray.push(interMatchDataDis)
    fs.writeFileSync("disLike.JSON", JSON.stringify(disLikesArray, null, 2));
    res.send(JSON.stringify({besked: 'Vi sender vores egen bruger + disliked bruger til JSON', disLikesArray}));
})

app.get('/findMatch', (req, res)=> {
    var allLikes = JSON.parse(fs.readFileSync("likes.JSON"))
    res.json(allLikes)
})

app.get('/deleteMatch', (req, res)=> {
    var allLikes = JSON.parse(fs.readFileSync("likes.JSON"))
    res.json(allLikes)
})

// Delete request virker ikke. Vi skal muligvis bruge et put request, da vi skal tage dataen fra JSON, loope igennem det, og slette noget bestemt data, for at sende dette tilbage til JSON. 
// En anden mulighed kunne være at lave et delete request som sletter det hele, og efterfølgende et post request der displayer matches, nu uden den person som brugeren har fjernet. 
// prøv evt at arbejde med det her i en ny github branch (developer branch evt), for at vise at du har styr på github branches. 
// d
/*
app.delete('/deleteMatch', (req, res) => {
    var deleteMatch = JSON.parse(fs.readFileSync("likes.JSON"))
    res.json(deleteMatch)
})
*/

// Forsøg på put eller post request, til at opdatere hvilke personer currentuser har liket, i JSON filen.
app.delete('/deleteUser', (req, res)=> {
    let removeThisPerson = req.body;
    let userProfilesArray = JSON.parse(fs.readFileSync("storage.JSON"))
    console.log(removeThisPerson, "hej") 
    console.log(userProfilesArray, "nej")

    for (i = 0; i < userProfilesArray.length; i++){
        if (removeThisPerson.username === userProfilesArray[i].username){
            console.log("hej")
            userProfilesArray.splice(i,1);
        }
    }
    fs.writeFileSync("likes.JSON", JSON.stringify(userProfilesArray, null, 2));
    res.send(JSON.stringify({userProfilesArray}));
})

app.post('/editProfile', (req, res) => {
    var userToEdit = req.body;
    console.log(userToEdit)

    let data = JSON.parse(fs.readFileSync("storage.JSON"))
    let dataAsString = JSON.stringify(data);

    // Dette skal sandsynligvis være i apien istedet for. 
    for (i = 0; i < data.length; i++){
        for (j = 0; j < data.length; j++){
          if (userToEdit.username === data[i].username){
            // når useren der skal ændres er lig med en user i storage.JSON, skal den ændre informationen. 
            /*fs.writeFile*/(data.splice(i,1)); // Burde fjerne personen fra storage
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
    */

})


app.listen(port, console.log(port));

