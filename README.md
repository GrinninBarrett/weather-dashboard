# Weather Dashboard
This project focuses on using a 3rd party API, specifically the Open Weather One-Call API, to create a weather dashboard to allow a user to search for their city (or any city) and see the current weather as well as a 5-day forecast for that city.

I began by creating the layout, opting for pure CSS instead of a framework to continue honing my pure CSS skills. There is more to be done here to improve responsiveness, but I believe as a desktop-oriented application, it is sufficient for now.

Next I implemented the <code>localStorage</code> functionality, adding searched cities to the history, both in the local storage as well as on the page. This included adding event listeners to each history item, as well as enabling and disabling the "Clear History" button when appropriate.

The difficult thing for this project was, of course, to successfully request and use data from the Open Weather One Call API. It wasn't as difficult as I expected, but it was a wonderful learning experience. The first step was to get the coordinates based on a city name, and then use those coordinates to retrieve the weather data. I learned how to use <code>.catch</code> to handle errors, and even made use of that to bring up a tooltip (instead of an alert) to let users know their search wasn't successful (no cities found). This particular API sometimes returns a status of 200, even if the search yielded no actual information. It sometimes returns an empty array, which needed to be handled via conditionals in the API request. 

Although DOM manipulation is something I had done before, using the data to populate the information on the page was more challenging than I expected. But I got it to work correctly and it looks relatively good, as well.

## Technologies Used
* HTML
* CSS
* JavaScript
* Open Weather One-Call API

## Screenshot of completed application:
![Screenshot of Tucker's completed Weather Dashboard](assets/images/finished-weather-dashboard.png "Tucker's completed Weather Dashboard")

## Link to deployed application:
[Tucker Barrett's Weather Dashboard](http://grinninbarrett.github.io/weather-dashboard "Tucker's deployed Weather Dashboard application")

## License
MIT License

Copyright (c) 2021 Charles Tucker Barrett

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Contact Me
ctbarrett.tech@gmail.com