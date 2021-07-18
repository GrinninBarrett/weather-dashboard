# Weather Dashboard
This project focuses on using a 3rd party API, specifically the Open Weather One-Call API, to create a weather dashboard to allow a user to search for their city (or any city) and see the current weather as well as a 5-day forecast for that city.

I began by creating the layout, opting for pure CSS instead of a framework to continue honing my pure CSS skills. There is more to be done here to improve responsiveness, but I believe as a desktop-oriented application, it is sufficient for now.

Next I implemented the <code>localStorage</code> functionality, adding searched cities to the history, both in the local storage as well as on the page. This included adding event listeners to each history item, as well as enabling and disabling the "Clear History" button when appropriate.

The difficult thing for this project was, of course, to successfully request and use data from the Open Weather One Call API. It wasn't as difficult as I expected, but it was a wonderful learning experience. The first step was to get the coordinates based on a city name, and then use those coordinates to retrieve the weather data. I learned how to use <code>.catch</code> to handle errors, and even made use of that to bring up a tooltip (instead of an alert) to let users know their search wasn't successful (no cities found). This particular API sometimes returns a status of 200, even if the search yielded no actual information. It sometimes returns an empty array, which needed to be handled via conditionals in the API request. 

Although DOM manipulation is something I had done before, using the data to populate the information on the page was more challenging than I expected. But I got it to work correctly and it looks relatively good, as well.




## Screenshot of completed application:
![Screenshot of Tucker's completed Weather Dashboard](assets/images/finished-weather-dashboard.png "Tucker's completed Weather Dashboard")

## Link to deployed application:
[Tucker Barrett's Weather Dashboard](http://grinninbarrett.github.io/weather-dashboard "Tucker's deployed Weather Dashboard application")