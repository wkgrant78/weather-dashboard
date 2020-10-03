// define variables

let city=""; 





function callAPI() {

    // Open Weather API
    currentURL = "https://api.openweathermap.org/data/2.5/weather?q=";

    forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q="; 

    APIkey = "&appid=a46d7ace8fe9b30fe73ee26488f40d18";

    // query URLs
    queryURL1 = currentURL + city + APIkey;


    // call API for current weather in "city"
    $("city_name").text("The weather in " + city + " is");

    $.ajax({
        url:queryURL1,
        method: "GET",
    }).then(function(response) {
        console.log(response)
  
        console.
    })
    
}