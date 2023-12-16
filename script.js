function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

document.getElementById("myBtn").onclick = myFunction;
let inputText = document.getElementById("myTxtInput");
// async function
async function fetchAsync(url) {
  // await response of fetch call
  let response = await fetch(url);
  // only proceed once promise is resolved
  let data = await response.json();
  // only proceed once second promise is resolved
  return data;
}
//let pObj=fetchAsync("https://api.exchangerate-api.com/v4/latest/USD");
//pObj.then(obj=>console.log(obj.rates.CAD));
/*
function printValues(obj) {
    for(var k in obj) {
        if(obj[k] instanceof Object) {
            printValues(obj[k]);
        } else {
            console.log(obj[k]);
        };
    }
};
*/
function printValues(obj) {
  for (var news of obj.articles) {
    //console.log(news["title"]);
    document.write('<link rel="stylesheet" href="styles.css">');
    document.write(
      `<div class="jumbotron-news"> <h2>${news["title"]}</h2> <img width=400px src=${news["image"]}> <p>${news["content"]}</p> </div>`
    );
    //  console.log(news["image"]);
    //document.write(``);
    //  console.log(news["content"]);
    //document.write(``);
    document.write("<br>");
    document.write("<br>");
  }
}
function myFunction() {
  let topic = inputText.value;
  //https://gnews.io/api/v4/search?q=calgary&max=2&country=ca&token=96e20d8a142eb676d6804f79a9d6d9ba
  let queryString = `https://gnews.io/api/v4/search?q=${topic}&country=ca&max=10&token=96e20d8a142eb676d6804f79a9d6d9ba`;
  let jsonObject = fetchAsync(queryString);
  jsonObject.then((obj) => printValues(obj));
}
