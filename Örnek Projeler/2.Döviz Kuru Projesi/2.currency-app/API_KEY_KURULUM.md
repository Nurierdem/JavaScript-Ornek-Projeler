# 🔑 API Key Kurulum Rehberi

## Adım 1: FreeCurrencyAPI'den API Key Alın

1. [FreeCurrencyAPI.com](https://freecurrencyapi.com/) adresine gidin
2. "Get Free API Key" butonuna tıklayın
3. E-posta adresinizle kayıt olun
4. E-postanıza gelen doğrulama linkine tıklayın
5. Dashboard'dan API key'inizi kopyalayın

## Adım 2: config.js Dosyasını Düzenleyin

1. `config.js` dosyasını bir metin editörü ile açın
2. `YOUR_CURRENCY_API_KEY_HERE` yazan yeri silin
3. Kendi API key'inizi yapıştırın:

```javascript
const CONFIG = {
    CURRENCY_API_KEY: "buraya-kendi-api-key-inizi-yapistirin"
};
```

## Adım 3: Dosyayı Kaydedin

Dosyayı kaydedin ve sayfayı yenileyin (F5).

## ⚠️ Önemli Notlar

- API key'inizi asla GitHub'a yüklemeyin
- `config.js` dosyası `.gitignore` içinde yer almaktadır
- Ücretsiz plan günlük 300 istek limitine sahiptir

## 🆘 Sorun mu yaşıyorsunuz?

- API key'in doğru kopyalandığından emin olun (boşluk olmamalı)
- Tarayıcı konsolunu (F12) kontrol edin
- Sayfayı yenileyin (Ctrl+F5 veya Cmd+Shift+R)

