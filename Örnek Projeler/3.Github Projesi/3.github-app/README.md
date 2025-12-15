# 👤 GitHub Kullanıcı Arama Uygulaması

GitHub kullanıcı profillerini arayabileceğiniz ve detaylarını görüntüleyebileceğiniz web uygulaması.

## ✨ Özellikler

- GitHub kullanıcı profili arama
- Kullanıcı bilgileri (takipçi, repo sayısı, profil bilgileri)
- Repo listesi tablosu
- LocalStorage ile arama geçmişi
- Son aranan kullanıcılar listesi
- Bootstrap 4 ile modern tasarım

## 🚀 Kurulum

1. Projeyi klonlayın veya indirin
2. `index.html` dosyasını tarayıcıda açın
3. GitHub API kullanımı için herhangi bir API key gerekmez (public API)

## 📖 Kullanım

1. Arama kutusuna GitHub kullanıcı adını yazın
2. "Ara" butonuna tıklayın
3. Kullanıcı profil bilgileri görüntülenecektir
4. "Repoları Göster" linkine tıklayarak repo listesini görebilirsiniz
5. Son aranan kullanıcılar otomatik olarak kaydedilir

## 🛠️ Teknolojiler

- Vanilla JavaScript (ES6 Classes)
- GitHub API
- Bootstrap 4
- LocalStorage
- HTML5 / CSS3

## 📁 Proje Yapısı

```
3.github-app/
├── css/
│   ├── app.css
│   ├── header.css
│   ├── content.css
│   └── footer.css
├── js/
│   ├── main.js
│   ├── github.js
│   ├── ui.js
│   └── storage.js
├── images/
└── index.html
```

## 📝 Notlar

- GitHub API rate limit: Saatte 60 istek (authenticated olmadan)
- Arama geçmişi tarayıcınızın LocalStorage'ında saklanır

