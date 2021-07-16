// Assign variables related to search
let searchFormEl = document.querySelector("#search-form");
let searchInputEl = document.querySelector("#search-text");
let searchButton = document.querySelector("#search-button");
let clearHistoryButton = document.querySelector("#clear-history");

let historyListEl = document.querySelector("#search-history-list");

// Set history items from local storage if available, and to an empty array if not
let historyItems = JSON.parse(localStorage.getItem("history") || "[]");
let numCities = localStorage.getItem("numCities") || 0;


// Add event listeners to search form
searchFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
    let searchedCity = searchInputEl.value.trim();
    if (searchedCity.length !== 0) {
        //Capitalize city name, done this way in case a city name has multiple words
        searchedCity = searchedCity.toLowerCase();
        let arr = searchedCity.split(" ");
        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        let formattedCityName = arr.join(" ");

        addToHistory(formattedCityName);
        getCoordinates(formattedCityName);
    }
});

// Add event listener to clear history button
clearHistoryButton.addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.clear();
    historyItems = [];
    numCities = 0;
    historyListEl.innerHTML = "";
    clearHistoryButton.disabled = true;
});


// Add searched-for cities to the history in local storage
function addToHistory(city) {

    if (historyItems.includes(city)) {
        searchInputEl.value = "";
        return;
    } else {
        searchInputEl.value = "";
        historyItems.push(city);
        numCities++;
        localStorage.setItem("history", JSON.stringify(historyItems));

        populateHistoryList();
    }
}


// Add history list item elements to the page
function populateHistoryList() {

    if (historyItems.length === 0) {
        return;
    } else {
        // Remove all list items for ease of formatting local storage variables and populating list with loop
        historyListEl.innerHTML = "";

        // Add all history list items as children to the ordered list element
        for (let i = 0; i < historyItems.length; i++) {
            let nextListItemEl = document.createElement("li");
            nextListItemEl.textContent = historyItems[i];
            nextListItemEl.classList.add("history-item");
            historyListEl.appendChild(nextListItemEl);

            // Add event listener to each history item
            nextListItemEl.addEventListener("click", function() {
                getCoordinates(historyItems[i]);
            });
        }
        clearHistoryButton.disabled = false;
    }
}

// Run on page load to visually populate history list if items remain in local storage
populateHistoryList();


let getCoordsRequestURL = "http://api.openweathermap.org/geo/1.0/direct?q=";
let apiKey = "45a7ada253a9672823033c8c2e97ec64";


// {city name},{state code},{country code}&limit={limit}&appid={API key}"

function getCoordinates(city) {

    fetch(getCoordsRequestURL + city + "&limit=1&appid=" + apiKey)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data[0].lat);
            console.log(data[0].lon);
        })
}

