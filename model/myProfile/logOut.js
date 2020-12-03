// Denne del er udarbejdet selv

var LogOutBtn = document.getElementById("logOutBtn");

// Ved tryk på "Log ud" knappen, bliver brugeren fjernet fra current user, og redirected til login siden. 
// Localstorage-key "currentUser" bliver fjernet og man kan dermed ikke se 
LogOutBtn.addEventListener("click", function(){
    localStorage.removeItem("currentUser");
    window.location.replace("../view/signIn.html")
})