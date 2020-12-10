// Store dele af validation og signUp er lavet i samarbejde med min studiegruppe. 

// Her lavess klassen user, som er den der bruges hver gang en profil opretter sig. 
class User {
    constructor(username, password, phone, city, zip, address, email, gender){
        this.username = username;
        this.password = password;
        this.phone = phone;
        this.city = city;
        this.zip = zip;
        this.address = address;
        this.email = email;
        this.gender = gender;
        // this.id = id; Her overvejede jeg at lave en funktion, som ville generere et vilkårligt id nummer til hver bruger der oprettede sig. 
        // Denne ide kom jeg fra igen, og besluttede mig for at usernamet blot skal være unikt, for at en bruger kan oprette sig i systemet. 
    }
}

// Her henter jeg brugerne fra localstorage
if(localStorage.getItem("User") === null) {
    var usersList = [];

    // Her har jeg hardcodet en bruger til at ligge i localstorage. Det er gjort for at sikre at min funktion virker. 
    // Hvis ikke der ligger nogle brugere i "users" i localstorage, kan vi ikke hente denne localstorage key, da den ikke eksisterer. 
    usersList.push(new User("test", "code123", "12345678", "Greve", "2670", "Hej vej 123", "mail@mail.dk"))
   
    // det array jeg lige har pushet den hardcodede bruger ind i, gøres herunder til en string så den kan sendes til localstorage igen.
    var userListString = JSON.stringify(usersList);
    localStorage.setItem("User", userListString)
}

// herefter valideres samtlige felter ved oprettelse af en ny bruger 

// Denne del af opgaven er lavet sammen med studiegruppen, og er derfor tilnærmelsesvis ens i vores opgaver. 

//fejl og errors defineres
function printError(elemID, hintMsg) {
    document.getElementById(elemID).innerHTML = hintMsg;
}

// Her starter funktionen der validerer brugerens input, når han/hun opretter en profil. 
// Til en start hentes det som er skrevet i inputfelterne. 
function validateForm(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var phone = document.getElementById("phone").value;
    var city = document.getElementById("city").value;
    var zip = document.getElementById("zip").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;


    // Herefter tillægges alle ovenstående variable en error med en standard værdi 
    // I alle valideringerne herunder, ændres denne status fra true til false, hvis kravene ikke opfyldes, eller status forbliver true, hvis kravene er opfyldt. 
    var usernameErr = true;
    var passwordErr = true;
    var phoneErr = true;
    var cityErr = true;
    var zipErr = true;
    var addressErr = true;
    var emailErr = true;

    // Her valideres brugernavnet. 
    if (username ==""){
        printError("usernameErr", "Type in a unique username");
    }
    // Her bruges regex til at validere, hvorvidt brugernavnet indeholder store og små bogstaver, fra A - Z i alfabetet. 
    // Dette understøtter ikke det danske alfabet, så man kan ikke oprette en bruger i datingappen, som har et brugernavn der indeholder æ, ø eller å.
    // kilde: https://stackoverflow.com/questions/9628879/javascript-regex-username-validation
        else {
            var regex = /^[a-zA-Z\s]+$/;
    //hvilke situationer der skal printes en errormessage defineres
            if (regex.test(username) === false){
                printError("usernameErr", "Please enter a unique username using the standard alphabet");
            } else {
                printError("usernameErr", "");
                usernameErr = false;
            }
        }
    // Her valideres emailen
    if (email =="") {
        printError("emailErr", "please enter an existing email-address")
    }
    // Definerer hvilke tegn email skal indeholde
    else{
        var regexMail = /^\S+@\S+\.\S+$/;
        if (regexMail.test(email) === false) {
            printError("emailErr", "Please enter a valid email")
        }else {
            printError("emailErr", "");
            emailErr = false;
        }
    }

// Validering af telefon nummer (skal indeholde 8 tal, mellem 0 og 9)
    if (phone ==""){
        print("phoneErr", "please enter your phone number");
    } else {
        //regex fra stackoverflow: https://stackoverflow.com/questions/37114166/regex-for-8-digit-phone-number-singapore-number-length
        var regexPhone = /^[0-9]{8}$/;
        if (regexPhone.test(phone)===false){
            printError("phoneErr", "please enter a validt phone number - hint it has to be 8 digits")
        } else {
            printError("phoneErr", "");
            phoneErr = false;
        }
    }

    //validering af by (Kan indeholde store og små bogstaver, men ingen tal.)
    if (city ==""){
        print("cityErr", "please enter a city");
    } else {
        //samme regex fra username - fra stackoverflow
        var regexCity = /^[a-zA-Z\s]+$/;
        if(regexCity.test(city) === false) {
            printError("cityErr", "Cityname can only contain letters from A-Z");
        }else {
            printError("cityErr", "");
            cityErr = false;
        }
    }

    // Validating af postnummer, må maks være 4 cifre langt, da datingappen skal fungere i Danmark. 
    if (zip==""){
        print("zipErr", "please enter a valid ZIP-code");
    } else {
        // Her har jeg brugt den samme validering, som til phonenumber, men har dog ændret det fra 8 cifre til 4 cifre. 
        var regexZip = /^[0-9]{4}$/;
        if (regexZip.test(zip) === false) {
        printError("zipErr","Please enter a valid ZIP-Code, it should be exactly 4-digits") ;
        }
        else {
            printError("zipErr", "");
            zipErr = false;
        }
    }

    // Her valideres adressen - regex fra stackoverflow
    //https://stackoverflow.com/questions/3763820/javascript-regular-expression-to-validate-an-address
    if (address==""){
        print("adressErr", "please enter an address"); 
    } else {
        var regexAddress = /^[a-zA-Z0-9\s,.'-]{3,}$/;
        if (regexAddress.test(address) === false) {
            printError("addressErr", "Please type in a valid address");
        } else {
            printError("addressErr", "");
            addressErr = false;
        }
    }

    // Her valideres password 
    if (password==""){
        printError("passwordErr", "Please type a password");
    }else {
        //regex fra stackoverflow. Her bruges samme som til adresse validering.
        var regexPassword = /^[a-zA-Z0-9\s,.'-]{3,}$/;
        if (regexPassword.test(password)===false){
            printError("passwordErr", "please enter a secure password");
        }else {
            printError("passwordErr", "");
            passwordErr = false;
        }
    }

    // Hvis der er fejl i nogle af valideringerne skal den ikke fortsætte med at eksekvere koden. og den skal ikke sende noget data til json.
    if ((usernameErr || phoneErr || cityErr || zipErr || addressErr || emailErr || passwordErr) == true){
        return false;
    } else {
        // Hvis valideringen er gennmført uden fejl, printes en kvittering på de oplysninger man har indtastet som bruger. 
        var detailsPreview = "You have entered the following details: \n" +
        "Username: " + username + "\n" + 
        "Email: " + email + "\n" + 
        "Phone numer: " + phone + "\n" + 
        "City: " + city + "\n" + 
        "ZIP-code: " + zip+ "\n" + 
        "Address: " + address + "\n" + 
        "username: " + username + "\n" + 
        "Password" ; 


        
    // Derefter sendes den oprettede bruger ind i localstorage key'en "user"
    var createdUser = JSON.parse(localStorage.getItem("User"));
    console.log(createdUser);

    //pusher den nye bruger ind i et array 
    createdUser.push(new User (username, password, phone, city, zip, address, email));
    console.log(createdUser);

    // Den nye bruger laves til en string så den kan gemmes i localstorage. 
    var newUserAdd = JSON.stringify(createdUser);
    // Her tilføjes han/hun til local storage
    localStorage.setItem("User", newUserAdd);
    // Alerten herunder giver brugeren besked om de oplysninger han/hun har oprettet sin bruger med. (dem som laves fra linje 169 til 177)
    alert(detailsPreview);
    alert('New User has been created');

    // Funktionen der sender den nye brugers data til serveren og lagre det i en JSON-fil, bliver kaldt her. Funktionen findes i samme dokument, på linje 206.
    sendDataToJSON()

    // Når brugeren har oprettet sig, og dataen er sendt til serveren, sendes brugeren til login siden. 
    window.location = ("signIn.html");

    }
}


// Når valideringen er fuldført og lever op til kravene kører følgende funktion, som sender brugerens data til storage.JSON. 
function sendDataToJSON () {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json"

    // Laver variabler for alle de inputs der tastes ind ved oprettelse, så jeg kan arbejde med disse values.
    const username = document.getElementById('username');
    const phone = document.getElementById('phone');
    const city = document.getElementById('city');
    const zip = document.getElementById('zip');
    const address = document.getElementById('address');
    const email = document.getElementById('email');
    const password = document.getElementById('password');


    // Her laves de indtastede data om til et objekt. 
    // Dvs. at hvert input felt også får en key. Så når du skriver du hedder Jens, vil der stå "username" : "Jens", i objektet. 
    var data = {
        username : username.value, 
        phone : phone.value,
        city : city.value,
        zip : zip.value,
        address : address.value,
        email : email.value,
        password : password.value,
    }

    // Dette er blot en eventlistener, som gør at funktionen kører når "readystatechange" er opfyldt. 
    // readystatechange er opfyldt når siden er klar med svaret fra serveren. 
    xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
        const respo = this.response 
        }
    });

    // "Åbner" vores http request og angiver at det er POST request fra serveren på localhost:2500
    xhr.open("POST", "http://localhost:2500/", true);

    // definerer at det er en JSON-fil der skal arbejdes med
    xhr.setRequestHeader("Content-Type", "application/json");

    // Sender http requested afsted. Den sender altså den data som er indtastet af brugeren, til vores server (localhost). 
    xhr.send(JSON.stringify(data));
}
