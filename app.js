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

var contributorName = "John Doe"; //Hard coding this for now

var usersDatabase = database.ref().child("/research-examples/"); //Querying this table

var mySubmissions = usersDatabase.orderByChild("contributor-name").equalTo(contributorName); //only taking the papers made by this contributor

submissionTitles = [];

function fillSubmissions(){
    //Function to fill submissionTitles array full of all the papers written by this contribtor
    mySubmissions.on('value', function(snapshot) {
        snapshot.forEach(function(item) {
            var itemVal = item.val().content.title;
            submissionTitles.push(itemVal);
            console.log(submissionTitles[0])
        });
    });
}

// function fillSubmissions(){
//     $(mySubmissions).each(function(){
//         var entry = $(this);
//         var content = entry.child("content");
//         content.on('value', function(snapshot) {
//             console.log(snapshot.val().title)
//             submissionTitles.push(snapshot.val().title);
//             // $("#sub").html(snapshot.val().title);
//         });
//     });
// }

//Filling the user display
$(document).ready(function() {
    fillSubmissions();
    setTimeout(function() {
        console.log(submissionTitles[0])
        $("#sub").html(submissionTitles[0])
        $("#user").html(contributorName);
    }, 1000); //Time out because asynchronous
});
