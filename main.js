import "bootstrap/dist/css/bootstrap.min.css";
import { getWeatherData } from "./api.js";

const form = document.querySelector("#form");
const city = document.querySelector("#city");

// populate data in dom
const renderWeatherData = (data) => {
  const { location, current } = data;
  const { condition, humidity, wind_kph, uv, is_day } = current;
  const { icon, text } = condition;

  let dayStatus = is_day ? "Day" : "Night";
  let dayStatusIcon = is_day
    ? "/public/day-forecast-hot-svgrepo-com.svg"
    : "/public/night-sleep-svgrepo-com.svg";

  // Converting date to current time 12 hour format
  const localTime = new Intl.DateTimeFormat("default", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(location.localtime));

  /**
   * Template
   * today
   *  */
  document.querySelector("#today").innerHTML = `
  <div class="card mb-4 gradient-custom" style="border-radius: 10px;">
    <div class="card-body p-4">
      <div class="">
        <h5 class="text-uppercase">Current Weather</h5>
        <div class="">
          <div class="d-flex justify-content-between mb-1 pb-2">
            <div>
              <div>
                <time>Today ${localTime}</time> || ${dayStatus} 
                <img src="${dayStatusIcon}" width="20"/>
              </div>
              <h2 class="display-2"><strong>${current.temp_c}°C</strong></h2>
              <p class="text-muted mb-0">${location.name}, ${location.country}</p>
            </div>
            <div class="">
              <img src="${icon}" width="100px">
              <p>${text}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-between">
        <div>
          <div class="d-flex align-items-center gap-2">
            <img src="./public/humidity-air-conditining-ac-conditioner-split-ac-indoor-ac-svgrepo-com.svg"
              width="50" />
            <span class="fs-3"> Humidity: ${humidity}%</span>
          </div>
          <div class="d-flex mt-2 pt-2 border-top align-items-center gap-2">
            <img src="./public/uv-index-alt-svgrepo-com.svg"
              width="50" />
            <span class="fs-3"> UV: ${uv}</span>
          </div>
        </div>
        <div>
          <div class="d-flex align-items-center gap-2">
            <img src="./public/wind-svgrepo-com.svg" width="40" />
            <span class="fs-3">Wind: ${wind_kph}/kph</span>
          </div>
          <div class="text-end mt-4">
          <button type="button" class="btn btn-info" id="more">More data</button>
        </div>
        </div>
      </div>
    </div>
  </div>
  `;

  // reset more data
  document.getElementById("list").innerHTML = ``;

  // load more data
  document.getElementById("more").addEventListener("click", () => {
    let items = "";
    for (const item in current) {
      if (Object.hasOwnProperty.call(current, item)) {
        const element = current[item];
        let itemDta = item.split("_").join(" ").toUpperCase();
        if (
          typeof element !== "object" &&
          !Array.isArray(element) &&
          element !== null
        ) {
          items += `
            <li class="list-group-item">
              <div class="row">
                <div class="col border-end">
                  ${itemDta}
                </div>
                <div class="col">
                  <span class="badge col bg-success">${element}</span>
                </div>
              </div>
            </li>
          `;
        }
      }
    }

    document.getElementById("list").innerHTML = `
      <ul class="list-group">
        ${items}
      </ul>
    `;
  });
};

// getting user location using form input
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = city.value;

  try {
    const weatherData = await getWeatherData(location);
    renderWeatherData(weatherData);
  } catch (error) {
    console.error("Error:", error);
  }
});

// Call default location
window.addEventListener("load", async (e) => {
  e.preventDefault();
  try {
    renderWeatherData(await getWeatherData());
  } catch (error) {
    console.error("Error:", error);
  }
});
