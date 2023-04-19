console.log("hello");

let inpField = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");
const temperature = document.querySelector(".temp");
const description = document.querySelector(".desc");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind_speed");
let image = document.getElementById("weather_img");
let weather;

searchBtn.addEventListener("click", function () {
  data(inpField.value);
});

const data = async (cityName) => {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=010b836e2d7ee3417c4740da2c4b1f43`;

  let cityKey = window.sessionStorage.getItem(`${cityName}`);
  if (cityKey != null) {
    weather = JSON.parse(cityKey);
    showData(weather);
  } else {
    let resp = await fetch(url);
    if (resp.status != 200) {
      noCityFound();
    } else {
      resp = await resp.json();
      window.sessionStorage.setItem(`${cityName}`, JSON.stringify(resp));
      weather = resp;
      showData(weather);
    }
  }
};

function showData(weathers) {
  image.src = `https://openweathermap.org/img/wn/${weathers.weather[0].icon}@2x.png`;
  temperature.innerHTML = `${weathers.main.temp}`;
  humidity.innerHTML = `${weathers.main.humidity}%`;
  wind_speed.innerHTML = `${weathers.wind.speed} km/h`;
  description.innerHTML = `${weathers.weather[0].description}`;

  document.querySelector(".weather_details").classList.remove("d-none");
  document.querySelector(".weather_data").classList.remove("d-none");
  document.querySelector("#err").classList.add("d-none");
}
function noCityFound() {
  document.getElementById("err").innerHTML = "City Not Found!";
  image.src = "/assets/404.png";
  document.querySelector(".weather_details").classList.add("d-none");
  document.querySelector(".weather_data").classList.add("d-none");
  document.querySelector("#err").classList.remove("d-none");
  console.log(resp.status);
}
