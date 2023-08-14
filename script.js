const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const newTask = document.getElementById('new-task-button')
const taskDescription = document.querySelector('.task-description');
let listItems = listContainer.querySelectorAll('li');
const body = document.body;
let taskEditing = false;
let isDragging = false;


function addTask() {
    if (inputBox.value === ''){
        console.log('Task not created, no text in input')
    }
    else {
        taskDescription.style.display = 'none';
        let li = document.createElement("li");
        li.innerText = inputBox.value;
        li.classList.add('draggable');
        li.setAttribute('draggable', 'true');
        li.addEventListener("dragstart", function (e) {
            setTimeout(() => {
                e.target.classList.add('dragging');
            }, 0);
            isDragging = true;
            console.log('dragging started');
        });
        li.addEventListener("dragend", function (e) {
            e.target.classList.remove('dragging');
            isDragging = false;
            console.log('dragging ended');
            setTimeout(saveData, 0);
        });
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        li.appendChild(span);
        inputBox.value = '';
        newTask.style.display = 'flex';
        taskDescription.classList.remove('spawn');
        taskEditing = false;
        saveData();
        console.log('Task created');

    }
    listItems = listContainer.children;
    console.log(listItems)

}

function taskCancel() {
    if (inputBox.value === ''){
    }
    else {
        inputBox.value = '';
        saveData();
        console.log('Task creation cancelled')

    }
    newTask.style.display = 'flex';
    taskDescription.style.display = 'none';
    taskDescription.classList.remove('spawn')
    taskEditing = false;
}

body.addEventListener("keydown", function (e){
    if (e.key === 'Enter' && taskEditing){
        addTask();
    }
    else if(e.key === 'Enter' && !taskEditing){
        newTaskButton();
    }
    else if(e.key === 'Escape' && taskEditing){
        taskCancel();
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

function newTaskButton() {
    taskDescription.style.display = 'flex';
    inputBox.focus();
    taskDescription.scrollIntoView();
    taskEditing = true;
    taskDescription.classList.add('spawn')
    newTask.style.display = 'none'
}

function saveData() {
    console.log('data saved')
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    const savedData = localStorage.getItem("data");
    if (savedData) {
        listContainer.innerHTML = savedData;
    }

}

function draggingFunction(e) {
    e.preventDefault();
    const draggingItem = listContainer.querySelector(".dragging");
    const siblings = Array.from(listContainer.querySelectorAll('li:not(.dragging)'));

    let nextSibling = siblings.find(sibling => {
        return e.clientY <= sibling.getBoundingClientRect().top + sibling.offsetHeight / 1.5;
    });

    if (nextSibling) {
        listContainer.insertBefore(draggingItem, nextSibling);
    } else {
        listContainer.appendChild(draggingItem);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    showTask();
    listItems = listContainer.querySelectorAll('li');
    console.log(listItems);


    listItems.forEach(item => {
        item.addEventListener("dragstart", function (e) {
            setTimeout(() => {
                e.target.classList.add('dragging');
            }, 0);
            isDragging = true;
            console.log('dragging started')
        })

        item.addEventListener("dragend", function (e) {
            setTimeout(()=>e.target.classList.remove('dragging'),0);
            isDragging = false;
            console.log('dragging ended')
            setTimeout(saveData,0);
        })
    })

    listContainer.addEventListener("dragover", draggingFunction);
    listContainer.addEventListener("dragenter", e => e.preventDefault());
});

