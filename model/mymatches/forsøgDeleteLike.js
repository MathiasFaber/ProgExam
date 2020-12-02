// Forsøg på at fjerne en person fra likesarray
function remove(){
    let removeThisPerson = "peter"; // req.body;
    let likesArray = ["jens", "peter", "anders"]; //JSON.parse(fs.readFileSync("likes.JSON"))
    
    for (i = 0; i < likesArray; i++){
        if (removeThisPerson === likesArray[i]){
            console.log("hej")
            likesArray.splice(likesArray[i])
        }
    }
    console.log(likesArray)
}
