//Elementleri Seçmek

const leftTextArea = document.querySelector("#leftTextArea");
const rightTextArea = document.querySelector("#rightTextArea");
const encodeButton = document.querySelector("#encodeButton");
const decodeButton = document.querySelector("#decodeButton");
const cleanButton = document.querySelector("#cleanButton");


runEventListeners();

function runEventListeners(){
    encodeButton.addEventListener("click",encode);
    decodeButton.addEventListener("click", decode);
    cleanButton.addEventListener("click", clean);
}


function encode(){
    if(leftTextArea.value === ""){
        alert("Lütfen bir şifre giriniz.");
        return;
    }
    try {
        rightTextArea.value = btoa(leftTextArea.value);
        leftTextArea.value="";
    } catch (error) {
        alert("Şifreleme sırasında bir hata oluştu. Lütfen tekrar deneyin.");
    }
}

function decode(){
    if(rightTextArea.value === ""){
        alert("Lütfen çözülecek bir şifre giriniz.");
        return;
    }
    try {
        leftTextArea.value = atob(rightTextArea.value);
        rightTextArea.value="";
    } catch (error) {
        alert("Geçersiz Base64 formatı! Lütfen doğru bir şifre giriniz.");
    }
}

function clean(){
    leftTextArea.value="";
    rightTextArea.value="";
}