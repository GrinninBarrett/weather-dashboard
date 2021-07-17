// Assign variables related to search
let searchFormEl = document.querySelector("#search-form");
let searchInputEl = document.querySelector("#search-text");
let searchButton = document.querySelector("#search-button");
let clearHistoryButton = document.querySelector("#clear-history");
let historyListEl = document.querySelector("#search-history-list");

// Assign variables for other DOM elements
let currentWeatherEl = document.querySelector("#current-weather");

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


// Add searched-for cities to the history in local storage, called only if getCoordinates API request returns a valid city
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


// Add history list item elements to the page (done on page load and each time a city is added)
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


//----------------------------
// Begin code for API requests
//----------------------------

let getCoordsRequestURL = "http://api.openweathermap.org/geo/1.0/direct?q=";
let apiKey = "45a7ada253a9672823033c8c2e97ec64";


// Get coordinates from city name using geocoding
function getCoordinates(city) {

    fetch(getCoordsRequestURL + city + "&limit=1&appid=" + apiKey)
        .then(function (response) {
            console.log(response.status);
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (data) {
            // Check if data is actually a usable object (response sometimes returns ok even if it's empty)
            if (data !== []) {
                console.log(data);
                let lat = data[0].lat;
                let lon = data[0].lon;
                let cityName = data[0].name;
                // Add searched city to history list only if it's a valid city
                addToHistory(city);
                // populateCityName(data[0].name);
                getWeatherData(lat, lon, cityName);
            }
        })
        .catch(function (error) {
            searchInputEl.value = "";

            // Show tooltip to let user know their input is not a valid city
            let toolTip = document.querySelector(".tooltip");
            let toolTipText = document.querySelector(".tooltip-text");
            toolTip.style.display = "block";
            toolTipText.style.visibility = "visible";

            // Set timeout to hide tooltip
            setTimeout(function() {
                toolTipText.style.visibility = "hidden";
                toolTip.style.display = "none";
            }, 2000);
        })
}


// Use coordinates from previous request to fetch weather data
let weatherDataURL = `https://api.openweathermap.org/data/2.5/onecall?`;

function getWeatherData(lat, lon, cityName) {
    fetch(weatherDataURL + `lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            populateCurrentData(data, cityName);
            populateForecastData(data);
        })
}

// Add city name to current weather container - done separately because weather info object returned with coordinates does not contain city name
// function populateCityName(cityName) {
//     // Remove previous city
//     currentWeatherEl.innerHTML = "";

//     let currentWeatherHeadingContainer = document.createElement("div");
//     currentWeatherHeadingContainer.setAttribute("id", "current-weather-heading-container");
//     let currentWeatherHeadingEl = document.createElement("h5");
//     currentWeatherHeadingEl.textContent = cityName;
//     currentWeatherHeadingEl.setAttribute("id", "current-weather-heading");
    
//     currentWeatherEl.appendChild(currentWeatherHeadingContainer);
//     currentWeatherHeadingContainer.appendChild(currentWeatherHeadingEl);
// }

// Add current weather data to page
function populateCurrentData(weatherData, cityName) {
    console.log(weatherData);
    console.log(cityName);

    let currentWeatherData = weatherData.current;
    let weatherIcon = weatherData.current.weather[0].icon;

    // Remove previous city heading element to make way for new one
    currentWeatherEl.innerHTML = "";

    let currentWeatherHeadingContainer = document.createElement("div");
    currentWeatherHeadingContainer.setAttribute("id", "current-weather-heading-container");
    let currentWeatherHeadingEl = document.createElement("h5");
    currentWeatherHeadingEl.textContent = cityName;
    currentWeatherHeadingEl.setAttribute("id", "current-weather-heading");
    
    currentWeatherEl.appendChild(currentWeatherHeadingContainer);
    currentWeatherHeadingContainer.appendChild(currentWeatherHeadingEl);

    // Add current weather icon beside city name
    let weatherIconEl = document.createElement("img");
    weatherIconEl.setAttribute("src", `http://openweathermap.org/img/wn/${weatherIcon}.png`);
    currentWeatherHeadingContainer.appendChild(weatherIconEl);


    let detailsContainer = document.createElement("div");
    detailsContainer.setAttribute("id", "current-weather-details-container");
    currentWeatherEl.appendChild(detailsContainer);
    
    // Create elements for all weather details
    for (let i = 0; i < 4; i++) {
        let nextItem = document.createElement("p");
        nextItem.setAttribute("class", "current-weather-details");
        detailsContainer.appendChild(nextItem);
    }

    // Add text to newly created p elements
    let allDetailItems = document.querySelectorAll(".current-weather-details");

    allDetailItems[3].innerHTML = `UV Index: <span id="uv-index"></span>`;

    allDetailItems[0].textContent = `Temperature: ${currentWeatherData.temp}\u00B0`;
    allDetailItems[1].textContent = `Humidity: ${currentWeatherData.humidity}%`;
    allDetailItems[2].textContent = `Wind: ${currentWeatherData.wind_speed}mph`;
    
    let uvIndexEl = document.querySelector("#uv-index");
    uvIndexEl.textContent = currentWeatherData.uvi;

    // Adjust color of UV Index based on severity
    if (currentWeatherData.uvi < 3) {
        uvIndexEl.setAttribute("style", "background-color: rgb(26, 158, 114);");
    } else if (currentWeatherData.uvi >= 3 && currentWeatherData.uvi < 5) {
        uvIndexEl.setAttribute("style", "background-color: rgb(255, 244, 85); color: var(--very-dark-gray);");
    } else if (currentWeatherData.uvi >= 5 && currentWeatherData.uvi < 8) {
        uvIndexEl.setAttribute("style", "background-color: rgb(235, 183, 70);");
    } else {
        uvIndexEl.setAttribute("style", "background-color: rgb(233, 94, 52);");
    }
}

function populateForecastData(weatherData) {
    let forecastWeatherData = weatherData.daily.slice(0, 5);
    console.log(forecastWeatherData);
}

