

const sidebarItems =
document.querySelectorAll('.sidebar-item');

const sections =
document.querySelectorAll('.dashboard-section');

sidebarItems.forEach(item => {

    item.addEventListener('click', () => {

        sidebarItems.forEach(i => {

            i.classList.remove('active');

        });

        item.classList.add('active');

        const target =
        item.getAttribute('data-section');

        sections.forEach(section => {

            section.classList.remove('active-section');

        });

        document.getElementById(target)
        .classList.add('active-section');

    });

});

let tasks =
JSON.parse(localStorage.getItem('tasks'))
|| [];

let notifications =
JSON.parse(localStorage.getItem('notifications'))
|| [];

let notes =
JSON.parse(localStorage.getItem('notes'))
|| [];

function renderApp(){

    renderTasks();

    renderTaskSection();

    updateStats();

    updateReports();

    renderNotifications();

    renderNotes();

    saveData();

}


function renderTasks(){

    document.querySelector('.pending-column')
    .innerHTML = `<h2>Pending</h2>`;

    document.querySelector('.progress-column')
    .innerHTML = `<h2>In Progress</h2>`;

    document.querySelector('.review-column')
    .innerHTML = `<h2>Review</h2>`;

    document.querySelector('.completed-column')
    .innerHTML = `<h2>Completed</h2>`;

    tasks.forEach(task => {

        const taskDiv =
        document.createElement('div');

        taskDiv.classList.add(
            'task',
            task.status
        );

        taskDiv.innerHTML = `
        <div class="task-flex">

            <div>

                <h3>${task.name}</h3>

                <p>${task.description}</p>

                <p>
                Priority :
                <strong>${task.priority}</strong>
                </p>

                <p>
                Assigned :
                ${task.member}
                </p>

                <p>
                Due :
                ${task.date}
                </p>

                <p class="timer-text">
                Remaining :
                ${task.timer} min
                </p>

            </div>

            <div>

                <button class="complete-btn">
                    ✓
                </button>

                <button class="delete-btn">
                    X
                </button>

            </div>

        </div>
        `;

        taskDiv.querySelector('.delete-btn')
        .addEventListener('click',(e)=>{

            e.stopPropagation();

            deleteTask(task.id);

        });

        taskDiv.querySelector('.complete-btn')
        .addEventListener('click',(e)=>{

            e.stopPropagation();

            completeTask(task.id);

        });

        taskDiv.addEventListener('click',()=>{

            moveTask(task.id);

        });

        if(task.status === 'pending'){

            document.querySelector('.pending-column')
            .appendChild(taskDiv);

        }

        else if(task.status === 'progress'){

            document.querySelector('.progress-column')
            .appendChild(taskDiv);

        }

        else if(task.status === 'review'){

            document.querySelector('.review-column')
            .appendChild(taskDiv);

        }

        else{

            document.querySelector('.completed-column')
            .appendChild(taskDiv);

        }

    });

}


function completeTask(id){

    tasks = tasks.map(task => {

        if(task.id === id){

            task.status = 'completed';

            addNotification(
            `${task.name} completed successfully`
            );

        }

        return task;

    });

    renderApp();

}


function moveTask(id){

    tasks = tasks.map(task => {

        if(task.id === id){

            if(task.status === 'pending'){

                task.status = 'progress';

                addNotification(
                `${task.name} moved to In Progress`
                );

            }

            else if(task.status === 'progress'){

                task.status = 'review';

                addNotification(
                `${task.name} moved to Review`
                );

            }

            else if(task.status === 'review'){

                task.status = 'completed';

                addNotification(
                `${task.name} completed`
                );

            }

        }

        return task;

    });

    renderApp();

}


function deleteTask(id){

    tasks =
    tasks.filter(task => task.id !== id);

    addNotification('Task Deleted');

    renderApp();

}

const modal =
document.getElementById('taskModal');

const openModal =
document.getElementById('openModal');

const closeModal =
document.querySelector('.close');

openModal.addEventListener('click',()=>{

    modal.style.display = 'block';

});

closeModal.addEventListener('click',()=>{

    modal.style.display = 'none';

});

window.addEventListener('click',(e)=>{

    if(e.target == modal){

        modal.style.display = 'none';

    }

});

document.getElementById('addTaskBtn')
.addEventListener('click',()=>{

    const taskInput =
    document.getElementById('taskInput');

    const taskDescription =
    document.getElementById('taskDescription');

    const taskDate =
    document.getElementById('taskDate');

    const taskPriority =
    document.getElementById('taskPriority');

    const taskMember =
    document.getElementById('taskMember');

    const taskTimer =
    document.getElementById('taskTimer');

    if(taskInput.value.trim() === ''){

        showNotification(
        'Please enter task name'
        );

        return;

    }

    const newTask = {

        id:Date.now(),

        name:taskInput.value,

        description:taskDescription.value,

        priority:taskPriority.value,

        member:taskMember.value,

        date:taskDate.value,

        timer:taskTimer.value,

        status:'pending'

    };

    tasks.push(newTask);

    startTaskTimer(newTask);

    addNotification(
    `${taskInput.value} task added`
    );

    modal.style.display = 'none';

    taskInput.value = '';

    taskDescription.value = '';

    taskDate.value = '';

    taskPriority.value = '';

    taskMember.value = '';

    taskTimer.value = '';

    renderApp();

});


function startTaskTimer(task){

    let remaining =
    parseInt(task.timer);

    const interval =
    setInterval(()=>{

        remaining--;

        task.timer = remaining;

        renderApp();

        if(remaining === 5){

            addNotification(
            `${task.name} deadline in 5 minutes`
            );

        }

        if(remaining <= 0){

            clearInterval(interval);

            task.status = 'completed';

            addNotification(
            `${task.name} completed automatically`
            );

            renderApp();

        }

    },60000);

}

function renderTaskSection(){

    const container =
    document.getElementById('taskListContainer');

    container.innerHTML = '';

    tasks.forEach(task => {

        container.innerHTML += `
        <div class="task-list-item">

            <strong>${task.name}</strong>

            <p>${task.description}</p>

            <p>
            ${task.priority}
            </p>

            <p>
            ${task.status}
            </p>

        </div>
        `;

    });

}

document.getElementById('searchTask')
.addEventListener('keyup',(e)=>{

    const value =
    e.target.value.toLowerCase();

    document.querySelectorAll('.task')
    .forEach(task => {

        if(task.innerText
        .toLowerCase()
        .includes(value)){

            task.style.display = 'block';

        }

        else{

            task.style.display = 'none';

        }

    });

});

document.getElementById('filterPriority')
.addEventListener('change',(e)=>{

    const value = e.target.value;

    document.querySelectorAll('.task')
    .forEach(task => {

        if(value === 'all'){

            task.style.display = 'block';

        }

        else if(task.innerText.includes(value)){

            task.style.display = 'block';

        }

        else{

            task.style.display = 'none';

        }

    });

});


function updateStats(){

    document.getElementById('totalTasks')
    .textContent = tasks.length;

    document.getElementById('completedTasks')
    .textContent =
    tasks.filter(task =>
    task.status === 'completed').length;

    document.getElementById('pendingTasks')
    .textContent =
    tasks.filter(task =>
    task.status === 'pending').length;

    document.getElementById('progressTasks')
    .textContent =
    tasks.filter(task =>
    task.status === 'progress').length;

}


function updateReports(){

    const completed =
    tasks.filter(task =>
    task.status === 'completed').length;

    const pending =
    tasks.filter(task =>
    task.status === 'pending').length;

    const productivity =
    tasks.length === 0 ? 0 :
    Math.round(
    (completed/tasks.length)*100
    );

    document.getElementById(
    'productivityReport'
    ).textContent =
    productivity + '%';

    document.getElementById(
    'completedReport'
    ).textContent =
    completed;

    document.getElementById(
    'pendingReport'
    ).textContent =
    pending;

}

function addNotification(message){

    notifications.unshift(message);

    showNotification(message);

}

function renderNotifications(){

    const history =
    document.getElementById(
    'notificationHistory'
    );

    history.innerHTML = '';

    notifications.forEach(note => {

        history.innerHTML += `
        <div class="notify-item">

            ${note}

        </div>
        `;

    });

}

function showNotification(message){

    const notification =
    document.createElement('div');

    notification.classList.add(
    'notification'
    );

    notification.textContent =
    message;

    document.body.appendChild(
    notification
    );

    setTimeout(()=>{

        notification.classList.add(
        'show'
        );

    },100);

    setTimeout(()=>{

        notification.classList.remove(
        'show'
        );

        setTimeout(()=>{

            notification.remove();

        },300);

    },2500);

}



document.getElementById('saveNoteBtn')
.addEventListener('click',()=>{

    const noteInput =
    document.getElementById('noteInput');

    if(noteInput.value.trim() === ''){

        showNotification(
        'Please enter note'
        );

        return;

    }

    notes.push(noteInput.value);

    noteInput.value = '';

    renderNotes();

    saveData();

});

function renderNotes(){

    const container =
    document.getElementById(
    'notesContainer'
    );

    container.innerHTML = '';

    notes.forEach((note,index)=>{

        container.innerHTML += `
        <div class="note-item">

            <p>${note}</p>

            <button onclick="deleteNote(${index})">
                Delete
            </button>

        </div>
        `;

    });

}

function deleteNote(index){

    notes.splice(index,1);

    renderNotes();

    saveData();

}



document.getElementById('weatherBtn')
.addEventListener('click',async()=>{

    const city =
    document.getElementById('cityInput')
    .value;

    const result =
    document.getElementById(
    'weatherResult'
    );

    try{

        const response =
        await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`
        );

        const data =
        await response.json();

        if(data.cod != 200){

            result.innerHTML =
            'City not found';

            return;

        }

        result.innerHTML = `
        <h3>${data.name}</h3>

        <p>
        Temperature :
        ${data.main.temp}°C
        </p>

        <p>
        Weather :
        ${data.weather[0].main}
        </p>
        `;

    }

    catch(error){

        result.innerHTML =
        'Weather loading failed';

    }

});


function saveData(){

    localStorage.setItem(
    'tasks',
    JSON.stringify(tasks)
    );

    localStorage.setItem(
    'notifications',
    JSON.stringify(notifications)
    );

    localStorage.setItem(
    'notes',
    JSON.stringify(notes)
    );

}



document.getElementById('darkModeBtn')
.addEventListener('click',()=>{

    document.body.classList.toggle(
    'dark-mode'
    );

});



const statsModal =
document.getElementById('statsModal');

const closeStats =
document.querySelector('.closeStats');

closeStats.addEventListener('click',()=>{

    statsModal.style.display = 'none';

});


renderApp();