function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
    function(m,key,value) {
      vars[key] = value;
    });
    return vars;
  }

var id = getUrlVars()["id"]
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
            var tagArray = []
            for (var property in tags) {
                if (tags.hasOwnProperty(property)) {
                    console.log(property)
                    var newchar = ' '
                    property = property.split('_').join(newchar);
                    tagArray.push(property);
                }
            }
            var id = item.val().id;
            submission.push({ //pushing an object of title, likes, and dislikes to array
                title: title,
                numLikes: likes,
                numDislikes: dislikes,
                authorNames: authorNames,
                description: description,
                thumbnail: thumbnail,
                tags: tagArray,
                id: id
            });
        });
    })
}

$(document).ready(function() {
    fillSubmissions();
    setTimeout(function() {
        $("#submissionTitle").html(submission[0].title);

        //Kind of hacked together a way of showing all three images
        $("#thumbnail1").attr("src", submission[0].thumbnail + "1.png")
        $("#thumbnail2").attr("src", submission[0].thumbnail + "2.png")
        $("#thumbnail3").attr("src", submission[0].thumbnail + "3.png")

        //Function to hide the img icons until they are actually loaded
        $("img").each(function() {
            var img = $(this);
            img.on('load', function() {
                $(this).css('visibility','visible');
            });
        });


        $("#authorNames").html(submission[0].authorNames)
        $("#description").html(submission[0].description)
        $("#likes").html(submission[0].numLikes)
        $("#dislikes").html(submission[0].numDislikes)
        $('#profile').html("Hello, " + contributorName);
        var numTags = submission[0].tags.length;
        var container = $('<div />');
        for(var i = 0; i < numTags - 1; i++) {
         container.append('<span>' + submission[0].tags[i] + ',</span>')
        }
        container.append('<span>' + submission[0].tags[numTags - 1] + '</span>')  //Hacky way of making sure that the last tag doesnt have a comma
        $('#tags').html(container);
    }, 2500)
});
