//Elementleri Seçelim.

const amountInput = document.querySelector("#amount");
const firstOption = document.querySelector("#firstCurrencyOption");
const secondOption = document.querySelector("#secondCurrencyOption");
const resultInput = document.querySelector("#result"); 

// CONFIG kontrolü ve uyarı
if (typeof CONFIG === 'undefined') {
    resultInput.placeholder = "config.js dosyası bulunamadı!";
    resultInput.disabled = true;
} else if (!CONFIG.CURRENCY_API_KEY || CONFIG.CURRENCY_API_KEY === "YOUR_CURRENCY_API_KEY_HERE") {
    resultInput.placeholder = "API key gerekli - config.js'yi düzenleyin";
    resultInput.disabled = true;
    
    // Kullanıcıya bilgi ver
    setTimeout(() => {
        showMessage("API key bulunamadı! Lütfen config.js dosyasına kendi API key'inizi ekleyin. FreeCurrencyAPI.com adresinden ücretsiz API key alabilirsiniz.", "error");
    }, 500);
}

const currency = new Currency();

runEventListeners();

function runEventListeners(){
    amountInput.addEventListener("input",exchange);
}


function exchange(){
  // API key kontrolü
  if (typeof CONFIG === 'undefined' || !CONFIG.CURRENCY_API_KEY || CONFIG.CURRENCY_API_KEY === "YOUR_CURRENCY_API_KEY_HERE") {
    showMessage("API key bulunamadı! Lütfen config.js dosyasına kendi API key'inizi ekleyin.", "error");
    resultInput.value = "";
    resultInput.placeholder = "API key gerekli";
    return;
  }
  
  const amount = Number(amountInput.value.trim());
  
  if (!amount || amount <= 0) {
    resultInput.value = "";
    return;
  }
  
  const firstOptionValue = firstOption.options[firstOption.selectedIndex].textContent;
  const secondOptionValue = secondOption.options[secondOption.selectedIndex].textContent;

  if (firstOptionValue === secondOptionValue) {
    resultInput.value = amount.toFixed(3);
    return;
  }

  resultInput.value = "Hesaplanıyor...";
  resultInput.disabled = false;
  
  currency.exchange(amount, firstOptionValue, secondOptionValue)
  .then((result) => {
    if (result && !isNaN(result)) {
      resultInput.value = result.toFixed(3);
    } else {
      resultInput.value = "Hata!";
      showMessage("Geçersiz sonuç alındı.", "error");
    }
  })
  .catch((error) => {
    resultInput.value = "Hata!";
    
    // Daha açıklayıcı hata mesajları
    let errorMessage = "Döviz kuru alınırken bir hata oluştu. Lütfen tekrar deneyin.";
    
    if (error.message.includes("API key")) {
      errorMessage = "API key bulunamadı. Lütfen config.js dosyasına kendi API key'inizi ekleyin!";
    } else if (error.message.includes("404")) {
      errorMessage = "API endpoint bulunamadı. Lütfen API key'inizi kontrol edin.";
    } else if (error.message.includes("401") || error.message.includes("403")) {
      errorMessage = "API key geçersiz veya yetkisiz. Lütfen API key'inizi kontrol edin.";
    } else if (error.message.includes("429")) {
      errorMessage = "API limit aşıldı. Lütfen daha sonra tekrar deneyin.";
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    showMessage(errorMessage, "error");
  });
}

function showMessage(message, type = "error") {
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
    background-color: ${type === "error" ? "#dc3545" : "#28a745"};
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(messageDiv);
  
  setTimeout(() => {
    messageDiv.style.animation = "slideOut 0.3s ease";
    setTimeout(() => messageDiv.remove(), 300);
  }, 3000);
}