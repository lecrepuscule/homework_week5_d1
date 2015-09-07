$(document).ready(function(){
  
  var submitButton = $("#submit-button");
  var searchString = $("#search-string");
  var searchType = $("#search-type");
  var results = $(".results");

  submitButton.on("click", search);

  function search(e){
    e.preventDefault();
    var url = "https://api.spotify.com/v1/search?q="+ searchString.val() + "&type=" + searchType.val();
    $.get(url, function(response){
      console.log(response);
      $.each(response.artists.items, function(index, artist){
        var result = $("<div class='results'>" + artist.name + "</div>");
        results.append(result);
        console.log(artist.name);
      })
    })
  }

})