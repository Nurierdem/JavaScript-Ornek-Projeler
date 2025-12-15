# ☀️ Hava Durumu Uygulaması

Şehir bazlı hava durumu bilgisi alabileceğiniz web uygulaması.

## ✨ Özellikler

- Şehir bazlı hava durumu sorgulama
- Sıcaklık ve açıklama gösterimi
- Modern ve responsive tasarım
- Hata yönetimi ve kullanıcı bildirimleri
- Arka plan görseli

## 🚀 Kurulum

1. Projeyi klonlayın veya indirin
2. `config.example.js` dosyasını `config.js` olarak kopyalayın
3. [OpenWeatherMap](https://openweathermap.org/api) adresinden API key alın
4. `config.js` dosyasına API key'inizi ekleyin:

```javascript
const CONFIG = {
    WEATHER_API_KEY: "YOUR_API_KEY_HERE"
};
```

## 📖 Kullanım

1. Arama kutusuna şehir adını yazın
2. Enter tuşuna basın
3. Hava durumu bilgileri görüntülenecektir

## 🛠️ Teknolojiler

- Vanilla JavaScript (ES6 Classes)
- OpenWeatherMap API
- HTML5 / CSS3

## 📝 Notlar

- API key'inizi asla GitHub'a yüklemeyin
- `config.js` dosyası `.gitignore` içinde yer almaktadır
- Şehir adlarını İngilizce veya Türkçe yazabilirsiniz

