window.onload = function() {
    document.getElementById("new-quote-btn").click();
};


document.getElementById("new-quote-btn").addEventListener("click", function(event){

    var container = document.getElementsByClassName("shadow-box-container")[0];
    var authorEl = document.getElementById("author");
    var quoteEl = document.getElementById("quote");

    container.className = "shadow-box-container loading";
    quoteEl.innerHTML = "";
    authorEl.innerHTML = "";

    loadJSON('http://quotes.stormconsultancy.co.uk/popular.json',
        function(data) {
            var randomObj = data[getRandomIntInclusive(0, data.length)];
            quoteEl.innerHTML = randomObj.quote;
            authorEl.innerHTML = randomObj.author;
            container.className = "shadow-box-container";
        },
        function(xhr) {
            console.error(xhr);
        }
    );
});


function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
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