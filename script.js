const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const newTask = document.getElementById('new-task-button')
const taskDescription = document.querySelector('.task-description');
let listItems = listContainer.children;
const body = document.body;
let taskEditing = false;


function addTask() {
    if (inputBox.value === ''){
        console.log('Task not created, no text in input')
    }
    else {
        taskDescription.style.display = 'none';
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        li.classList.add('draggable')
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = '\u00d7'
        li.appendChild(span);
        inputBox.value = '';
        newTask.style.display = 'flex'
        taskEditing = false;
        saveData();
        console.log('Task created')

    }
    listItems = listContainer.children;
    console.log(listItems)

}

function taskCancel() {
    if (inputBox.value === ''){
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = '\u00d7'
        li.appendChild(span);
        inputBox.value = '';
        saveData();
        console.log('Task created')

    }
    newTask.style.display = 'flex';
    taskDescription.style.display = 'none';
    taskEditing = false;
}

body.addEventListener("keydown", function (e){
    if (e.key === 'Enter' && taskEditing){
        addTask();
    }
})
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');

        saveData()
        console.log('Task check toggle')

    } else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
        saveData()
        console.log('Task removed')
    }
},false);

newTask.addEventListener("click", function (e){
    taskDescription.style.display = 'flex';
    inputBox.focus();
    taskDescription.scrollIntoView();
    taskEditing = true;
    newTask.style.display = 'none'
})

// listItems.forEach(item =>{
//     item.addEventListener("dragstart", () =>{
//         item.classList.add('dragging');
//     })
//     item.addEventListener("dragend", () =>{
//         item.classList.remove('dragging')
//     })
// })


function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();