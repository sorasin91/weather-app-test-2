// API key
// Signup on https://openweathermap.org/ to get api key
const apiKey = "41d27dfab6df2b4169de06e411f65749";

// API URL
const apiURL = "https://api.openweathermap.org/data/2.5/weather";

// Get references to the DOM elements
const locationInput = document.getElementById("locationInput");
const searchBtn = document.getElementById("search-btn");
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");
const errorMessageElement = document.getElementById("error-message");

// Create an image element to display the weather icon
const iconElement = document.createElement("img");
iconElement.id = "weather-icon";
document.querySelector(".weather-info").appendChild(iconElement);

// Add click event listener to the search button
searchBtn.addEventListener("click", () => {
  const location = locationInput.value;
  // Clear previous error message
  errorMessageElement.textContent = "";
  // Check if the input is not empty
  if (location) {
    // Fetch weather data for the entered location
    fetchWeatherData(location);
  } else {
    // Display error message if the input is empty
    errorMessageElement.textContent = "Please enter a valid city name.";
  }
});

// Function to fetch weather data from the API
function fetchWeatherData(location) {
  const url = `${apiURL}?q=${location}&appid=${apiKey}&units=metric`;

  // Fetch data from the API
  fetch(url)
    .then((response) => {
      // Check if the response is ok (status code 200)
      if (!response.ok) {
        throw new Error("City not found");
      }
      // Convert the response to JSON
      return response.json();
    })
    .then((data) => {
      // Update the DOM elements with the fetched weather data
      locationElement.textContent = data.name;
      temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
      descriptionElement.textContent = data.weather[0].description;
      // Update the weather icon
      const iconCode = data.weather[0].icon;
      iconElement.src = `http://openweathermap.org/img/wn/${iconCode}.png`;
      iconElement.alt = data.weather[0].description;
      // Clear any previous error message
      errorMessageElement.textContent = "";
    })
    .catch((error) => {
      // Display error message if there is an error fetching the data
      errorMessageElement.textContent =
        "Error fetching weather data: " + error.message;
    });
}
