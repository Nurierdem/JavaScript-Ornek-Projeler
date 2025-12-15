const container = document.querySelector(".container");
const selectMovie = document.querySelector("#selectMovie");
const count = document.querySelector("#count");
const amount = document.querySelector("#amount");
const seats = Array.from(document.querySelectorAll(".seat"));
const buyButton = document.querySelector("#buyButton");
const clearButton = document.querySelector("#clearButton");

runEventListeners();


function runEventListeners() {
    container.addEventListener("click", select);
    selectMovie.addEventListener("change",changeMovie);
    document.addEventListener("DOMContentLoaded" , runPageLoaded);
    buyButton.addEventListener("click",buyTicket);
    clearButton.addEventListener("click",clearSelections);
}


function runPageLoaded(){
    const selectedSeatsIndex = Storagex.getSelectedSeatsFromStorage();
    const fullSeatsIndex = Storagex.getFullSeatsFromStorage();

    seats.forEach((seat, index) => {
        if(selectedSeatsIndex.includes(index)){
            seat.classList.add("selected");
        }
        if(fullSeatsIndex.includes(index)){
            seat.classList.add("full");
        }
    });

    const savedMovieIndex = Storagex.getSelectedMovieIndexFromStorage();
    if(savedMovieIndex !== null && savedMovieIndex !== undefined){
        selectMovie.selectedIndex = savedMovieIndex;
    }
    calculate();
}

function buyTicket(){
    const selectedSeats = getSelectedSeats();
    if(selectedSeats.length === 0){
        alert("Lütfen en az bir koltuk seçin!");
        return;
    }
    
    if(confirm("Satın almak istiyor musunuz ?")){
       const selectedSeatsIndex = getSelectedSeatsIndex();
       selectedSeats.forEach(seat => {
        seat.classList.remove("selected");
        seat.classList.add("full");
       });
       Storagex.addFullSeatToStorage(selectedSeatsIndex);
       Storagex.addSelectedSeatToStorage([]);
       calculate();
       alert("Bilet satın alma işlemi tamamlandı!");
    }
}

function clearSelections(){
    const selectedSeats = getSelectedSeats();
    if(selectedSeats.length === 0){
        alert("Temizlenecek seçim bulunmuyor!");
        return;
    }
    
    if(confirm("Seçimleri temizlemek istiyor musunuz?")){
        selectedSeats.forEach(seat => {
            seat.classList.remove("selected");
        });
        Storagex.addSelectedSeatToStorage([]);
        calculate();
    }
}

function select(e) {
    const selectedElement = e.target.parentElement;
    if (selectedElement.classList.contains("seat") && !selectedElement.classList.contains("full")) {
        selectedElement.classList.toggle("selected");
        calculate();
        saveSelectedSeatsIndexToStorage();
        saveSelectedMovieIndexToStorage();
    }
}

function changeMovie(){
    calculate();
    saveSelectedMovieIndexToStorage();
}

function getSelectedSeats(){
    return [...container.querySelectorAll(".selected")];
}

function getSelectedSeatsIndex(){
    const selectedList = getSelectedSeats();
    return selectedList.map(seat => seats.indexOf(seat));
}

function saveSelectedSeatsIndexToStorage(){
    const selectedSeatsIndex = getSelectedSeatsIndex();
    Storagex.addSelectedSeatToStorage(selectedSeatsIndex);
}

function saveSelectedMovieIndexToStorage(){
    const selectedMovieIndex = selectMovie.selectedIndex;
    Storagex.addSelectedMovieToStorage(selectedMovieIndex);
}


function calculate() {
    const selectedSeatsCount = getSelectedSeats().length;
    const price = Number(selectMovie.value);

    count.textContent = selectedSeatsCount;
    amount.textContent = (selectedSeatsCount * price).toFixed(2);
}