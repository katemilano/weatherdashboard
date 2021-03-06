////////////// Global Variable
var APIKey = "f7ea35904ff1a410ebfcbeb0592c0992"
var queryURL = "https://api.openweathermap.org/data/2.5/weather?"
var city = $("#city");

//////Inital page
function start(){
$(".weatherpanel").hide();
$("#5daytitle").hide();
$("#forecast").hide();
$(".cityB").remove();
}

//////City Buttons Inputs Value
function sideButton(){
    var city = $(this).text();

    $(".weatherpanel").show();
    $("#5daytitle").show();
    $("#forecast").show();
    var cityFormatted = city.replaceAll(" ", "").toLowerCase();

    //Current Forecast
    var queryURL5day = queryURL + "q=" + cityFormatted + "&appid=" + APIKey;
    $.ajax({
        url: queryURL5day,
        method: "GET"
    })
        .then(function(response) {
          //Convert Temp
          tempConvert = response.main.temp * 9/5 - 459.67
          tempF = parseInt(tempConvert);
          //Inputs City name, Temperature, Humidity, and Wind Speed
          var h3 = $("h3").text(response.name);
          $(".temp").text("Temperature: " + tempF +" F");
          $(".humidity").text("Humidity: " + response.main.humidity + " %");
          $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
          //Stores Longitude and Latitude
          localStorage.setItem("lon", response.coord.lon);
          localStorage.setItem("lat", response.coord.lat);
          //Adds Icon in
          var queryURLIcon = "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png";
          var icon = $("<img>");
          icon.attr("src", queryURLIcon);
          $(h3).append(icon);

        });
       
    ////////// UV INDEX
    var storedLon = localStorage.getItem("lon");
    var storedLat = localStorage.getItem("lat");
    var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + storedLat + "&lon=" + storedLon + "&appid=" + APIKey; 
    $.ajax({
        url: queryURLUV,
        method: "GET"
      })
        .then(function(response) {

          //Gets the UV index number
          $(".uv").text(response.value);
           //Changes the color of UV background
          if (response.value <= 2){
            $(".uv").attr("style","background:green")
          }else if (response.value <= 5 && response.value > 3) {
            $(".uv").attr("style","background:yellow")
          }else if (response.value <= 7 && response.value > 6) {
            $(".uv").attr("style","background:orange")
          }else if (response.value <= 10 && response.value > 7){
            $(".uv").attr("style","background:red")
          }else{
            $(".uv").attr("style","background:purple")
          } 

        });
       
        var queryURLIcon = "https://openweathermap.org/img/wn/10d@2x.png";
        var icon = $("<img>");
        icon.attr("src", queryURLIcon);
        $("h3").append(icon);

    ////////5-DAY Forecast
    var queryURL5 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityFormatted+ "&appid=" + APIKey; 
    $.ajax({
        url: queryURL5,
        method: "GET"
    })
        .then(function(response) {
        var j = 0;
            $('.box').each(function(i, obj) {

                j = 6 + (i*8);
                // extracting the date
                var date1 = response.list[j].dt_txt;
                var dateM = date1.substring(5, 7);
                var dateD = date1.substring(8, 10);
                var dateY = date1.substring(0,4);
                var dateI = $(obj).children('p')[0];
                $(dateI).text(dateM + "/" + dateD+ "/" + dateY);

                // weather icons
                var icon1 = response.list[j].weather[0].icon;
                var queryURLIcon = "https://openweathermap.org/img/wn/" + icon1 + "@2x.png";
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
        //Clears any input value
    $("#city").val("");
}

///Creates new city button and stores the value
function newCity(){
    var city = $("#city").val();
    var button = $("<button>");
    button.text(city);
    button.attr("class","cityB");
    var buttonS = $("#allcities");
    buttonS.append(button);
    localStorage.clear();
    var storedItem = localStorage.getItem(city);
    localStorage.setItem("city", city);
    citySearch();
}

//Searches city from inital search
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
          //converts temperature
          tempConvert = response.main.temp * 9/5 - 459.67
          tempF = parseInt(tempConvert);
          //Inputs City Name, Temperature, Humidity, and Speed
          var h3 = $("h3").text(response.name);
          $(".temp").text("Temperature: " + tempF +" F");
          $(".humidity").text("Humidity: " + response.main.humidity + " %");
          $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
          
          //Stores Longitude and Latitude
          localStorage.setItem("lon", response.coord.lon);
          localStorage.setItem("lat", response.coord.lat);

          //Icon
          var queryURLIcon = "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png";
          var icon = $("<img>");
          icon.attr("src", queryURLIcon);
          $(h3).append(icon);

        });
       
    // UV INDEX
    var storedLon = localStorage.getItem("lon");
    var storedLat = localStorage.getItem("lat");
    var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + storedLat + "&lon=" + storedLon + "&appid=" + APIKey; 
    $.ajax({
        url: queryURLUV,
        method: "GET"
      })
        .then(function(response) {
          //UV Index Input
          $(".uv").text(response.value);
          //Changes color background depending on value
          if (response.value <= 2){
            $(".uv").attr("style","background:green")
          }else if (response.value <= 5 && response.value > 3) {
            $(".uv").attr("style","background:yellow")
          }else if (response.value <= 7 && response.value > 6) {
            $(".uv").attr("style","background:orange")
          }else if (response.value <= 10 && response.value > 7){
            $(".uv").attr("style","background:red")
          }else{
            $(".uv").attr("style","background:purple")
          } 

        });
       
        var queryURLIcon = "https://openweathermap.org/img/wn/10d@2x.png";
        var icon = $("<img>");
        icon.attr("src", queryURLIcon);
        $("h3").append(icon);

    //5-DAY Forecast
    var queryURL5 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityFormatted+ "&appid=" + APIKey; 
    $.ajax({
        url: queryURL5,
        method: "GET"
    })
        .then(function(response) {
  
        var j = 0;
            $('.box').each(function(i, obj) {

                j = 6 + (i*8);
                // extracting the date
                var date1 = response.list[j].dt_txt;
                var dateM = date1.substring(5, 7);
                var dateD = date1.substring(8, 10);
                var dateY = date1.substring(0,4);
                var dateI = $(obj).children('p')[0];
                $(dateI).text(dateM + "/" + dateD+ "/" + dateY);

                // weather icons
                var icon1 = response.list[j].weather[0].icon;
                var queryURLIcon = "https://openweathermap.org/img/wn/" + icon1 + "@2x.png";
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

    $("#city").val("");

    $("button").on('click', sideButton);

}

//////////////Page Reloads
$(window).on('load',function get(){

    $(".weatherpanel").show();
    $("#5daytitle").show();
    $("#forecast").show();

    ///Gets stored value
    var city = localStorage.getItem("city");
    var cityString = city.substr(0,city.length -0);
    var cityFormatted = cityString.replaceAll(" ", "").toLowerCase();
    console.log(cityFormatted);
    //Current Weather
    var queryURL5day = queryURL + "q=" + cityFormatted + "&appid=" + APIKey;
    $.ajax({
        url: queryURL5day,
        method: "GET"
    })
        .then(function(response) {
          //Converts Temp
          tempConvert = response.main.temp * 9/5 - 459.67
          tempF = parseInt(tempConvert);
          //Inputs city name, temp, humidity and wind
          var h3 = $("h3").text(response.name);
          $(".temp").text("Temperature: " + tempF +" F");
          $(".humidity").text("Humidity: " + response.main.humidity + " %");
          $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
          //Stores Longitutde and Latitude
          localStorage.setItem("lon", response.coord.lon);
          localStorage.setItem("lat", response.coord.lat);
          //Icons
          var queryURLIcon = "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png";
          var icon = $("<img>");
          icon.attr("src", queryURLIcon);
          $(h3).append(icon);

        });
       
    // UV INDEX
    var storedLon = localStorage.getItem("lon");
    var storedLat = localStorage.getItem("lat");
    var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + storedLat + "&lon=" + storedLon + "&appid=" + APIKey; 
    $.ajax({
        url: queryURLUV,
        method: "GET"
      })
        .then(function(response) {

          //Inputs UV value
          $(".uv").text(response.value);
          //Changes UV background based on color
          if (response.value <= 2){
            $(".uv").attr("style","background:green")
          }else if (response.value <= 5 && response.value > 3) {
            $(".uv").attr("style","background:yellow")
          }else if (response.value <= 7 && response.value > 6) {
            $(".uv").attr("style","background:orange")
          }else if (response.value <= 10 && response.value > 7){
            $(".uv").attr("style","background:red")
          }else{
            $(".uv").attr("style","background:purple")
          } 

        });
       
        var queryURLIcon = "https://openweathermap.org/img/wn/10d@2x.png";
        var icon = $("<img>");
        icon.attr("src", queryURLIcon);
        $("h3").append(icon);

    //5-DAY Forecast
    var queryURL5 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityFormatted+ "&appid=" + APIKey; 
    $.ajax({
        url: queryURL5,
        method: "GET"
    })
        .then(function(response) {
          
        var j = 0;
            $('.box').each(function(i, obj) {

                j = 6 + (i*8);
                // extracting the date
                var date1 = response.list[j].dt_txt;
                var dateM = date1.substring(5, 7);
                var dateD = date1.substring(8, 10);
                var dateY = date1.substring(0,4);
                var dateI = $(obj).children('p')[0];
                $(dateI).text(dateM + "/" + dateD+ "/" + dateY);

                // weather icons
                var icon1 = response.list[j].weather[0].icon;
                var queryURLIcon = "https://openweathermap.org/img/wn/" + icon1 + "@2x.png";
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
    $("#city").val("");

    $("button").on('click', sideButton);

});

//Page is opened
start();

//Search Button
$("span").click(newCity);

