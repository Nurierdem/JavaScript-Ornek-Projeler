# 🚀 JavaScript Örnek Projeler

Bu repository, vanilla JavaScript kullanılarak geliştirilmiş çeşitli web uygulamalarını içermektedir. Her proje, farklı JavaScript konseptlerini ve API entegrasyonlarını öğrenmek için tasarlanmıştır.

## 🔑 API Key Gereksinimleri

| Proje | API Key Gerekli | API Servisi | Ücretsiz Plan |
|-------|----------------|-------------|---------------|
| 🔍 Resim Arama | ✅ Evet | Unsplash | 50 istek/saat |
| 💱 Döviz Kuru | ✅ Evet | FreeCurrencyAPI | 300 istek/gün |
| 👤 GitHub Arama | ❌ Hayır | GitHub API | Sınırsız |
| 🎬 Sinema Bilet | ❌ Hayır | - | - |
| ☀️ Hava Durumu | ✅ Evet | OpenWeatherMap | 60 istek/dakika |
| 🎥 Film Arama | ✅ Evet | TMDB | Sınırsız |
| 🧮 Hesap Makinesi | ❌ Hayır | - | - |
| 🔐 Şifre | ❌ Hayır | - | - |
| ✅ Todo List | ❌ Hayır | - | - |

**📖 Detaylı API Key kurulum rehberi için:** [API_KEY_REHBERI.md](API_KEY_REHBERI.md)

**Not:** API key gerektiren projeler için `config.example.js` dosyasını `config.js` olarak kopyalayıp API key'inizi eklemeniz gerekmektedir.

## 📋 Proje Listesi

### 1. 🔍 [Resim Arama Uygulaması](1.Resim%20Bulma%20Projesi/1.search-app/)
Unsplash API kullanarak resim arama yapabileceğiniz modern bir web uygulaması.

**Özellikler:**
- Unsplash API entegrasyonu
- Modern ve responsive tasarım
- Hata yönetimi

### 2. 💱 [Döviz Kuru Çevirici](2.Döviz%20Kuru%20Projesi/2.currency-app/)
Gerçek zamanlı döviz kuru çevirimi yapabileceğiniz web uygulaması.

**Özellikler:**
- 30+ para birimi desteği
- Gerçek zamanlı hesaplama
- FreeCurrencyAPI entegrasyonu

### 3. 👤 [GitHub Kullanıcı Arama](3.Github%20Projesi/3.github-app/)
GitHub kullanıcı profillerini arayabileceğiniz ve detaylarını görüntüleyebileceğiniz web uygulaması.

**Özellikler:**
- GitHub API entegrasyonu
- Repo listesi
- LocalStorage ile arama geçmişi
- Bootstrap 4 tasarım

### 4. 🎬 [Sinema Bilet Uygulaması](4.Sinema%20Projesi/4.cinema-app/)
Sinema koltuk seçimi ve bilet satın alma simülasyonu yapabileceğiniz web uygulaması.

**Özellikler:**
- Koltuk seçimi sistemi
- Film seçimi ve fiyatlandırma
- LocalStorage ile durum saklama

### 5. ☀️ [Hava Durumu Uygulaması](5.Hava%20Durumu%20Projesi/5.weather-app/)
Şehir bazlı hava durumu bilgisi alabileceğiniz web uygulaması.

**Özellikler:**
- OpenWeatherMap API entegrasyonu
- Şehir bazlı sorgulama
- Modern tasarım

### 6. 🎥 [Film Arama Uygulaması](6.Film%20Projesi/6.movie-app/)
The Movie Database (TMDB) API kullanarak film arayabileceğiniz web uygulaması.

**Özellikler:**
- TMDB API entegrasyonu
- Popüler filmleri listeleme
- IMDB puanına göre renklendirme

### 7. 🧮 [Hesap Makinesi](7.Hesap%20Makinesi%20Projesi/)
Modern ve kullanıcı dostu bir hesap makinesi uygulaması.

**Özellikler:**
- 4 işlem desteği
- Ondalık sayı desteği
- ES6 Classes kullanımı

### 8. 🔐 [Şifre Uygulaması](8.Şifre%20Projesi/)
Base64 encoding/decoding yapabileceğiniz basit bir şifreleme uygulaması.

**Özellikler:**
- Base64 şifreleme/çözme
- Basit ve kullanıcı dostu arayüz

### 9. ✅ [Todo List Uygulaması](9.Todo%20List/)
Yapılacaklar listesi oluşturabileceğiniz ve yönetebileceğiniz web uygulaması.

**Özellikler:**
- Todo ekleme/silme
- Filtreleme
- LocalStorage entegrasyonu
- Bootstrap 4 tasarım

## 🛠️ Teknolojiler

- **Vanilla JavaScript** - Framework kullanmadan saf JavaScript
- **HTML5 / CSS3** - Modern web standartları
- **REST APIs** - Çeşitli API entegrasyonları
- **LocalStorage** - Tarayıcıda veri saklama
- **ES6+ Features** - Modern JavaScript özellikleri

## 📦 Kurulum

Her proje bağımsızdır ve kendi klasöründe bulunur. Projeyi kullanmak için:

1. İlgili proje klasörüne gidin
2. Proje README dosyasındaki kurulum talimatlarını takip edin
3. **API key gerektiren projeler için:**
   - `config.example.js` dosyasını `config.js` olarak kopyalayın
   - [API Key Rehberi](API_KEY_REHBERI.md) dosyasındaki talimatları takip ederek API key alın
   - `config.js` dosyasına API key'inizi ekleyin

**💡 İpucu:** API key gerektirmeyen projeleri hemen kullanmaya başlayabilirsiniz!

## ⚠️ Önemli Notlar

- **API Key'ler**: API key gerektiren projelerde `config.js` dosyası `.gitignore` içinde yer almaktadır. Kendi API key'lerinizi eklemeyi unutmayın.
- **Tarayıcı Desteği**: Tüm projeler modern tarayıcılarda çalışmaktadır (Chrome, Firefox, Safari, Edge).
- **LocalStorage**: Bazı projeler tarayıcınızın LocalStorage'ını kullanmaktadır.

## 📝 Lisans

Bu projeler eğitim amaçlıdır ve özgürce kullanılabilir.

## 🤝 Katkıda Bulunma

Hata bulursanız veya iyileştirme önerileriniz varsa, lütfen issue açın veya pull request gönderin.

## 📧 İletişim

Sorularınız için issue açabilirsiniz.

---

⭐ Bu repository'yi beğendiyseniz yıldız vermeyi unutmayın!


