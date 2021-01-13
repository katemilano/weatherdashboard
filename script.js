
var APIKey = "f7ea35904ff1a410ebfcbeb0592c0992"
var queryURL = "https://api.openweathermap.org/data/2.5/weather?"

function newCity(){
    var city = $("#city").val();
    var button = $("button").text(city);
    // var search = $("#search").val("");
    $("#search").append(button);
    citySearch();

}


function citySearch(){
    var city = $("#city").val();
    var cityFormatted = city.replaceAll(" ", "").toLowerCase();
    //5 day forecast
    var queryURL5day = queryURL + "q=" + cityFormatted + "&appid=" + APIKey;
    $.ajax({
        url: queryURL5day,
        method: "GET"
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {
          tempConvert = response.main.temp * 9/5 - 459.67
          tempF = parseInt(tempConvert);
          // Transfer content to HTML
          var h3 = $("h3").text(response.name);
          $(".temp").text("Temperature: " + tempF +" F");
          $(".humidity").text("Humidity: " + response.main.humidity + " %");
          $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");

          localStorage.setItem("lon", response.coord.lon);
          localStorage.setItem("lat", response.coord.lat);

          var queryURLIcon = "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png";
          var icon = $("<img>");
          icon.attr("src", queryURLIcon);
          $(h3).append(icon);

        });
       
    // UV INDEX
    var storedLon = localStorage.getItem("lon");
    var storedLat = localStorage.getItem("lat");
    var queryURLUV = "http://api.openweathermap.org/data/2.5/uvi?lat=" + storedLat + "&lon=" + storedLon + "&appid=" + APIKey; 
    $.ajax({
        url: queryURLUV,
        method: "GET"
      })
        .then(function(response) {

          $(".uv").text("UV Index: " + response.value);

        });
        // http://openweathermap.org/img/wn/10d@2x.png
        var queryURLIcon = "http://openweathermap.org/img/wn/10d@2x.png";
        var icon = $("<img>");
        icon.attr("src", queryURLIcon);
        $("h3").append(icon);

    //5-DAY Forecast

}

$("span").click(newCity);