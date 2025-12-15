# 🔑 API Key Kurulum Rehberi

Bu dosya, API key gerektiren tüm projeler için detaylı kurulum talimatlarını içermektedir.

## 📋 API Key Gerektiren Projeler

### 1. 🔍 Resim Arama Uygulaması - Unsplash API

**API Key Alma:**
1. [Unsplash Developers](https://unsplash.com/developers) adresine gidin
2. "Register as a developer" butonuna tıklayın
3. Uygulamanızı oluşturun
4. Access Key'inizi kopyalayın

**Kurulum:**
```javascript
// 1.Resim Bulma Projesi/1.search-app/config.js
const CONFIG = {
    UNSPLASH_API_KEY: "YOUR_ACCESS_KEY_HERE"
};
```

**Limit:** 50 istek/saat (ücretsiz plan)

---

### 2. 💱 Döviz Kuru Çevirici - FreeCurrencyAPI

**API Key Alma:**
1. [FreeCurrencyAPI.com](https://freecurrencyapi.com/) adresine gidin
2. "Get Free API Key" butonuna tıklayın
3. E-posta ile kayıt olun
4. Dashboard'dan API key'inizi kopyalayın

**Kurulum:**
```javascript
// 2.Döviz Kuru Projesi/2.currency-app/config.js
const CONFIG = {
    CURRENCY_API_KEY: "YOUR_API_KEY_HERE"
};
```

**Limit:** 300 istek/gün (ücretsiz plan)

---

### 3. ☀️ Hava Durumu Uygulaması - OpenWeatherMap

**API Key Alma:**
1. [OpenWeatherMap](https://openweathermap.org/api) adresine gidin
2. "Sign Up" butonuna tıklayın
3. Ücretsiz hesap oluşturun
4. API Keys sekmesinden API key'inizi kopyalayın (yaklaşık 2 saat sonra aktif olur)

**Kurulum:**
```javascript
// 5.Hava Durumu Projesi/5.weather-app/config.js
const CONFIG = {
    WEATHER_API_KEY: "YOUR_API_KEY_HERE"
};
```

**Limit:** 60 istek/dakika (ücretsiz plan)

---

### 4. 🎥 Film Arama Uygulaması - TMDB

**API Key Alma:**
1. [TMDB](https://www.themoviedb.org/) adresine gidin
2. Hesap oluşturun
3. [Settings > API](https://www.themoviedb.org/settings/api) sayfasına gidin
4. "Request an API Key" butonuna tıklayın
5. "Developer" seçeneğini seçin
6. Formu doldurun ve API key'inizi alın

**Kurulum:**
```javascript
// 6.Film Projesi/6.movie-app/config.js
const CONFIG = {
    TMDB_API_KEY: "YOUR_API_KEY_HERE"
};
```

**Limit:** Sınırsız (ücretsiz plan)

---

## 🚀 Hızlı Kurulum

Her proje için aynı adımları izleyin:

1. İlgili proje klasörüne gidin
2. `config.example.js` dosyasını bulun
3. Dosyayı kopyalayın ve `config.js` olarak kaydedin
4. API key'inizi `YOUR_API_KEY_HERE` yerine yapıştırın
5. Dosyayı kaydedin
6. Tarayıcıda sayfayı yenileyin

## ⚠️ Önemli Notlar

- ✅ `config.js` dosyaları `.gitignore` içinde yer alır (GitHub'a yüklenmez)
- ✅ API key'lerinizi asla paylaşmayın
- ✅ Ücretsiz plan limitlerini aşmamaya dikkat edin
- ✅ API key'lerinizi düzenli olarak kontrol edin

## 🆘 Sorun Giderme

**"API key bulunamadı" hatası alıyorsanız:**
- `config.js` dosyasının doğru klasörde olduğundan emin olun
- API key'in doğru kopyalandığından emin olun (boşluk olmamalı)
- Tarayıcı konsolunu (F12) kontrol edin
- Sayfayı hard refresh yapın (Ctrl+F5 veya Cmd+Shift+R)

**API limit hatası alıyorsanız:**
- Ücretsiz plan limitinizi kontrol edin
- Bir süre bekleyip tekrar deneyin
- Gerekirse ücretli plana geçin

## 📚 Alternatif API'ler

Eğer bir API key almak istemiyorsanız, bazı projeler için alternatif API'ler kullanılabilir:

- **Döviz Kuru:** ExchangeRate-API (API key gerektirmez, ancak limitli)
- **Hava Durumu:** WeatherAPI (alternatif servis)

Bu alternatifleri eklemek isterseniz, lütfen issue açın.

