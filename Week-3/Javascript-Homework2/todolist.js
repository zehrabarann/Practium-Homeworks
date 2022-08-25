const defaultValue = ['3 Litre Su İç', 'Ödevleri Yap', 'En Az 3 Saat Kodlama Yap', 'Yemek Yap', '50 Sayfa Kitap Oku']
//Select ul,li
let ulList_DOM = document.querySelector("#list")
let liDOM = document.querySelector("#list-item")

//Select add button
let formButton = document.querySelector("#liveToastBtn")
formButton.addEventListener("click", addToDo)

//Select delete button
const addEventDelete = () => {
  let deleteButton = document.querySelectorAll(".icon")
  deleteButton.forEach((element) => {
    element.addEventListener("click", deleteToDo)
  })
}
addEventDelete()

//Select Task Label
let taskLabel = document.querySelectorAll(".list-item")
taskLabel.forEach((element) => {
  element.addEventListener("click", updateStatus)
})

localStorage.setItem('todos', JSON.stringify(defaultValue))

function addToDo(e) {
  let inputArea = document.querySelector("#task")
  const newTodo = inputArea.value.trim()

  if (newTodo === "") {
    showAlert("Lütfen bir to do girin")

  } else {

    //Create List Item
    let liDOMV = document.createElement("li")
    liDOMV.setAttribute('id', 'list-item')
    liDOMV.setAttribute('class', 'list-item')
    liDOMV.addEventListener("click", updateStatus)

    liDOMV.innerHTML = `
    <label class="task-label" id="task-label-area">
      <span class="pl-2">${newTodo}</span>
    </label>
    <i class="fa fa-times icon"></i>
  `

    ulList_DOM.appendChild(liDOMV)
    showAlertSuccess()
    addTodoToStorage(newTodo)
  }
  addEventDelete()
  e.preventDefault();
}

function deleteToDo(e) {
  //debugger
  console.log(e.target.parentElement)
  e.target.parentElement.remove()

  deleteTodoFromStorage(e.target.parentElement.textContent)
}

function updateStatus(e) {
  if (typeof e !== 'number') {
    let taskName = e.currentTarget //li emenetine offsetParent ile ulaşılır. Direkt liye checked eklendi.

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



