//Elementleri Seçmek
const container = document.querySelector(".container");
const searchInput = document.querySelector("#searchInput");
const cityName = document.querySelector(".cityName");
const degree = document.querySelector(".degree");
const desc = document.querySelector(".desc");

const weatherApi = new WeatherAPI();

searchInput.addEventListener("keypress", getWeatherInfo);


function getWeatherInfo(e) {
    if (e.key === 'Enter') {
        const cityNameValue = searchInput.value.trim();
        
        if (!cityNameValue) {
            showMessage("Lütfen bir şehir adı giriniz!", "error");
            return;
        }
        
        cityName.textContent = "Yükleniyor...";
        degree.textContent = "...";
        desc.textContent = "...";
        
        weatherApi.getWeatherInfo(cityNameValue)
            .then((data) => {
                if (data.cod === "404" || data.message === "city not found") {
                    showMessage("Şehir bulunamadı. Lütfen geçerli bir şehir adı giriniz.", "error");
                    const cityNameEl = document.querySelector(".cityName");
                    cityNameEl.textContent = "Şehir bulunamadı";
                    degree.textContent = "--";
                    desc.textContent = "--";
                } else if (data.cod === 200) {
                    displayInfos(data);
                    showMessage("Hava durumu başarıyla yüklendi!", "success");
                } else {
                    throw new Error(data.message || "Bilinmeyen hata");
                }
            })
            .catch((error) => {
                showMessage("Hava durumu bilgisi alınırken bir hata oluştu. Lütfen tekrar deneyin.", "error");
                const cityNameEl = document.querySelector(".cityName");
                cityNameEl.textContent = "Hata";
                degree.textContent = "--";
                desc.textContent = "--";
            });
    }
}

function showMessage(message, type = "error") {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        background-color: ${type === "error" ? "#dc3545" : "#28a745"};
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = "slideOut 0.3s ease";
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}


function displayInfos(data) {
    const cityNameEl = document.querySelector(".cityName");
    const degreeEl = document.querySelector(".degree");
    const descEl = document.querySelector(".desc");
    
    cityNameEl.textContent = data.name;
    degreeEl.textContent = `${Math.round(data.main.temp)}°`;
    descEl.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
    clearInputs();
}

function clearInputs(){
    searchInput.value="";
}