
let city = "";

let citiesDiv = document.getElementById("favorite_cities");
//start with empty array

let cities = [];
init();
listClicker();
searchClicker();

// pull search history from local storage if available
function init() {
    let saved_cities = JSON.parse(localStorage.getItem("cities"));

    if (saved_cities !== null) {
        cities = saved_cities
    }

    renderButtons();
}

// assign search history to local storage
function storeCities() {
    localStorage.setItem("cities", JSON.stringify(cities));
}


//render buttons for each element in cities array as a search history for user

function renderButtons() {
    citiesDiv.innerHTML = "";
    if (cities == null) {
        return;
    }
    let new_cities = [...new Set(cities)];
    for (let i = 0; i < new_cities.length; i++) {
        let cityName = new_cities[i];

        let buttonEl = document.createElement("button");
        buttonEl.textContent = cityName;
        buttonEl.setAttribute("class", "listbtn");

        citiesDiv.appendChild(buttonEl);
        listClicker();
    }
}
//on click function for search history buttons
function listClicker() {
    $(".listbtn").on("click", function (event) {
        event.preventDefault();
        city = $(this).text().trim();
        APIcalls();
    })
}



// click event for search button
function searchClicker() {
    $("#searchbtn").on("click", function (event) {
        event.preventDefault();
        city = $(this).prev().val().trim()

        //push the city into favorites array
        cities.push(city);

        //max array.length is 10, if over 10 the newest search will be saved & the oldest discarded
        if (cities.length > 10) {
            cities.shift()
        }
        // if there are no saved search results
        if (city == "") {
            return;
        }
        APIcalls();
        storeCities();
        renderButtons();
    })
}

//runs 2 API calls, one for current weather data and one for five-day forecast, then populates text areas
function APIcalls() {

    url = "https://api.openweathermap.org/data/2.5/forecast?q=";
    currenturl = "https://api.openweathermap.org/data/2.5/weather?q=";
    // uvurl = "https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&units=imperial&exclude=current,minutely,hourly,alerts&appid=&appid=5ce8439fd4264478d1da0b24a7cd547d";
    apiKey = "&appid=5ce8439fd4264478d1da0b24a7cd547d";
    queryurl = url + city + apiKey;
    current_weather_url = currenturl + city + apiKey;


    $("#city_name").text("Today's Weather in " + city);

    // get 5 day forecast conditions from openweather
    $.ajax({
        url: queryurl,
        method: "GET",

    }).then(function (response) {
        let day_number = 0;

        // forecast time reference below referenced from acdollard
        //iterate through the 40 weather data sets
        for (let i = 0; i < response.list.length; i++) {

            //split function to isolate the time from the time/data aspect of weather data, and only select weather reports for 3pm
            if (response.list[i].dt_txt.split(" ")[1] == "15:00:00") {
                //if time of report is 3pm, populate text areas accordingly
                let day = response.list[i].dt_txt.split("-")[2].split(" ")[0];
                let month = response.list[i].dt_txt.split("-")[1];
                let year = response.list[i].dt_txt.split("-")[0];
                $("#" + day_number + "date").text(month + "/" + day + "/" + year);
                let temp = Math.round(((response.list[i].main.temp - 273.15) * 9 / 5 + 32));
                let feels_like = Math.round(((response.list[i].main.feels_like - 273.15) * 9 / 5 + 32));
                $("#" + day_number + "five_day_temp").text("Temperature: " + temp + "°F")
                $("#" + day_number + "five_day_feels_like").text("Feels like: " + feels_like + "°F");
                $("#" + day_number + "five_day_humidity").text("Humidity: " + response.list[i].main.humidity + "%");
                $("#" + day_number + "five_day_icon").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                // console.log(response.list[i].dt_txt.split("-"));
                // console.log(day_number);
                // console.log(response.list[i].main.temp);
                day_number++;
            }
        }
    });
   

    //     // get current conditions from openweather
    $.ajax({
        url: current_weather_url,
        method: "GET",
    }).then(function (current_data) {
        // console.log(current_data);
        let temp = Math.round(((current_data.main.temp - 273.15) * 9 / 5 + 32))
        // console.log("The temperature in " + city + " is: " + temp);
        $("#current_temp").text("Temperature: " + temp + String.fromCharCode(176) + "F");
        $("#current_humidity").text("Humidity: " + current_data.main.humidity + " %");
        $("#current_wind").text("Wind Speed: " + current_data.wind.speed + " MPH");
        $("#current_weather_icon").attr({
            "src": "http://openweathermap.org/img/w/" + current_data.weather[0].icon + ".png",
            "height": "100px", "width": "100px"
        });

        var cityLat = current_data.coord.lat;
        var cityLon = current_data.coord.lon;
        var uvurl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLon + apiKey

        // get current uv index from openweather
        $.ajax({
            url: uvurl,
            method: "GET",
        }).then(function (response) {
            var uvI = response.value
            console.log(uvI);

            $("#current_uv_index").text("UV index: " + uvI);
            
        var uvI = current_data[0].uvI
        if (uvI <= 2) {
            // color green
            // console.log("Color: green");
            $("#current_uv_index").addClass("badge-success");
        }
        else if (uvI > 2 && uvI <= 5) {
            // color yellow
            // console.log("Color: yellow");
            $("#current_uv_index").addClass("badge-warning");
        }
        else if (uvI >5 && uvI <= 7) {
        //     // color orange
        //     // console.log("Color: orange");
            $("#current_uv_index").addClass("badge-warning");
        }
        else if (uvI > 7 && uvI <= 10) {
            // color red
            // console.log("Color: red");
            $("#current_uv_index").addClass("badge-danger");
        }
        else {
            // color purple
            // console.log("Color: purple");
            $("#current_uv_index").addClass("badge-primary");
        }

        
        
        })

    })
}