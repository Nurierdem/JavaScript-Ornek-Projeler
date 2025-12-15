const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const buttonWrapper= document.querySelector(".button-wrapper");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imageListWrapper = document.querySelector(".imagelist-wrapper");

runEventListeners();

function runEventListeners(){
    form.addEventListener("submit" , search);
    clearButton.addEventListener("click", clear);
}

function clear(){
    searchInput.value="";
    Array.from(imageListWrapper.children).forEach((child)=>child.remove())
    // imageListWrapper.innerHTML="";
    
}

function search(e){
    e.preventDefault();
    const value = searchInput.value.trim();
    
    if (!value) {
        showMessage("Lütfen bir arama terimi giriniz!", "error");
        return;
    }
    
    if (!CONFIG.UNSPLASH_API_KEY || CONFIG.UNSPLASH_API_KEY === "YOUR_UNSPLASH_API_KEY_HERE") {
        showMessage("Lütfen config.js dosyasına kendi Unsplash API key'inizi ekleyin!", "error");
        return;
    }
    
    // Önceki sonuçları temizle
    clear();
    
    showMessage("Aranıyor...", "info");
    
    fetch(`https://api.unsplash.com/search/photos?query=${value}`,{
        method : "GET",
        headers : {
            Authorization : `Client-ID ${CONFIG.UNSPLASH_API_KEY}`
        }
    })
    .then((res)=> {
        if (!res.ok) {
            throw new Error(`API Hatası: ${res.status}`);
        }
        return res.json();
    })
    .then((data)=>{
        if (data.results && data.results.length > 0) {
            data.results.forEach((image)=>{
                addImageToUI(image.urls.small);
            });
            showMessage(`${data.results.length} resim bulundu!`, "success");
        } else {
            showMessage("Aradığınız kriterlere uygun resim bulunamadı.", "warning");
        }
    })
    .catch((err)=> {
        showMessage("Bir hata oluştu. Lütfen tekrar deneyin.", "error");
    });
}

function showMessage(message, type = "info") {
    // Mevcut mesajları temizle
    const existingMessage = document.querySelector(".message");
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement("div");
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        ${type === "error" ? "background-color: #dc3545;" : 
          type === "success" ? "background-color: #28a745;" : 
          type === "warning" ? "background-color: #ffc107; color: #000;" : 
          "background-color: #17a2b8;"}
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = "slideOut 0.3s ease";
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}


function addImageToUI(url){
    const div = document.createElement("div");
    div.className="card";

    const img = document.createElement("img");
    img.setAttribute("src", url);
    img.setAttribute("alt", "Arama sonucu");
    img.height='400';
    img.width='400';
    img.style.objectFit = "cover";
    
    img.onerror = function() {
        this.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23ddd' width='400' height='400'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='18' dy='10.5' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3EResim yüklenemedi%3C/text%3E%3C/svg%3E";
    };

    div.append(img);
    imageListWrapper.append(div);
}