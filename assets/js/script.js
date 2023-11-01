//Declare variables
var cityInput = document.querySelector(".city-input");
var submit=$('#submitBtn');
var temp = document.getElementById('temp');
var wind = document.getElementById('wind');
var humidity = document.getElementById('humidity');

var API_KEY = '&appid=8d3f9c749dadd01b4c33c525d9b462e5';

var createWeatherCard = (weatherItem) => {
    return `<h3>${weatherItem.dt_text.split('')[0]}</h3>
    <li id="temp">Temp: ${weatherItem.main.temp}</li>
    <li id="wind">Wind: ${weatherItem.wind.speed}</li>
    <li id="humidity">Humidity: ${weatherItem.main.humidity}</li>`;
}

var getWeatherDetails = (cityName, lat, lon) => {
    const WEATHER_API_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}
    `;

    fetch(WEATHER_API_URL).then (res => res.json()).then(data => {
        console.log(data);

        data.list.filter(forecast => {
            const uniqueForecastDays = [];
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if(!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        });
        console.log(fiveDaysForecast);
        fiveDaysForecast.forEach(weatherItem => {
            createWeatherCard(weatherItem);
        });
    }).catch(() => {
        alert('Could not fetch weather forecast');
    })
}

//checking to see if can retrieve api properly
function getApi(lat, lon){
    var requestURL = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=8d3f9c749dadd01b4c33c525d9b462e5";
    fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        // temp.textContent = data[1].list[1].main.temp;
        const { name, lat, lon } = data[0];
        getWeatherDetails(name, lat, lon);
    })
}

//getApi();

//set event listener to run function after clicking submit button
submit.on("click", function(event) {
    event.preventDefault();
    checkWeather();
});

//create checkWeather function
function checkWeather() {
    var city= $('#city').val();
    console.log(city);
    $.getJSON('http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=8d3f9c749dadd01b4c33c525d9b462e5',
function(data){
    //var city = city[4];
    console.log(city);
    console.log(data);

    //assigning data to the variable
    var lat= data[0].lat
    var lon= data[0].lon

    //pass lat and lon data into the getApi function
    getApi(lat, lon);
}
)
}
