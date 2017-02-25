function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
    function(m,key,value) {
      vars[key] = value;
    });
    return vars;
  }

var id = getUrlVars()["id"]
console.log(id);
id = decodeURIComponent(id)

var config = {
    apiKey: "AIzaSyBb1RY3x7_Nli7jKmp_ZaBURHADroZbFxs",
    authDomain: "centauri-49680.firebaseapp.com",
    databaseURL: "https://centauri-49680.firebaseio.com",
    storageBucket: "centauri-49680.appspot.com",
    messagingSenderId: "407474898577"
};

firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

var contributorName = "Jane Roe"; //Hard coding this for now

var usersDatabase = database.ref().child("/research-examples/"); //Querying this table

var mySubmission = usersDatabase.orderByChild("id").equalTo(id); //Get this paper by it's id

submission = [];

function fillSubmissions(){
    //Function to fill submissionTitles array full of all the papers written by this contribtor
    mySubmission.on('value', function(snapshot) {
        //console.log(snapshot.val());
        snapshot.forEach(function(item) {
        //Iterate over all submissions by this author
            var title = item.val().content.title;
            var likes = item.val()['num-saves']
            var dislikes = item.val()['num-ignores']
            var authorNames = item.val().content['author-names']
            var description = item.val().content['short-description']
            var thumbnail = item.val().content['thumbnail-url']
            var tags = item.val().tags;
            var id = item.val().id;
            console.log(id);
            submission.push({ //pushing an object of title, likes, and dislikes to array
                title: title,
                numLikes: likes,
                numDislikes: dislikes,
                authorNames: authorNames,
                description: description,
                thumbnail: thumbnail,
                tags: tags,
                id: id
            });
            console.log(submission[0].title)
        });
    })
}

$(document).ready(function() {
    console.log("HELLo")
    fillSubmissions();
    setTimeout(function() {
        $("#submissionTitle").html(submission[0].title);
        console.log(submission[0].thumbnail)
        $("#thumbnail").attr("src", submission[0].thumbnail)
        console.log(submission[0].title);
        $("#authorNames").html(submission[0].authorNames)
        $("#description").html(submission[0].description)
        $("#likes").html(submission[0].numLikes)
        $("#dislikes").html(submission[0].numDislikes)
    }, 2000)
});
