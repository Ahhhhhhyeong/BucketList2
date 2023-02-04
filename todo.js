const toDoform = document.querySelector(".js-toDoForm"),
      toDoinput = toDoform.querySelector("input"),
      toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';
let toDos = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li); //remove html li
    const cleanToDos = toDos.filter(function(toDo){       
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const div = document.createElement("div");
    const delBtn = document.createElement("button");
    delBtn.innerText = "✖";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    span.innerText = text;
    div.appendChild(delBtn);
    div.appendChild(span);
    div.id = newId;
    toDoList.appendChild(div);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj); //pushing toDos array    
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentVaule = toDoinput.value;
    paintToDo(currentVaule);
    toDoinput.value = "";
}


function loadToDos(){
    const loadedtoDos = localStorage.getItem(TODOS_LS);
    if(loadedtoDos !== null){
        const parsedToDos = JSON.parse(loadedtoDos);      
        parsedToDos.forEach(function something(toDo){ //array function
            paintToDo(toDo.text);
        });      
    }
}


function init(){
    loadToDos();
    toDoform.addEventListener("submit",handleSubmit)
}

init();