class Currency{
    constructor(){
        // CONFIG kontrolü
        if (typeof CONFIG === 'undefined') {
            this.apiKey = null;
            this.url = null;
            return;
        }
        
        if (!CONFIG.CURRENCY_API_KEY || CONFIG.CURRENCY_API_KEY === "YOUR_CURRENCY_API_KEY_HERE") {
            this.apiKey = null;
            this.url = null;
        } else {
            this.apiKey = CONFIG.CURRENCY_API_KEY;
            this.url = `https://api.freecurrencyapi.com/v1/latest?apikey=${this.apiKey}&base_currency=`;
        }
    }

  async  exchange(amount , firstCurrency , secondCurrency){
    try {
      // API key kontrolü
      if (!this.apiKey || this.apiKey === "YOUR_CURRENCY_API_KEY_HERE" || !this.url) {
        throw new Error("API key bulunamadı. Lütfen config.js dosyasını kontrol edin ve kendi API key'inizi ekleyin.");
      }

      const response = await fetch(`${this.url}${firstCurrency}`);
      
      // Response text'i al (hata durumunda JSON parse hatası olabilir)
      const responseText = await response.text();
      let result;
      
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error(`API yanıtı parse edilemedi: ${responseText.substring(0, 100)}`);
      }
      
      if (!response.ok) {
        // API hata mesajını kontrol et
        if (result.errors && result.errors.length > 0) {
          throw new Error(result.errors[0].message || `API Hatası: ${response.status}`);
        }
        throw new Error(`API Hatası: ${response.status} - ${result.message || response.statusText}`);
      }
      
      // API response kontrolü
      if (result.errors) {
        throw new Error(result.errors[0]?.message || "API hatası");
      }
      
      if (!result.data) {
        throw new Error("API'den veri alınamadı. API key'inizi kontrol edin.");
      }
      
      if (!result.data[secondCurrency]) {
        throw new Error(`Döviz kuru bulunamadı: ${secondCurrency}. Desteklenen para birimlerini kontrol edin.`);
      }
      
      const exchangedResult = amount * result.data[secondCurrency];
      return exchangedResult;
    } catch (error) {
      throw error;
    }
  }
}