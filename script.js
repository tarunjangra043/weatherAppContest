document.getElementById("fetch-data").addEventListener("click", function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  showMap(lat, lon);
  getWeather(lat, lon);
}

function showMap(lat, lon) {
  let mapIframe = `<iframe 
      src="https://www.google.com/maps/embed/v1/view?key=YOUR_GOOGLE_MAPS_API_KEY&center=${lat},${lon}&zoom=14"
      loading="lazy" allowfullscreen></iframe>`;
  document.getElementById("map-container").innerHTML = mapIframe;
}

async function getWeather(lat, lon) {
  const apiKey = "dbe88f19b79f55ab6a5298ce9e8f135b";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function displayWeatherData(data) {
  document.getElementById("weather").innerHTML = `
      <h2>Weather Data</h2>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Weather: ${data.weather[0].description}</p>
    `;

  document.getElementById("weather").style.cssText = "padding : 20px;";
}
