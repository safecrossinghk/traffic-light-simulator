async function fetchWeather() {
  const weatherElement = document.getElementById("weather-info");
  const warningElement = document.getElementById("warning-info");

  try {
    const weatherRes = await fetch("https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=tc");
    const weatherData = await weatherRes.json();

    const temp = weatherData.temperature.data[0].value;
    const condition = weatherData.icon[0];
    const conditionMap = {
      "50": "天晴", "51": "大致天晴", "52": "局部多雲", "53": "天陰",
      "60": "有雨", "61": "狂風雷暴", "62": "驟雨", "63": "大雨",
      "64": "雷雨", "65": "暴雨"
    };

    const description = conditionMap[condition] || "天氣狀況不詳";
    weatherElement.innerText = `現時氣溫：${temp}°C，天氣狀況：${description}`;
  } catch (error) {
    weatherElement.innerText = "無法載入天氣資料。";
  }

  try {
    const warningRes = await fetch("https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warnsum&lang=tc");
    const warningData = await warningRes.json();

    if (warningData.Summary) {
      warningElement.innerText = warningData.Summary;
    } else {
      warningElement.innerText = "目前沒有天氣警告。";
    }
  } catch (error) {
    warningElement.innerText = "無法載入天氣警告。";
  }
}

fetchWeather();
setInterval(fetchWeather, 300000);

function playAudio(lang) {
  let audio = new Audio(lang === "cantonese" ? "audio_cantonese.mp3" : "audio_english.mp3");
  audio.play();
}
