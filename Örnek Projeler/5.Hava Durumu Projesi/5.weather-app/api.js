class WeatherAPI {
    constructor() {
        this.baseUrl = "https://api.openweathermap.org/data/2.5/weather";
        if (typeof CONFIG === 'undefined' || !CONFIG.WEATHER_API_KEY || CONFIG.WEATHER_API_KEY === "YOUR_WEATHER_API_KEY_HERE") {
            console.warn("OpenWeatherMap API key bulunamadı. Lütfen config.js dosyasına kendi API key'inizi ekleyin.");
        }
        this.apiKey = CONFIG ? CONFIG.WEATHER_API_KEY : "";
    }

    async getWeatherInfo(cityName) {
        try {
            if (!this.apiKey || this.apiKey === "YOUR_WEATHER_API_KEY_HERE") {
                throw new Error("API key bulunamadı. Lütfen config.js dosyasını kontrol edin.");
            }
            
            const response = await fetch(`${this.baseUrl}?q=${cityName}&units=metric&lang=tr&appid=${this.apiKey}`);
            
            if (!response.ok) {
                throw new Error(`API Hatası: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }
}