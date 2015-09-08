$(document).ready(function(){
  
  var submitButton = $("#submit-button");
  var searchString = $("#search-string");
  var searchType = $("#search-type");

  submitButton.on("click", search);
  $("body").on("click", ".result", search);

  function search(e){
    e.preventDefault();

    if (e.target === submitButton[0]){
      var searchString = $("#search-string").val();
      var searchType = $("#search-type").val();
    } else {
      var searchString = e.target.innerHTML;
      var searchType = "track";
    }

    var results = searchType + "s";


    var url = "https://api.spotify.com/v1/search?q="+ searchString + "&type=" + searchType;

    var jqxhr = $.get(url, function(response){
      render (response, results);
    })

    // $.ajax({
    //   url: url,
    //   beforeSend: function(xhr){
    //     xhr.setRequestHeader("Authorization","Bearer BQA7Qs_XAMnpqs21aWSC-DMXg5RZf629QiiE8cYtmkLY7nOvG3NlVvPHOo41Zw39sJXkSsHFqjrEH017hY1X9STsud19GWRin-fqm8nHxEwGbE3bTObpE7d-ZrW0cMdraRQ48lRaX4cwUkk");
    //   },
    //   success: function(response){
    //     console.log(response);
    //     resultsDisplay.empty();
    //     audioResults.empty();
    //     $.each(response[results].items, function(index, resultType){
    //       var result = $("<div class='results'>" + resultType.name + "</div>");
    //       resultsDisplay.append(result);
    //       if (resultType.type === "track") {
    //         var track = $("<audio src='" + resultType.preview_url + "' preload='auto' controls>" +resultType.name + "</audio>");
    //         audioResults.append(track);
    //       }
    //     })
    //   }
    // });    
  }

  function render (response, results){
    var resultsDisplay = $(".results-display");
    resultsDisplay.empty();

    $.each(response[results].items, function(index, resultType){

      var result = $("<div class='result'><a href=''>" + resultType.name + "</a></div>");

      var artImage = ((resultType.type === "track") ? resultType.album.images[0].url : resultType.images[0].url);

      var artwork = $("<img class='artwork' src='" + artImage + "'>");
      resultsDisplay.append(result);
      resultsDisplay.append(artwork);

      if (resultType.type === "track") {
        var track = $("<audio src='" + resultType.preview_url + "' preload='auto' controls>" +resultType.name + "</audio>");
        resultsDisplay.append(track);
      }      
    })
  }

})