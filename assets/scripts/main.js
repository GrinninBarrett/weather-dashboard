// Assign variables related to search
let searchFormEl = document.querySelector("#search-form");
let searchInputEl = document.querySelector("#search-text");
let searchButton = document.querySelector("#search-button");
let clearHistoryButton = document.querySelector("#clear-history");

let historyListEl = document.querySelector("#search-history-list");

// Set history items from local storage if available, and to an empty array if not
let historyItems = JSON.parse(localStorage.getItem("history") || "[]");
let numCities = localStorage.getItem("numCities") || 0;


searchFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
    let searchedCity = searchInputEl.value.trim();
    if (searchedCity.length !== 0) {
        addToHistory(searchedCity);
    }
});

clearHistoryButton.addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.clear();
    historyItems = [];
    historyListEl.innerHTML = "";
    clearHistoryButton.disabled = true;
});


// Add searched-for cities to the history (in local storage and to the page)
function addToHistory(city) {

    //Capitalize city name, done this way in case a city name has multiple words
    let searchedForCity = city.toLowerCase();
    let arr = searchedForCity.split(" ");
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    let formattedCityName = arr.join(" ");

    if (historyItems.includes(formattedCityName)) {
        searchInputEl.value = "";
        return;
    } else {
        searchInputEl.value = "";

        historyItems.push(formattedCityName);
        numCities++;

        localStorage.setItem("history", JSON.stringify(historyItems));

        populateHistoryList();
    }
}


function populateHistoryList() {
    if (historyItems.length === 0) {
        clearHistoryButton.disabled = true;
        return;
    } else {
        // Remove all list items for ease of formatting local storage variables and populating list with loop
        historyListEl.innerHTML = "";

        for (let i = 0; i < historyItems.length; i++) {
            let nextListItemEl = document.createElement("li");
            nextListItemEl.textContent = historyItems[i];
            nextListItemEl.classList.add("history-item");
            historyListEl.appendChild(nextListItemEl);

            // Add event listener to each history item
            nextListItemEl.addEventListener("click", searchForCity);
        }
        clearHistoryButton.disabled = false;
    }
}

function searchForCity(event) {
    event.preventDefault();
    console.log(event.target.textContent);
} 

populateHistoryList();