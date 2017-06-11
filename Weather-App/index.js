var kelvinTemperature;

window.onload = function() {

    navigator.geolocation.getCurrentPosition(function(location) {
        console.log(location.coords.latitude);
        console.log(location.coords.longitude);
        console.log(location.coords.accuracy);

        weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' +
            location.coords.latitude + '&lon=' + location.coords.longitude +
            "&APPID=c91312d00d5875753efe8c433770ee39";

        loadJSON(weatherUrl,
            function(data) {
                iconUrl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
                document.getElementsByTagName("img")[0].src = iconUrl;

                kelvinTemperature = data.main.temp;
                temperatureFarenheit = convertKelvinToFarenheit(kelvinTemperature);
                document.getElementsByClassName("info-temp")[0].innerText = temperatureFarenheit + "\u2109";

                document.getElementsByClassName("info-location")[0].innerText = data.name;

                weather = data.weather[0].description;
                document.getElementsByClassName("info-description")[0].innerText = weather;
                setBackgroundImage(weather);

                windText = degreeToWindDirection(data.wind.deg) + " " + data.wind.speed + " knots";
                document.getElementsByClassName("info-wind")[0].innerText = windText;

                document.getElementsByClassName("loading")[0].style.display = "none";
                document.getElementsByClassName("container")[0].style.display = "block";
            },
            function(xhr) {
                document.getElementsByClassName("loading")[0].style.display = "none";
                document.getElementsByClassName("container")[0].style.display = "block";

                infoWrapper = document.getElementsByClassName("weather-info-wrapper")[0];
                infoWrapper.className = "error";
                infoWrapper.innerText = "An error has occurred loading your local weather!";
            }
        );
    });


    document.getElementsByClassName("temp-toggle")[0].onclick = function () {
        var temperatureElement = document.getElementsByClassName("info-temp")[0];
        if (temperatureElement.innerText.indexOf("\u2103") != -1) {
            temperatureFarenheit = convertKelvinToFarenheit(kelvinTemperature);
            temperatureElement.innerText = temperatureFarenheit + "\u2109";
        }
        else {
            temperatureCelcius = convertKelvinToCelcius(kelvinTemperature);
            temperatureElement.innerText = temperatureCelcius + "\u2103";
        }
    };
};


function convertKelvinToFarenheit(temp) {
    return Math.round((temp - 273.15) * 1.8 + 32);
}


function convertKelvinToCelcius(temp) {
    return Math.round(kelvinTemperature - 273.15)
}


function degreeToWindDirection(degree) {
    var directionNames = [ "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW" ]
    var value = Math.floor(degree/22.5 + .5);
    return directionNames[value % 16]
}


function setBackgroundImage(weather) {
    if (weather == "scattered clouds") {
        document.body.style.background = "url('images/cloudy.png') no-repeat center center";
    }
    else if (weather == "clear sky" && temperatureFarenheit > 60) {
        document.body.style.background = "url('images/warm.png') no-repeat center center";
    }
}


function loadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                success(JSON.parse(xhr.responseText));
            } else {
                error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}