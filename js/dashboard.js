

const sidebarItems = document.querySelectorAll('.sidebar-item');
const sections = document.querySelectorAll('.dashboard-section');

sidebarItems.forEach(item => {

    item.addEventListener('click', () => {

        sidebarItems.forEach(i => {
            i.classList.remove('active');
        });

        item.classList.add('active');

        const target = item.getAttribute('data-section');

        sections.forEach(section => {
            section.classList.remove('active-section');
        });

        document.getElementById(target).classList.add('active-section');

    });

});

// Task Data

let tasks = JSON.parse(localStorage.getItem('tasks')) || [

    {
        id:1,
        name:"Landing Page UI",
        status:"pending"
    },

    {
        id:2,
        name:"Dashboard Design",
        status:"progress"
    }

];

// Notifications Data

let notifications = JSON.parse(localStorage.getItem('notifications')) || [];

/* Render App */

function renderApp(){

    renderTasks();

    renderTaskSection();

    updateStats();

    updateReports();

    renderNotifications();

    saveData();

}

/* Render Tasks */

function renderTasks(){

    document.querySelector('.pending-column').innerHTML = `<h2>Pending</h2>`;

    document.querySelector('.progress-column').innerHTML = `<h2>In Progress</h2>`;

    document.querySelector('.review-column').innerHTML = `<h2>Review</h2>`;

    document.querySelector('.completed-column').innerHTML = `<h2>Completed</h2>`;

    tasks.forEach(task => {

        const taskDiv = document.createElement('div');

        taskDiv.classList.add('task',task.status);

        taskDiv.innerHTML = `
            <div class="task-flex">

                <span>${task.name}</span>

                <button class="delete-btn">
                    X
                </button>

            </div>
        `;

        

        taskDiv.addEventListener('click', () => {

            moveTask(task.id);

        });

        

        taskDiv.querySelector('.delete-btn').addEventListener('click',(e)=>{

            e.stopPropagation();

            deleteTask(task.id);

        });

        

        if(task.status === 'pending'){

            document.querySelector('.pending-column').appendChild(taskDiv);

        }

        else if(task.status === 'progress'){

            document.querySelector('.progress-column').appendChild(taskDiv);

        }

        else if(task.status === 'review'){

            document.querySelector('.review-column').appendChild(taskDiv);

        }

        else{

            document.querySelector('.completed-column').appendChild(taskDiv);

        }

    });

}

/* Move Tasks */

function moveTask(id){

    tasks = tasks.map(task => {

        if(task.id === id){

            if(task.status === 'pending'){

                task.status = 'progress';

                addNotification(`${task.name} moved to In Progress`);

            }

            else if(task.status === 'progress'){

                task.status = 'review';

                addNotification(`${task.name} moved to Review`);

            }

            else if(task.status === 'review'){

                task.status = 'completed';

                addNotification(`${task.name} completed`);

            }

        }

        return task;

    });

    renderApp();

}



function deleteTask(id){

    tasks = tasks.filter(task => task.id !== id);

    addNotification('Task Deleted');

    renderApp();

}



const modal = document.getElementById('taskModal');
const openModal = document.getElementById('openModal');
const closeModal = document.querySelector('.close');

openModal.addEventListener('click', () => {

    modal.style.display = 'block';

});

closeModal.addEventListener('click', () => {

    modal.style.display = 'none';

});

window.addEventListener('click', (e) => {

    if(e.target == modal){

        modal.style.display = 'none';

    }

});



document.getElementById('addTaskBtn').addEventListener('click', () => {

    const taskInput = document.getElementById('taskInput');

    if(taskInput.value.trim() === ''){

        showNotification('Please enter task name');

        return;

    }

    tasks.push({

        id:Date.now(),

        name:taskInput.value,

        status:'pending'

    });

    addNotification(`${taskInput.value} task added`);

    taskInput.value = '';

    modal.style.display = 'none';

    renderApp();

});



function renderTaskSection(){

    const container = document.getElementById('taskListContainer');

    container.innerHTML = '';

    tasks.forEach(task => {

        container.innerHTML += `
            <div class="task-list-item">

                ${task.name} - ${task.status}

            </div>
        `;

    });

}


function updateStats(){

    document.getElementById('totalTasks').textContent =
        tasks.length;

    document.getElementById('completedTasks').textContent =
        tasks.filter(task => task.status === 'completed').length;

    document.getElementById('pendingTasks').textContent =
        tasks.filter(task => task.status === 'pending').length;

    document.getElementById('progressTasks').textContent =
        tasks.filter(task => task.status === 'progress').length;

}



function updateReports(){

    const completed =
        tasks.filter(task => task.status === 'completed').length;

    const productivity =
        tasks.length === 0 ? 0 :
        Math.round((completed / tasks.length) * 100);

    document.getElementById('productivityReport').textContent =
        productivity + '%';

    document.getElementById('completedReport').textContent =
        completed;

}


function addNotification(message){

    notifications.unshift(message);

    showNotification(message);

}

function renderNotifications(){

    const history = document.getElementById('notificationHistory');

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

    const notification = document.createElement('div');

    notification.classList.add('notification');

    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {

        notification.classList.add('show');

    },100);

    setTimeout(() => {

        notification.classList.remove('show');

        setTimeout(() => {

            notification.remove();

        },300);

    },2500);

}



function saveData(){

    localStorage.setItem('tasks',JSON.stringify(tasks));

    localStorage.setItem('notifications',JSON.stringify(notifications));

}



const darkModeBtn = document.getElementById('darkModeBtn');

darkModeBtn.addEventListener('click', () => {

    document.body.classList.toggle('dark-mode');

});


const statsModal = document.getElementById('statsModal');
const closeStats = document.querySelector('.closeStats');

closeStats.addEventListener('click', () => {

    statsModal.style.display = 'none';

});

document.getElementById('totalCard').addEventListener('click', () => {

    openStatsModal('Total Tasks',tasks);

});

document.getElementById('completedCard').addEventListener('click', () => {

    openStatsModal(
        'Completed Tasks',
        tasks.filter(task => task.status === 'completed')
    );

});

document.getElementById('pendingCard').addEventListener('click', () => {

    openStatsModal(
        'Pending Tasks',
        tasks.filter(task => task.status === 'pending')
    );

});

document.getElementById('progressCard').addEventListener('click', () => {

    openStatsModal(
        'In Progress Tasks',
        tasks.filter(task => task.status === 'progress')
    );

});

function openStatsModal(title,data){

    document.getElementById('statsTitle').textContent = title;

    const statsList = document.getElementById('statsList');

    statsList.innerHTML = '';

    if(data.length === 0){

        statsList.innerHTML = `
            <div class="stats-task">
                No Tasks Available
            </div>
        `;

    }

    data.forEach(task => {

        statsList.innerHTML += `
            <div class="stats-task">

                ${task.name} - ${task.status}

            </div>
        `;

    });

    statsModal.style.display = 'block';

}



renderApp();