// Denne del er udarbejdet på egen hånd

var LogOutBtn = document.getElementById("logOutBtn");

// Ved tryk på "Log ud" knappen, bliver brugeren fjernet fra current user, og redirected til login siden. 
// Localstorage-key "currentUser" bliver fjernet og man kan dermed ikke tilgå siderne: mymatches, myprofile og matches
LogOutBtn.addEventListener("click", function(){
    localStorage.removeItem("currentUser");
    localStorage.removeItem("founduser");
    localStorage.removeItem("likes");

    window.location.replace("../view/signIn.html")
})