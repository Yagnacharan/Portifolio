const apiKey = "3a49f9c378d44bb18f70a2248b936a82";  // replace this

const cityEl = document.getElementById("city");
const tempEl = document.getElementById("temp");
const condEl = document.getElementById("condition");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const box = document.getElementById("weatherBox");

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return alert("Enter a city name");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      alert("City not found");
      return;
    }

    cityEl.textContent = data.name + ", " + data.sys.country;
    tempEl.textContent = Math.round(data.main.temp) + "°C";
    condEl.textContent = data.weather[0].main;
    humidityEl.textContent = "💧 Humidity: " + data.main.humidity + "%";
    windEl.textContent = "🌬 Wind: " + data.wind.speed + " m/s";

    box.style.display = "block";

  } catch (err) {
    alert("Error fetching weather");
  }
}
