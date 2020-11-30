    
    //si.addEventListener('click', ()=> {
        function signIn(){
            const xhr = new XMLHttpRequest();
            xhr.responseType = "json"
        
            //function her
            //SignIn function
                //var createdUser = JSON.parse(localStorage.getItem('User'));
                var username = document.getElementById("username");
                var password = document.getElementById("password");
        
                console.log(username)
                var loginData = {
                    username : username.value,
                    password : password.value,
                }
        
            xhr.addEventListener("readystatechange", function() {
                if(this.readyState === 4) {
                    const respo = this.response 
                    console.log(respo)
                    if (respo.err !== 'Failed'){
                        // alert success
                        // gem noget i localstorage??
                        localStorage.setItem('currentUser', JSON.stringify(respo));
        
        
                        window.location.href = ("../view/userProfile.html")
                        
                    }
                    console.log(respo); //Til at se, om request kommer tilbage
                }

             })
            // "Åbner" vores http request og angiver at det er POST request fra serveren på localhost:3000
            console.log('her')
            xhr.open("POST", "http://localhost:2500/signIn", true);
        
            // definerer at det er en JSON-fil der skal arbejdes med
            xhr.setRequestHeader("Content-Type", "application/json");
        
            // Sender http requested afsted. Den sender altså den data som er indtastet af brugeren, til vores server (localhost). 
            xhr.send(JSON.stringify(loginData));
    
        }
    