// Assign variables related to search
let searchFormEl = document.querySelector("#search-form");
let searchInputEl = document.querySelector("#search-text");
let searchButton = document.querySelector("#search-button");
let clearHistoryButton = document.querySelector("#clear-history");

let historyListEl = document.querySelector("#search-history-list");

// Set history items from local storage if available, and to an empty array if not
let historyItems = JSON.parse(localStorage.getItem("history") || "[]");
let numCities = localStorage.getItem("numCities") || 0;

let validCity = true;


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

let controller = new AbortController();
let signal = controller.signal;


let lat;
let lon;

// Get coordinates from city name using geocoding
function getCoordinates(city) {

    fetch(getCoordsRequestURL + city + "&limit=1&appid=" + apiKey)
        .then(function (response) {
            console.log(response.status);
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("No city found with that name.");
            }
        })
        .then(function (data) {
            console.log(data);
            if (data !== []) {
                lat = data[0].lat;
                lon = data[0].lon;
                addToHistory(city);
                getWeatherData(lat, lon);
            } else {
                throw new Error("No city found with that name.");
            }
        })
        .catch(function (error) {
            searchInputEl.value = "";
            let toolTip = document.querySelector(".tooltip");
            let toolTipText = document.querySelector(".tooltip-text");
            toolTip.style.display = "block";
            toolTipText.style.visibility = "visible";
            setTimeout(function() {
                toolTipText.style.visibility = "hidden";
                toolTip.style.display = "none";
            }, 2000);

        })
}

let weatherDataURL = `https://api.openweathermap.org/data/2.5/onecall?`;

function getWeatherData(lat, lon) {
    fetch(weatherDataURL + `lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            populateForecast(data.daily.slice(0, 5));
            populateCurrent(data.current);
        })
}

function populateForecast(dailyWeather) {
    console.log(dailyWeather);
}

function populateCurrent(currentWeather) {
    console.log(currentWeather);
}