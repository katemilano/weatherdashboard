var APIKey = "f7ea35904ff1a410ebfcbeb0592c0992"
var queryURL = "https://api.openweathermap.org/data/2.5/weather?"

function start(){
$(".weatherpanel").hide();
$("#5daytitle").hide();
$("#forecast").hide();
}

function newCity(){
    var city = $("#city").val();
    var button = $("button").text(city);
    // var search = $("#search").val("");
    $("#search").append(button);
    citySearch();
}

function citySearch(){
    $(".weatherpanel").show();
    $("#5daytitle").show();
    $("#forecast").show();
    var city = $("#city").val();
    var cityFormatted = city.replaceAll(" ", "").toLowerCase();
    //5 day forecast
    var queryURL5day = queryURL + "q=" + cityFormatted + "&appid=" + APIKey;
    $.ajax({
        url: queryURL5day,
        method: "GET"
    })
        .then(function(response) {
          tempConvert = response.main.temp * 9/5 - 459.67
          tempF = parseInt(tempConvert);

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
       
        var queryURLIcon = "http://openweathermap.org/img/wn/10d@2x.png";
        var icon = $("<img>");
        icon.attr("src", queryURLIcon);
        $("h3").append(icon);

    //5-DAY Forecast
    var queryURL5 = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityFormatted+ "&appid=" + APIKey; 
    $.ajax({
        url: queryURL5,
        method: "GET"
    })
        .then(function(response) {
            console.log(response);
        // var date = 
        var j = 0;
            $('.box').each(function(i, obj) {

                j = 6 + (i*8);
                // extracting the date
                var date1 = response.list[j].dt_txt;
                console.log(date1);
                var dateM = date1.substring(5, 7);
                var dateD = date1.substring(8, 10);
                var dateY = date1.substring(0,4);
                var dateI = $(obj).children('p')[0];
                $(dateI).text(dateM + "/" + dateD+ "/" + dateY);

                // weather icons
                var icon1 = response.list[j].weather[0].icon;
                var queryURLIcon = "http://openweathermap.org/img/wn/" + icon1 + "@2x.png";
                var icon = $("<img>");
                icon.attr("src", queryURLIcon);
                $(dateI).append(icon);

                // temp
                var temp1 = response.list[j].main.temp_max * 9/5 - 459.67;
                var temp1Convert = parseInt(temp1);
                var tempI = $(obj).children('p')[1];
                $(tempI).text("Temp: " + temp1Convert + " F");

                //Humidity
                var hum1 = response.list[j].main.humidity;
                var humI = $(obj).children('p')[2];
                $(humI).text("Humidity: " + hum1 + "%");
        
            }); 
        })
    var searchB = $("span");
    var buttonN = $("button").val(city);
    $(searchB).append(buttonN);


    $("#city").val("");
}

start();
$("span").click(newCity);