function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
    function(m,key,value) {
      vars[key] = value;
    });
    return vars;
  }

var title = getUrlVars()["title"]
title = decodeURIComponent(title)

$(document).ready(function() {
    console.log(title);
});
