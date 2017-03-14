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
                console.log(data.main.temp);
                console.log(data.main.humidity);
                console.log(data.weather[0].description);
                console.log(data);
                document.getElementsByTagName("body")[0].className = "";
            },
            function(xhr) {
                console.error(xhr);
            }
        );

    });

};


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