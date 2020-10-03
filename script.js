// declare variables

let city = "";
let url = "";
let apiKey = "";
let currentURL = "";
let forecastURL = "";
let searchDiv = document.querySelector("search_history_container");
let cityList = []

// check local storage on page query
function searchHistory() {
    let stored_city = JSON.parse(localStorage.getItem("cityList"));

    // load search history
    if (stored_city !== null) {
        cityList = stored_city
    }

    renderButtons();
}

// assign search history to localstorage
function storeCitySearch() {
    localStorage.setItem("cityList", JSON.stringify(cityList));
}

// render click event btn in searchDiv
function renderButton() {
    searchDiv.innerHTML = "";
    if (cityList == null) {
        return;
    }

    let new_cities = [... new Set(cityList)];
    for (let i = 0; i < new_cities.length; i++) {
        let cityName = new_cities[i];

        let buttonEl = document.createElement("button");
        buttonEl.textContent = cityName;
        buttonEl.setAttribute("class", "searchBtn");

        searchDiv.appendChild(buttonEl);
        listClicker();
    }
}

// on click test
// function listClicker() {
//     $(".listBtn").on("click", function (event) {
//         console.log("anybody home?")
//         event.preventDefault();
//         console.log("hello?");
//         city = $(this).text().trim();
//         callAPI();
//     })
// }

// on click for city search event
function searchEvent(){
    $("#searchBtn").on("click", function (event){
        event.preventDefault();
        city = $(this).prev().val().trim()

        // push city searched to cityList (max 5)
        cityList.push(city);
        if (cityList.length > 5){
            cityList.shift()
        }
        if (city == ""){
            return;
        }
        callAPIs();
        storeCitySearch();
        renderButton
    })
}






















// function callAPI() {

//     // Open Weather API
//     currentURL = "https://api.openweathermap.org/data/2.5/weather?q=";

//     forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q="; 

//     apiKey = "&appid=a46d7ace8fe9b30fe73ee26488f40d18";


//     // query URLs
//     queryURL1 = currentURL + city + apiKey;

//     // call API for current weather in "city"
//     // 

//     $.ajax({
//         url: queryURL1,
//         method: "GET",
//     }).then(function(current_data) {
//         console.log(current_data);

//     })
