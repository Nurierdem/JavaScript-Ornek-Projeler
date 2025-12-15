const githubName = document.querySelector("#githubname");
const form = document.querySelector("#searchForm");
const clearButton = document.querySelector("#clearButton");
const clearAllButton = document.querySelector("#clearAllButton");

const github = new Github();
const ui = new UI();

runEventListeners();

function runEventListeners(){
    form.addEventListener("submit", search);
    clearButton.addEventListener("click", clearInput);
    document.addEventListener("DOMContentLoaded",runPageLoaded);
    clearAllButton.addEventListener("click",clearSearchedUser);
    
}
function clearSearchedUser(){
    Storagex.clearAllSearchedUserFromStorage();
    ui.clearSearchedUsers();
}
function runPageLoaded(){
    ui.fillSearchedUserToUIFromStorage();
}

function clearInput(){
    ui.clearInput();
}

function search(e){
   const username = githubName.value.trim();
   if(username === null || username === ""){
    alert("Lütfen bir kullanıcı adı giriniz!")
   }else{
    github.getGithubData(username)
    .then(response => {
        if(response.user.message === "Not Found"){
            alert("Kullanıcı bulunamadı!");
            return;
        }
        ui.addSearchedUserToUI(username);
        Storagex.addSearchedUserToStorage(username);
        ui.addUserProfileToUI(response.user);
        document.querySelector("#showRepo").addEventListener("click",()=> ui.showRepos(response.repo));
        
    })
    .catch(error => {
        alert("Bir hata oluştu. Lütfen tekrar deneyin.");
        console.error("GitHub API Hatası:", error);
    })
   }
  
    e.preventDefault();
}