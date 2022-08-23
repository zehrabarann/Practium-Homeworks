//Select ul,li
let ulList_DOM = document.querySelector("#list")
let liDOM = document.querySelector("#list-item")

//Select add button
let formButton = document.querySelector("#liveToastBtn")
formButton.addEventListener("click", addToDo)

//Select delete button
let deleteButton = document.querySelectorAll(".icon")
deleteButton.forEach((element) => {
  element.addEventListener("click", deleteToDo)
})

//Select Task Label
let taskLabel = document.querySelectorAll("#task-label-area")
taskLabel.forEach((element) => {
  element.addEventListener("click", updateStatus)
})

localStorage.setItem('todos', JSON.stringify(['3 Litre Su İç', 'Ödevleri Yap', 'En Az 3 Saat Kodlama Yap', 'Yemek Yap', '50 Sayfa Kitap Oku']))

function addToDo(e) {
  let inputArea = document.querySelector("#task")
  const newTodo = inputArea.value.trim()

  if (newTodo === "") {
    console.log("deger griiniz")
    showAlert("Lütfen bir to do girin")
    //showToast()

  } else {

    //   <li id="list-item">
    //   <label class="task-label" id="task-label-area">
    //     <input onclick="updateStatus(0)" type="checkbox" id="1" class="w-auto">
    //     <span class="pl-2"> 3 Litre Su İç</span>
    //   </label>
    //   <i   class="fa fa-times icon"></i>
    // </li>

    //Create List Item
    let liDOMV = document.createElement("li")
    // liDOM.id ="list-item"
    // let label = document.createElement("label")
    // let input = document.createElement("input")
    // let span = document.createElement("span")
    // span.innerHTML = `${newTodo}`

    liDOMV.innerHTML = `
    <label class="task-label" id="task-label-area">
      <input onclick="updateStatus(${ulList_DOM.children.length})" type="checkbox" id="${ulList_DOM.children.length}" class="w-auto">
      <span class="pl-2">${newTodo}</span>
    </label>
    <i class="fa fa-times icon"></i>
  `
    ulList_DOM.appendChild(liDOMV)
    showAlertSuccess()
    addTodoToStorage(newTodo)
  }
  e.preventDefault();
}

function deleteToDo(e) {
  e.target.parentElement.remove()
  deleteTodoFromStorage(e.target.parentElement.textContent)

}

function updateStatus(e) {
  if (typeof e === 'number') {

    let taskName = taskLabel[e].lastElementChild

    if (taskName.className.includes("checked")) {
      taskName.classList.remove("checked")
    }
    else {
      taskName.classList.add("checked")
    }
  }
}

function addTodoToStorage(newTodo) {
  let todos;

  if (localStorage.getItem("todos") === null) { //Storage da değer yoksa boş array atanır
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem("todos"))
  }

  todos.push(newTodo)
  localStorage.setItem("todos", JSON.stringify(todos))
}


function deleteTodoFromStorage(deletetodo) {
  let todos;

  if (localStorage.getItem("todos") === null) { //Storage da değer yoksa boş array atanır
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem("todos"))
  }
  const filter = todos.filter((e) => !e.includes(deletetodo.trim()))
  localStorage.setItem("todos", JSON.stringify(filter))
}

//Select Toast
let toastArea = document.querySelector("#liveToast")
toastArea.addEventListener("click", showToast)

function showAlert() {
  let myAlert = document.querySelector('.error');//select id of toast
  let bsAlert = new bootstrap.Toast(myAlert);//inizialize it
  bsAlert.show();//show it
}

function showAlertSuccess() {
  let myAlert = document.querySelector('.success');//select id of toast
  let bsAlert = new bootstrap.Toast(myAlert);//inizialize it
  bsAlert.show();//show it
}



