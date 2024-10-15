// ===Mobile mene toggle button functionality starts here=== //
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = document.getElementById("menuIcon");
const menuCloseIcon = document.getElementById("menuCloseIcon");

function menuToggle(e) {
  e.name === "menu"
    ? ((e.name = "close"),
      mobileMenu.classList.remove("hidden"),
      mobileMenu.classList.add("block"))
    : ((e.name = "menu"),
      mobileMenu.classList.add("hidden"),
      mobileMenu.classList.remove("block"));
}
// ===Mobile mene toggle button functionality ends here=== //

// ---search details starts here--- //
const searchBtn = document.querySelectorAll(".searchBtn");
const currentBtn = document.querySelectorAll(".currentBtn");
const citySearched = document.querySelectorAll(".inputField");
// ---search details ends here--- //

// ---main card details starts here--- //
const mainDate = document.getElementById("date");
const weatherIcon = document.getElementById("currMainIcon");
const current_weather = document.getElementById("weather");
const current_temperature = document.getElementById("cur_temperature");
const city = document.getElementById("city");
const country = document.getElementById("country");
const temperature = document.getElementById("temperature");
const windSpeed = document.getElementById("windSpeed");
const humidity = document.getElementById("humidity");
const visibility = document.getElementById("visibility");
const apiKey = "afdce8e959ccad2851497a17c1796730";
// ---main card details ends here--- //

// ----6 days forecast details---- //
const forecastCards = document.getElementById("forecastCards");

// ===Fetching weather data through openweather api starts here=== //
async function fetchWeather(name) {
  // ===Fetching current weather starts here=== //
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${apiKey}`;
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  try {
    const response = await fetch(apiUrl);
    console.log(response);
    if (!response.ok) {
      throw new Error("City not Found");
    }
    const data = await response.json();
    console.log("weatherData = ", data);

    const date = new Date();
    const fullDate = `${date.getDate()}, ${
      months[date.getMonth()]
    } ${date.getFullYear()}`;
    console.log(fullDate);

    mainDate.innerHTML = fullDate;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    current_weather.innerHTML = data.weather[0].main;
    current_temperature.innerHTML = data.main.temp.toFixed(0);
    city.innerHTML = data.name;
    country.innerHTML = data.sys.country;
    temperature.innerHTML = data.main.temp.toFixed(0);
    windSpeed.innerHTML = data.wind.speed;
    humidity.innerHTML = data.main.humidity;
    visibility.innerHTML = data.visibility / 1000;
  } catch (error) {
    console.error("Error while fetching weather data: ", error);
  }
  // ===Fetching current weather ends here=== //

  // ===Fetching forecast weather starts here=== //
  const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${name}&units=metric&appid=${apiKey}`;

  try {
    const forecastResponse = await fetch(forecastApiUrl);
    console.log(forecastResponse);
    if (!forecastResponse.ok) {
      throw new Error("City not Found");
    }
    const forecastData = await forecastResponse.json();
    console.log("forecastData = ", forecastData);
    let sixDaysForecast = [];
    let forcastDays = forecastData.list.filter((forecastday) => {
      let forecastDate = new Date(forecastday.dt_txt).getDate();
      if (!sixDaysForecast.includes(forecastDate)) {
        return sixDaysForecast.push(forecastDate);
      }
    });
    console.log(forcastDays);
    forecastCards.innerHTML = "";
    for (let forecastDay of forcastDays) {
      let date = new Date(forecastDay.dt_txt);
      const fullDate = `${date.getDate()}, ${
        months[date.getMonth()]
      } ${date.getFullYear()}`;

      forecastCards.innerHTML += `
<div>
              <div
                class="flex flex-col bg-white/20 backdrop-blur-sm rounded p-4 w-full"
              >
                <!-- forecast day -->
                <div id="forecastDays" class="font-bold text-white text-xl">
                  ${days[date.getDay()]}
                </div>
                <!-- forecast date -->
                <div id="forecastDate" class="text-sm text-[#a8b9d7]">
                 ${fullDate}
                </div>
                <!-- forecast icon -->
                <div
                  class="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24"
                >
                  <img
              class="md:w-40 w-20 h-4w-25"
              src="https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
            />
                </div>
                <div class="flex flex-row items-center justify-center mt-6">
                  <!-- forecast temperature -->
                  <div
                    
                    class="font-medium text-6xl text-white"
                  >
                    <span id="forecastTemperature">${forecastDay.main.temp.toFixed(
                      0
                    )}</span>°
                  </div>
                  <div class="flex flex-col items-center ml-6">
                    <!-- forecast weather -->
                    <div id="forecastWeather" class="text-white">${
                      forecastDay.weather[0].description
                    }</div>
                    <!-- max temperature -->
                    <div class="mt-1">
                      <span class="text-sm font-thin text-[#a8b9d7]"
                        ><i class="fa-solid fa-arrow-up"></i
                      ></span>
                      <span
                        id="forecastMaxTemp"
                        class="text-sm font-light text-[#a8b9d7]"
                        ><span>${forecastDay.main.temp_max.toFixed(
                          2
                        )}</span>°C</span
                      >
                    </div>
                    <!-- min temperature -->
                    <div>
                      <span class="text-sm text-[#a8b9d7]"
                        ><i class="fa-solid fa-arrow-down"></i
                      ></span>
                      <span
                        id="forecastMinTemp"
                        class="text-sm font-light text-[#a8b9d7]"
                        ><span>${forecastDay.main.temp_min.toFixed(
                          2
                        )}</span>°C</span
                      >
                    </div>
                  </div>
                </div>
                <!-- forecast weather information -->
                <div class="flex flex-row justify-between mt-6">
                  <div class="flex flex-col items-center">
                    <div class="font-medium text-sm text-white">Wind</div>
                    <div id="forecastWind" class="text-sm text-[#a8b9d7]">
                      <span>${forecastDay.wind.speed}</span>m/s
                    </div>
                  </div>
                  <div class="flex flex-col items-center">
                    <div class="font-medium text-sm text-white">Humidity</div>
                    <div id="forecastHumidity" class="text-sm text-[#a8b9d7]">
                      <span>${forecastDay.main.humidity}</span>%
                    </div>
                  </div>
                  <div class="flex flex-col items-center">
                    <div class="font-medium text-sm text-white">Visibility</div>
                    <div id="forecastVisibility" class="text-sm text-[#a8b9d7]">
                      <span>${forecastDay.visibility / 1000}km</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
`;
    }
  } catch (error) {
    console.error("Error while fetching weather data: ", error);
  }
  // ===Fetching forecast weather ends here=== //
}
// ===Fetching weather data through openweather api ends here=== //

// === current location button function starts here=== //
async function fetchCurrentData(position) {
  const lat = position.coords.latitude;
  console.log(lat);
  const lon = position.coords.longitude;
  console.log(lon);

  // ===Fetching current weather from current location starts here=== //
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  try {
    const response = await fetch(apiUrl);
    console.log(response);
    if (!response.ok) {
      throw new Error("City not Found");
    }
    const data = await response.json();
    console.log("weatherData = ", data);

    const date = new Date();
    const fullDate = `${date.getDate()}, ${
      months[date.getMonth()]
    } ${date.getFullYear()}`;
    console.log(fullDate);

    mainDate.innerHTML = fullDate;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    current_weather.innerHTML = data.weather[0].main;
    current_temperature.innerHTML = (data.main.temp - 273.15).toFixed(0);
    city.innerHTML = data.name;
    country.innerHTML = data.sys.country;
    temperature.innerHTML = (data.main.temp - 273.15).toFixed(0);
    windSpeed.innerHTML = data.wind.speed;
    humidity.innerHTML = data.main.humidity;
    visibility.innerHTML = data.visibility / 1000;
  } catch (error) {
    console.error("Error while fetching weather data: ", error);
  }
  // ===Fetching current weather from current location ends here=== //

  // ===Fetching forecast weather from current location starts here=== //
  const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  try {
    const nextSixDays = forecastDays();

    const forecastResponse = await fetch(forecastApiUrl);
    console.log(forecastResponse);
    if (!forecastResponse.ok) {
      throw new Error("City not Found");
    }
    const forecastData = await forecastResponse.json();
    console.log("forecastData = ", forecastData);
    let sixDaysForecast = [];
    let forcastDays = forecastData.list.filter((forecastday) => {
      let forecastDate = new Date(forecastday.dt_txt).getDate();
      if (!sixDaysForecast.includes(forecastDate)) {
        return sixDaysForecast.push(forecastDate);
      }
    });
    console.log(forcastDays);
    forecastCards.innerHTML = "";
    for (let forecastDay of forcastDays) {
      let date = new Date(forecastDay.dt_txt);
      const fullDate = `${date.getDate()}, ${
        months[date.getMonth()]
      } ${date.getFullYear()}`;

      forecastCards.innerHTML += `
<div>
              <div
                class="flex flex-col bg-white/20 backdrop-blur-sm rounded p-4 w-full"
              >
                <!-- forecast day -->
                <div id="forecastDays" class="font-bold text-white text-xl">
                ${days[date.getDay()]}
                </div>
                <!-- forecast date -->
                <div id="forecastDate" class="text-sm text-[#a8b9d7]">
                  ${fullDate}
                </div>
                <!-- forecast icon -->
                <div
                  class="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24"
                >
                  <img
              class="md:w-40 w-20 h-4w-25"
              src="https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
            />
                </div>
                <div class="flex flex-row items-center justify-center mt-6">
                  <!-- forecast temperature -->
                  <div
                    
                    class="font-medium text-6xl text-white"
                  >
                    <span id="forecastTemperature">${(
                      forecastDay.main.temp - 273.15
                    ).toFixed(0)}</span>°
                  </div>
                  <div class="flex flex-col items-center ml-6">
                    <!-- forecast weather -->
                    <div id="forecastWeather" class="text-white">${
                      forecastDay.weather[0].description
                    }</div>
                    <!-- max temperature -->
                    <div class="mt-1">
                      <span class="text-sm font-thin text-[#a8b9d7]"
                        ><i class="fa-solid fa-arrow-up"></i
                      ></span>
                      <span
                        id="forecastMaxTemp"
                        class="text-sm font-light text-[#a8b9d7]"
                        ><span>${(forecastDay.main.temp_max - 273.15).toFixed(
                          2
                        )}</span>°C</span
                      >
                    </div>
                    <!-- min temperature -->
                    <div>
                      <span class="text-sm text-[#a8b9d7]"
                        ><i class="fa-solid fa-arrow-down"></i
                      ></span>
                      <span
                        id="forecastMinTemp"
                        class="text-sm font-light text-[#a8b9d7]"
                        ><span>${(forecastDay.main.temp_min - 273.15).toFixed(
                          2
                        )}</span>°C</span
                      >
                    </div>
                  </div>
                </div>
                <!-- forecast weather information -->
                <div class="flex flex-row justify-between mt-6">
                  <div class="flex flex-col items-center">
                    <div class="font-medium text-sm text-white">Wind</div>
                    <div id="forecastWind" class="text-sm text-[#a8b9d7]">
                      <span>${forecastDay.wind.speed}</span>m/s
                    </div>
                  </div>
                  <div class="flex flex-col items-center">
                    <div class="font-medium text-sm text-white">Humidity</div>
                    <div id="forecastHumidity" class="text-sm text-[#a8b9d7]">
                      <span>${forecastDay.main.humidity}</span>%
                    </div>
                  </div>
                  <div class="flex flex-col items-center">
                    <div class="font-medium text-sm text-white">Visibility</div>
                    <div id="forecastVisibility" class="text-sm text-[#a8b9d7]">
                      <span>${forecastDay.visibility / 1000}km</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
`;
    }
  } catch (error) {
    console.error("Error while fetching weather data: ", error);
  }
  // ===Fetching forecast weather from current location ends here=== //
}
// === current location button function ends here=== //

// ===Search button functionality starts here=== //
searchBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    citySearched.forEach((inp) => {
      const city = inp.value;
      if (city) {
        if (city) {
          const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
          fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);

              let { name, lat, lon, country, state } = data[0];
              fetchWeather(name, lat, lon, country, state);
            });
        } else {
          console.log("Please enter a city name");
        }
      }
    });
  });
});
// ===Search button functionality ends here=== //

// ===current location button functionality starts here=== //
currentBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(fetchCurrentData);
    } else {
      console.log("GeoLocation is not supported");
    }
  });
});
// ===current location button functionality ends here=== //

function forecastDays() {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();
  const sixForecastDays = [];
  for (let i = 0; i < 6; i++) {
    const nextDay = new Date();
    nextDay.setDate(today.getDate() + i);
    const dayOfWeek = daysOfWeek[nextDay.getDay()];
    sixForecastDays.push(dayOfWeek);
  }
  return sixForecastDays;
}
