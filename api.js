import axios from "axios";

const API_KEY = "8803de3c3f704e3dad1100434232006";

export const getWeatherData = async (location = "dhaka") => {
  let errorAlert = document.getElementById("error")
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=yes`
    );

    // remove error message if location valid
    errorAlert.innerHTML = ``

    return response.data;
  } catch (err) {
    // showing error message
    errorAlert.innerHTML = `
      <div class="alert alert-danger" role="alert">
        Pleas enter valid city name or zip code
      </div>
    `;
    throw err;
  }
};
