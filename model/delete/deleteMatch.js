// Lav en eventlistener på delete knappen i mymatches.html
var delete123 = document.getElementById('Mathias')
console.log(delete123)

delete123.addEventListener('click', function() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json"
 
    xhr.addEventListener("readystatechange", function() {
       if(this.readyState === 4) {
          var deleteMatch = this.response;
          //console.log(deleteMatch)

        }
    })
    xhr.open("DELETE", "http://localhost:2500/deleteMatch", true);
        
    // definerer at det er en JSON-fil der skal arbejdes med
    xhr.setRequestHeader("Content-Type", "application/json");
        
    // Sender http requested afsted. Den sender altså den data som er indtastet af brugeren, til vores server (localhost). 
    xhr.send();
})