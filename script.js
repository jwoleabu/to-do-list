const inputBox = document.getElementById("input-box");
const timeBox = document.getElementById("time-min");
const listContainer = document.getElementById("list-container");
const newTask = document.getElementById('new-task-button')
let soundEffect = document.getElementById("sound-effect");
const taskDescription = document.querySelector('.task-description');
let listItems = listContainer.querySelectorAll('li');
const body = document.body;
let taskEditing = false;
let isDragging = false;
let focusingTimeBox = false;



function addTask() {
    if (inputBox.value === ''){
        console.log('Task not created, no text in input')
        inputBox.focus();
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
        let closeSpan = document.createElement('span');
        closeSpan.innerHTML = '\u00d7';
        if (timeBox.value){
            let time = document.createElement('div');
            let originalTime = document.createElement('div');
            time.setAttribute("value",timeBox.value);
            originalTime.setAttribute("value",timeBox.value);
            originalTime.style.display  = 'none';
            time.classList.add('time-bar');
            time.appendChild(originalTime);
            li.appendChild(time);
            countdown(li.lastElementChild);
        }
        closeSpan.classList.add('close-span')
        li.appendChild(closeSpan);
        inputBox.value = '';
        timeBox.value = '';
        newTask.style.display = 'flex';
        taskDescription.classList.remove('spawn');
        taskEditing = false;
        saveData();

    }
    listItems = listContainer.children;
    console.log(listItems)

}

function countdown(inputDiv){
    let time = inputDiv.getAttribute('value');
    let initialTime = inputDiv.firstElementChild.getAttribute('value');
        const timer = setInterval(() => {
            if (time > 0 && document.querySelector('.time-bar')) {
                time = time*6000 -30;
                time = time.toFixed(2)
                inputDiv.setAttribute('value', time/6000);
                inputDiv.style.background = `conic-gradient(#262626 ${(time/6000)/initialTime*360}deg, #d7d7d7 ${(time/6000)/initialTime*360}deg)`
                time = time/6000;
                console.log(time)
            } else {
                console.log('timer ended')
                if (document.querySelector('.time-bar')){
                    soundEffect.play();
                }
                clearInterval(timer);
            }
        }, 300);
}

function taskCancel() {
    if (inputBox.value === ''){

    }
    else {
        inputBox.value = '';
        saveData();
        console.log('Task creation cancelled')

    }
    timeBox.value = '';
    newTask.style.display = 'flex';
    taskDescription.style.display = 'none';
    taskDescription.classList.remove('spawn')
    taskEditing = false;
}

body.addEventListener("keydown", function (e){
    if (e.key === 'Enter' && taskEditing &&focusingTimeBox){
        focusingTimeBox = false;
        addTask();
    }
    else if(e.key === 'Enter' && taskEditing && !focusingTimeBox){
        focusingTimeBox = true;
        timeBox.focus()

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
        const rect = sibling.getBoundingClientRect();
        const topHalf = rect.top + rect.height / 10;
        const bottomHalf = rect.top + rect.height / 5;

        return e.clientY <= topHalf || (e.clientY >= bottomHalf && e.clientY <= rect.bottom);
    });

    if (nextSibling) {
        listContainer.insertBefore(draggingItem, nextSibling);
    } else {
        listContainer.appendChild(draggingItem);
    }
}

function enforceTime(e) {
    if (e.value < 0){
        e.value = 0;
    }

    else if(e.value > 9999){
        e.value = 9999;
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
    // listContainer.addEventListener("touchmove", draggingFunction);
    // listContainer.addEventListener("dragenter", e => e.preventDefault());
});

