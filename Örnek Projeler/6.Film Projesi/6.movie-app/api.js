class MovieAPI{
    constructor(){
        if (typeof CONFIG === 'undefined' || !CONFIG.TMDB_API_KEY || CONFIG.TMDB_API_KEY === "YOUR_TMDB_API_KEY_HERE" || CONFIG.TMDB_API_KEY === "") {
            console.warn("TMDB API key bulunamadı. Lütfen config.js dosyasına kendi API key'inizi ekleyin.");
        }
        this.apiKey = CONFIG ? CONFIG.TMDB_API_KEY : "";
        this.baseImageURL = "https://image.tmdb.org/t/p/w1280/";
        this.posterImageURL = "https://image.tmdb.org/t/p/w500/";
        this.popularURL = `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=tr-TR&sort_by=popularity.desc`;
        this.searchURL =`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=`;
        this.detailURL = `https://api.themoviedb.org/3/movie/`;
        this.movies = document.querySelector(".movies");
        this.modal = document.getElementById("movieDetailModal");
        this.modalContent = document.getElementById("movieDetailContent");
    }


   async getPopularMovies(){
    try {
        if (!this.apiKey || this.apiKey === "" || this.apiKey === "YOUR_TMDB_API_KEY_HERE") {
            throw new Error("API key bulunamadı. Lütfen config.js dosyasına kendi API key'inizi ekleyin.");
        }
        const response = await fetch(this.popularURL);
        if (!response.ok) {
            throw new Error(`API Hatası: ${response.status}`);
        }
        const movies = await response.json();
        if (movies.success === false) {
            throw new Error(movies.status_message || "Filmler yüklenemedi");
        }
        this.displayInfo(movies);
    } catch (error) {
        console.error("Popüler filmler yüklenirken hata:", error);
        this.movies.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: white;">
                <i class="fas fa-exclamation-triangle" style="font-size: 64px; margin-bottom: 20px; opacity: 0.5;"></i>
                <h2 style="font-size: 24px; margin-bottom: 10px;">Filmler yüklenemedi</h2>
                <p style="font-size: 16px; opacity: 0.8;">${error.message || "Lütfen API key'inizi kontrol edin ve tekrar deneyin."}</p>
            </div>
        `;
    }
    }

    async getMoviesByName(movieName){
      try {
          if (!movieName || movieName.trim() === "") {
              this.getPopularMovies();
              return;
          }
          const response = await fetch(this.searchURL+movieName);
          if (!response.ok) {
              throw new Error(`API Hatası: ${response.status}`);
          }
          const movies = await response.json();
          this.displayInfo(movies);
      } catch (error) {
          console.error("Film arama hatası:", error);
          this.movies.innerHTML = `
              <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: white;">
                  <i class="fas fa-exclamation-triangle" style="font-size: 64px; margin-bottom: 20px; opacity: 0.5;"></i>
                  <h2 style="font-size: 24px; margin-bottom: 10px;">Arama yapılamadı</h2>
                  <p style="font-size: 16px; opacity: 0.8;">Bir hata oluştu. Lütfen tekrar deneyin.</p>
              </div>
          `;
      }
    }


    displayInfo(movies){
        this.movies.innerHTML="";

        if (!movies.results || movies.results.length === 0) {
            this.movies.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: white;">
                    <i class="fas fa-film" style="font-size: 64px; margin-bottom: 20px; opacity: 0.5;"></i>
                    <h2 style="font-size: 24px; margin-bottom: 10px;">Film bulunamadı</h2>
                    <p style="font-size: 16px; opacity: 0.8;">Aradığınız kriterlere uygun film bulunamadı. Lütfen farklı bir arama yapın.</p>
                </div>
            `;
            return;
        }

        movies.results.forEach(movie =>{
            const posterUrl = movie.poster_path 
                ? `${this.baseImageURL}${movie.poster_path}` 
                : 'https://via.placeholder.com/280x420/667eea/ffffff?text=No+Image';
            
            const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
            const rating = Math.round(movie.vote_average * 10) / 10;
            const ratingPercent = (movie.vote_average / 10) * 100;
            
            const movieCard = document.createElement('div');
            movieCard.className = 'movie';
            movieCard.setAttribute('data-movie-id', movie.id);
            movieCard.innerHTML = `
                <div style="position: relative; overflow: hidden;">
                    <img class="moviePicture" src="${posterUrl}" alt="${movie.title}" 
                         onerror="this.src='https://via.placeholder.com/280x420/667eea/ffffff?text=No+Image'">
                    <div class="poster-overlay"></div>
                    <div class="rating-badge ${this.changeColor(movie.vote_average)}" 
                         style="position: absolute; top: 10px; right: 10px; z-index: 3;">
                        <div class="rating-circle">
                            <svg class="rating-svg" viewBox="0 0 36 36">
                                <path class="rating-circle-bg" d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                <path class="rating-circle-progress" 
                                      stroke-dasharray="${ratingPercent}, 100"
                                      d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"/>
                            </svg>
                            <div class="rating-value">${rating}</div>
                        </div>
                    </div>
                </div>
                <div class="info">
                    <h4 class="movieName">${movie.title}</h4>
                    <div style="display: flex; align-items: center; gap: 10px; margin-top: 5px;">
                        <span style="font-size: 14px; color: #666; font-weight: 500;">
                            <i class="fas fa-calendar"></i> ${releaseYear}
                        </span>
                        ${movie.vote_count ? `
                        <span style="font-size: 14px; color: #666; font-weight: 500;">
                            <i class="fas fa-users"></i> ${movie.vote_count.toLocaleString()}
                        </span>
                        ` : ''}
                    </div>
                </div>
            `;
            
            movieCard.addEventListener('click', () => {
                this.showMovieDetail(movie.id);
            });
            
            this.movies.appendChild(movieCard);
        })
    }

    changeColor(imdbPoint){
        if(imdbPoint>=8){
            return "green";
        }
        else if(imdbPoint>=7){
            return "yellow";
        }
        return "red";
    }

    async showMovieDetail(movieId){
        try {
            const response = await fetch(`${this.detailURL}${movieId}?api_key=${this.apiKey}&language=tr-TR`);
            if (!response.ok) {
                throw new Error(`API Hatası: ${response.status}`);
            }
            const movie = await response.json();
            if (movie.success === false) {
                throw new Error(movie.status_message || "Film detayı alınamadı");
            }
            this.displayMovieDetail(movie);
        } catch (error) {
            console.error("Film detayı yüklenirken hata:", error);
            alert("Film detayı yüklenirken bir hata oluştu. Lütfen tekrar deneyin.");
        }
    }

    displayMovieDetail(movie){
        const backdropUrl = movie.backdrop_path 
            ? `${this.baseImageURL}${movie.backdrop_path}` 
            : '';
        const posterUrl = movie.poster_path 
            ? `${this.posterImageURL}${movie.poster_path}` 
            : 'https://via.placeholder.com/500x750/667eea/ffffff?text=No+Image';
        
        const rating = Math.round(movie.vote_average * 10) / 10;
        const ratingPercent = (movie.vote_average / 10) * 100;
        const releaseDate = movie.release_date ? new Date(movie.release_date).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }) : 'Bilinmiyor';
        
        const genres = movie.genres ? movie.genres.map(g => g.name).join(', ') : 'Bilinmiyor';
        const runtime = movie.runtime ? `${movie.runtime} dakika` : 'Bilinmiyor';
        const budget = movie.budget ? `$${movie.budget.toLocaleString()}` : 'Bilinmiyor';
        const revenue = movie.revenue ? `$${movie.revenue.toLocaleString()}` : 'Bilinmiyor';
        
        this.modalContent.innerHTML = `
            <div class="detail-backdrop" style="background-image: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url('${backdropUrl}');">
                <div class="detail-container">
                    <div class="detail-poster">
                        <img src="${posterUrl}" alt="${movie.title}" 
                             onerror="this.src='https://via.placeholder.com/500x750/667eea/ffffff?text=No+Image'">
                    </div>
                    <div class="detail-info">
                        <h1 class="detail-title">${movie.title}</h1>
                        ${movie.tagline ? `<p class="detail-tagline">${movie.tagline}</p>` : ''}
                        
                        <div class="detail-meta">
                            <div class="detail-rating ${this.changeColor(movie.vote_average)}">
                                <div class="rating-circle-large">
                                    <svg class="rating-svg-large" viewBox="0 0 36 36">
                                        <path class="rating-circle-bg" d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                        <path class="rating-circle-progress" 
                                              stroke-dasharray="${ratingPercent}, 100"
                                              d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                    </svg>
                                    <div class="rating-value-large">${rating}</div>
                                </div>
                                <div class="rating-info">
                                    <span class="rating-text">${movie.vote_average.toFixed(1)} / 10</span>
                                    <span class="rating-count">${movie.vote_count ? movie.vote_count.toLocaleString() : 0} oy</span>
                                </div>
                            </div>
                            
                            <div class="detail-stats">
                                <div class="stat-item">
                                    <i class="fas fa-calendar"></i>
                                    <span>${releaseDate}</span>
                                </div>
                                <div class="stat-item">
                                    <i class="fas fa-clock"></i>
                                    <span>${runtime}</span>
                                </div>
                                <div class="stat-item">
                                    <i class="fas fa-film"></i>
                                    <span>${genres}</span>
                                </div>
                            </div>
                        </div>
                        
                        ${movie.overview ? `
                        <div class="detail-overview">
                            <h3>Özet</h3>
                            <p>${movie.overview}</p>
                        </div>
                        ` : ''}
                        
                        <div class="detail-extra">
                            ${movie.budget > 0 ? `
                            <div class="extra-item">
                                <span class="extra-label">Bütçe</span>
                                <span class="extra-value">${budget}</span>
                            </div>
                            ` : ''}
                            ${movie.revenue > 0 ? `
                            <div class="extra-item">
                                <span class="extra-label">Hasılat</span>
                                <span class="extra-value">${revenue}</span>
                            </div>
                            ` : ''}
                            ${movie.production_companies && movie.production_companies.length > 0 ? `
                            <div class="extra-item">
                                <span class="extra-label">Yapımcı</span>
                                <span class="extra-value">${movie.production_companies[0].name}</span>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeMovieDetail(){
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}