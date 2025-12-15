//Tüm Elementleri Seçmek

const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");

let todos = [];

runEvents();

function runEvents() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    secondCardBody.addEventListener("click",removeTodoToUI);
    clearButton.addEventListener("click",allTodosEverywhere);
    filterInput.addEventListener("keyup",filter);
}

function pageLoaded(){
    checkTodosFromStorage();
    todos.forEach(function(todo){
       addTodoToUI(todo);
    });
}

function filter(e){
    const filterValue = e.target.value.toLowerCase().trim();
    const todoListesi = document.querySelectorAll(".list-group-item");
    
    if(todoListesi.length>0){
        todoListesi.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(filterValue)){
                //
                todo.setAttribute("style","display : block");
            }else{
                todo.setAttribute("style","display : none !important");
            }
        });

    }else{
        showAlert("warning","Filtreleme yapmak için en az bir todo olmalıdır!");
    }

}

function allTodosEverywhere(){
   const todoListesi = document.querySelectorAll(".list-group-item");
   if(todoListesi.length>0){
    // Animasyonlu silme
    todoListesi.forEach(function(todo, index){
        setTimeout(() => {
            todo.style.transition = "all 0.3s ease";
            todo.style.opacity = "0";
            todo.style.transform = "translateX(-20px)";
            setTimeout(() => todo.remove(), 300);
        }, index * 50);
    });

    //Storage'dan Silme
    setTimeout(() => {
        todos=[];
        localStorage.setItem("todos",JSON.stringify(todos));
        showAlert("success","Tüm todolar başarıyla silindi");
    }, todoListesi.length * 50 + 300);
   }else{
    showAlert("warning","Silmek için en az bir todo olmalıdır");
   }
}

function removeTodoToUI(e){
    if(e.target.classList.contains("fa-times") || e.target.parentElement.classList.contains("delete-item")){
        //Ekrandan Silme
       const deleteItem = e.target.classList.contains("fa-times") ? e.target.parentElement : e.target;
       const todo = deleteItem.parentElement;
       
       // Animasyon için
       todo.style.transition = "all 0.3s ease";
       todo.style.opacity = "0";
       todo.style.transform = "translateX(-20px)";
       
       setTimeout(() => {
           todo.remove();
           //Storage'dan Silme
           const todoText = todo.textContent.replace(/\s+/g, ' ').trim();
           removeTodoToStorage(todoText);
           showAlert("success","Todo başarıyla silindi.");
       }, 300);
    }
}

function removeTodoToStorage(removeTodo){
    checkTodosFromStorage();
    todos = todos.filter(function(todo){
        return todo !== removeTodo;
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function addTodo(e) {
    const inputText = addInput.value.trim();
    if (inputText === null || inputText === "") {
        showAlert("warning", "Lütfen boş bırakmayınız!");
    } else {
        //Arayüze ekleme
        addTodoToUI(inputText);
        addTodoToStorage(inputText);
        showAlert("success", "Todo Eklendi.");
    }

    e.preventDefault();
}

function addTodoToUI(newTodo) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    
    // Todo text span
    const todoText = document.createElement("span");
    todoText.textContent = newTodo;
    todoText.style.flex = "1";
    todoText.style.marginRight = "15px";
    
    // Delete button
    const a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";
    a.setAttribute("title", "Sil");

    const i = document.createElement("i");
    i.className = "fas fa-times";

    a.appendChild(i);
    li.appendChild(todoText);
    li.appendChild(a);
    
    // Animasyon için
    li.style.opacity = "0";
    li.style.transform = "translateX(-20px)";
    
    todoList.appendChild(li);
    
    // Fade in animasyonu
    setTimeout(() => {
        li.style.transition = "all 0.3s ease";
        li.style.opacity = "1";
        li.style.transform = "translateX(0)";
    }, 10);

    addInput.value = "";
}

function addTodoToStorage(newTodo) {
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodosFromStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type, message) {
    // Mevcut alert'leri temizle
    const existingAlerts = firstCardBody.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
    
    const div = document.createElement("div");
    div.className = `alert alert-${type}`;
    div.setAttribute("role", "alert");
    
    // İkon ekle
    const icon = type === "success" ? "✓" : "⚠";
    div.innerHTML = `<strong>${icon}</strong> ${message}`;

    firstCardBody.insertBefore(div, firstCardBody.firstChild);

    setTimeout(function(){
        div.style.transition = "all 0.3s ease";
        div.style.opacity = "0";
        div.style.transform = "translateY(-10px)";
        setTimeout(() => div.remove(), 300);
    }, 2500);
}