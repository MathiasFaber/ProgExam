// lav om til like button

let cp = document.getElementById('create');
let username = document.getElementById('username');
let phone = document.getElementById('phone');
//let textonpage = document.getElementById('text');



// Ved at sætte noget ind i input feltet på html siden, og trykke submit, gemmes dataen i en JSON fil. 
cp.addEventListener('click', ()=> {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json"

    // Variabler som henter alle inputfelternes id, så vi kan arbejde med de inputs brugeren giver os.
    const username = document.getElementById('username');
    const phone = document.getElementById('phone');
    const city = document.getElementById('city');
    const zip = document.getElementById('zip');
    const address = document.getElementById('address');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

/*
    var values = [];
    // Her pushes dataen som brugeren har indtastet ind i et array, sammen med den tilhørende key (fx username)
    values.push({
        "username" : name.value, 
        "phone" : phone.value,
        "city" : city.value,
        "zip" : zip.value,
        "address" : address.value,
        "email" : email.value,
        "password" : password.value
    });
    */
    var data = {
        username : username.value, 
        phone : phone.value,
        city : city.value,
        zip : zip.value,
        address : address.value,
        email : email.value,
        password : password.value,
    }
/*
    var users = [];
    users.push(data)
*/
    /*
    values.push({"phone" : phone.value});
    values.push({"city" : city.value});
    values.push({"zip" : zip.value});
    values.push({"address" : address.value});
    values.push({"email" : email.value});
    values.push({"password" : password.value});
    */

     
    //console.log(users); //Tjekker hvorvidt vi har fået noget input fra brugeren

    // idk den tjekker vel for om siden er klar, og sender en fejl hvis den ikk er
    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        const respo = this.response 
        console.log(respo); //Til at se, om request kommer tilbage
    }
    });

    // "Åbner" vores http request og angiver at det er POST request fra serveren på localhost:3000
    xhr.open("POST", "http://localhost:2500/", true);

    // definerer at det er en JSON-fil der skal arbejdes med
    xhr.setRequestHeader("Content-Type", "application/json");

    // Sender http requested afsted. Den sender altså den data som er indtastet af brugeren, til vores server (localhost). 
    xhr.send(JSON.stringify(data));
})
