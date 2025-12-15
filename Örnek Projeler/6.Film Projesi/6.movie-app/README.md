# 🎥 Film Arama Uygulaması

The Movie Database (TMDB) API kullanarak film arayabileceğiniz ve popüler filmleri listeleyebileceğiniz web uygulaması.

## ✨ Özellikler

- Popüler filmleri listeleme
- Film arama
- IMDB puanına göre renklendirme (yeşil/sarı/kırmızı)
- Film posterleri
- Modern ve koyu tema tasarım

## 🚀 Kurulum

1. Projeyi klonlayın veya indirin
2. `config.example.js` dosyasını `config.js` olarak kopyalayın
3. [TMDB](https://www.themoviedb.org/settings/api) adresinden API key alın
4. `config.js` dosyasına API key'inizi ekleyin:

```javascript
const CONFIG = {
    TMDB_API_KEY: "YOUR_API_KEY_HERE"
};
```

## 📖 Kullanım

1. Sayfa açıldığında popüler filmler otomatik olarak yüklenir
2. Sağ üstteki arama kutusuna film adını yazın
3. Enter tuşuna basın veya formu gönderin
4. Film sonuçları görüntülenecektir

## 🛠️ Teknolojiler

- Vanilla JavaScript (ES6 Classes)
- The Movie Database (TMDB) API
- HTML5 / CSS3

## 📝 Notlar

- API key'inizi asla GitHub'a yüklemeyin
- `config.js` dosyası `.gitignore` içinde yer almaktadır
- IMDB puanı renklendirmesi:
  - 8+ : Yeşil
  - 7-8 : Sarı
  - 7- : Kırmızı

