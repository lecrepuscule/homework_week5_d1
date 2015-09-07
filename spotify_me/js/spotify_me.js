$(document).ready(function(){
  
  var submitButton = $("#submit-button");
  var searchString = $("#search-string");
  var searchType = $("#search-type");
  var results = $(".results");

  submitButton.on("click", search);

  function search(e){
    e.preventDefault();
    var searchString = $("#search-string").val();
    var searchType = $("#search-type").val();
    resultType = searchType + "s";

    var url = "https://api.spotify.com/v1/search?q="+ searchString + "&type=" + searchType;

    $.get(url, function(response){
      results.empty();
      $.each(response[resultType].items, function(index, resultType){
        var result = $("<div class='results'>" + resultType.name + "</div>");
        results.append(result);
      })
    })
  }

})