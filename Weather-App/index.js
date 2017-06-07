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
                document.getElementsByTagName("section")[0].className = "";
                document.getElementsByClassName("weather-info-wrapper")[0].className = "";
                document.getElementsByClassName("weather-info").className = "";



                console.log(data.main.temp);
                console.log(convertKelvinToFarenheit(data.main.temp));



                iconUrl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
                document.getElementsByTagName("img")[0].src = iconUrl;

                temperatureFarenheit = convertKelvinToFarenheit(data.main.temp);
                document.getElementsByClassName("info-temp")[0].innerText = temperatureFarenheit;



                console.log(data.main.humidity);
                console.log(data.weather[0].description);
                console.log(data);
            },
            function(xhr) {
                document.getElementsByTagName("section")[0].className = "";
                var infoWrapper = document.getElementsByClassName("weather-info-wrapper")[0];
                infoWrapper.className = "error";
                infoWrapper.innerText = "An error has occurred loading your local weather!";
            }
        );
    });
};


function convertKelvinToFarenheit(temp) {
    return Math.round((temp - 273.15) * 1.8 + 32);
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