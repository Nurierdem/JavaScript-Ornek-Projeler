# 💱 Döviz Kuru Çevirici

Gerçek zamanlı döviz kuru çevirimi yapabileceğiniz web uygulaması.

## ✨ Özellikler

- 30+ para birimi desteği
- Gerçek zamanlı döviz kuru çevirimi
- Anlık hesaplama (input event)
- Modern ve kullanıcı dostu arayüz
- Hata yönetimi

## 🚀 Kurulum

1. Projeyi klonlayın veya indirin
2. `config.example.js` dosyasını `config.js` olarak kopyalayın
3. [FreeCurrencyAPI](https://freecurrencyapi.com/) adresinden API key alın
4. `config.js` dosyasına API key'inizi ekleyin:

```javascript
const CONFIG = {
    CURRENCY_API_KEY: "YOUR_API_KEY_HERE"
};
```

## 📖 Kullanım

1. Çevirmek istediğiniz miktarı girin
2. Kaynak para birimini seçin
3. Hedef para birimini seçin
4. Sonuç otomatik olarak hesaplanır

## 🛠️ Teknolojiler

- Vanilla JavaScript (ES6 Classes)
- FreeCurrencyAPI
- HTML5 / CSS3

## 📝 Notlar

- API key'inizi asla GitHub'a yüklemeyin
- `config.js` dosyası `.gitignore` içinde yer almaktadır

