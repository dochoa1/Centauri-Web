// Initialize Firebase
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

var mySubmissions = usersDatabase.orderByChild("contributor-name").equalTo(contributorName); //only taking the papers made by this contributor

submissions = []; //Array to hold the information for all the pages the user has submitted

function fillSubmissions(){
    //Function to fill submissionTitles array full of all the papers written by this contribtor
    mySubmissions.on('value', function(snapshot) {
        snapshot.forEach(function(item) {
            //Iterate over all submissions by this author
            var title = item.val().content.title;
            var likes = item.val()['num-saves']
            var dislikes = item.val()['num-ignores']
            submissions.push({ //pushing an object of title, likes, and dislikes to array
                title: title,
                numLikes: likes,
                numIgnores: dislikes
            });
            console.log(submissions[0].title)
        });
    });
}

//Filling the user display
$(document).ready(function() {
    fillSubmissions();
    setTimeout(function() {
        console.log(submissions[0].title)
        var numSubmissions = submissions.length;
        for (var i = 0; i < numSubmissions; i++){ //Over all submissions add them to a table
            $("#submissionTable").find('tbody')
                .append($('<tr>')
                    .append($('<td>')
                        .text(submissions[i].title)
                    )
                    .append($('<td>')
                        .text(submissions[i].numLikes)
                    )
                    .append($('<td>')
                        .text(submissions[i].numIgnores)
                    )
                )
        }
        $("#user").html(contributorName);  //Setting the users name
        $('#profile').html("Hello, " + contributorName);
    }, 2000); //Time out because asynchronous
});
