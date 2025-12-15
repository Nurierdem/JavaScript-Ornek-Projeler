//Elementleri Seçmek
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const closeModal = document.getElementById("closeModal");

const movieApi = new MovieAPI();
runEventListeners();


function runEventListeners(){
    document.addEventListener("DOMContentLoaded" ,movieApi.getPopularMovies());
    form.addEventListener("submit", getMoviesByName);
    closeModal.addEventListener("click", () => movieApi.closeMovieDetail());
    
    // Modal dışına tıklanınca kapat
    const modal = document.getElementById("movieDetailModal");
    modal.addEventListener("click", (e) => {
        if(e.target.classList.contains('modal-overlay') || e.target.classList.contains('movie-detail-modal')){
            movieApi.closeMovieDetail();
        }
    });
    
    // ESC tuşu ile kapat
    document.addEventListener("keydown", (e) => {
        if(e.key === 'Escape' && modal.classList.contains('active')){
            movieApi.closeMovieDetail();
        }
    });
}


function getMoviesByName(e){
    const movieName = searchInput.value.trim();
    movieApi.getMoviesByName(movieName);

   e.preventDefault();
}