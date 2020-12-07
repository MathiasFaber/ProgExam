
// Denne funktion bliver kaldt når en bruger logger ind. 
function signIn(){
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json"

    // jeg laver et httprequest, som skal sende nogle data til serveren OG få et svar. 

    // Her hentes inputfelterne som brugeren skriver sine oplysninger ind i ved login. 
    var username = document.getElementById("username");
    var password = document.getElementById("password");

    // Her hentes det som brugeren har skrevet i inputfelterne. 
    var loginData = {
        username : username.value,
        password : password.value,
    }

    xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            const respo = this.response 
            console.log(respo)

            // If statementet her viser, at hvis serveren svarer tilbage med at username og password er korrekt, kan funkitonen herunder køre.
            // Hvis ikke, alerter den "Wrong username or password"
            if (respo.err !== 'Failed'){
               
                // Sætter localstorage key'en currentUser til at være den person som er logget ind. Dvs den data som brugeren matcher med i storage.json filen. 
                localStorage.setItem('currentUser', JSON.stringify(respo));

                // Brugeren sendes ind på "my profile" siden, hvis det er et succesfuldt login. 
                window.location.href = ("../view/userProfile.html")
                
            } else {
                alert ("Wrong username or password")
            }
        }
    })

    // Åbner http request og angiver at det er POST request fra serveren på localhost:2500, som den skal finde. 
    xhr.open("POST", "http://localhost:2500/signIn", true);

    // Definerer at det er en JSON-fil der skal arbejdes med
    xhr.setRequestHeader("Content-Type", "application/json");

    // Sender http requested afsted. Den sender altså den data som er indtastet af brugeren, til vores server (localhost). 
    xhr.send(JSON.stringify(loginData));

}






