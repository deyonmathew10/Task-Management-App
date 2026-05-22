/* FADE ANIMATION */

const fadeElements =
document.querySelectorAll('.fade-up');

window.addEventListener('scroll',()=>{

    fadeElements.forEach(element => {

        const elementTop =
        element.getBoundingClientRect().top;

        if(elementTop < window.innerHeight - 100){

            element.classList.add('show');

        }

    });

});

/* QUICK LINK DYNAMIC CONTENT */

function openSection(sectionId){

    const boxes =
    document.querySelectorAll('.content-box');

    boxes.forEach(box => {

        box.classList.remove('active-box');

    });

    document.getElementById(sectionId)
    .classList.add('active-box');

}

/* CONTACT FORM */

const form =
document.getElementById('contactForm');

const toast =
document.getElementById('toast');

form.addEventListener('submit',(e)=>{

    e.preventDefault();

    const fname =
    document.getElementById('fname')
    .value.trim();

    const lname =
    document.getElementById('lname')
    .value.trim();

    const phone =
    document.getElementById('phone')
    .value.trim();

    const address =
    document.getElementById('address')
    .value.trim();

    if(fname === '' ||
    lname === '' ||
    phone === '' ||
    address === ''){

        showToast(
        'Please fill all fields'
        );

    }

    else{

        showToast(
        'Submitted Successfully'
        );

        form.reset();

    }

});

/* TOAST */

function showToast(message){

    toast.textContent = message;

    toast.classList.add('show');

    setTimeout(()=>{

        toast.classList.remove('show');

    },3000);

}

/* DARK MODE */

function toggleDarkMode(){

    document.body.classList.toggle(
    'dark-mode'
    );

    localStorage.setItem(
    'darkMode',
    document.body.classList.contains(
    'dark-mode'
    )
    );

}

/* LOAD DARK MODE */

window.addEventListener('load',()=>{

    if(localStorage.getItem('darkMode')
    === 'true'){

        document.body.classList.add(
        'dark-mode'
        );

    }

});

/* FEATURE CARD INTERACTION */

const cards =
document.querySelectorAll('.card');

cards.forEach(card => {

    card.addEventListener('mouseenter',()=>{

        card.style.transform =
        'translateY(-10px) scale(1.03)';

    });

    card.addEventListener('mouseleave',()=>{

        card.style.transform =
        'translateY(0px) scale(1)';

    });

});

/* SMOOTH ACTIVE NAVIGATION */

const navLinks =
document.querySelectorAll('.nav-links a');

window.addEventListener('scroll',()=>{

    let current = '';

    document.querySelectorAll('section')
    .forEach(section => {

        const sectionTop =
        section.offsetTop;

        if(pageYOffset >= sectionTop - 200){

            current = section.getAttribute('id');

        }

    });

    navLinks.forEach(link => {

        link.classList.remove('active-link');

        if(link.getAttribute('href')
        === `#${current}`){

            link.classList.add(
            'active-link'
            );

        }

    });

});

/* LIVE CLOCK */

function updateClock(){

    const now = new Date();

    const time =
    now.toLocaleTimeString();

    const clock =
    document.getElementById('liveClock');

    if(clock){

        clock.innerHTML = time;

    }

}

setInterval(updateClock,1000);

/* COUNTER ANIMATION */

const counters =
document.querySelectorAll('.counter');

const speed = 200;

counters.forEach(counter => {

    const updateCount = ()=>{

        const target =
        +counter.getAttribute('data-target');

        const count =
        +counter.innerText;

        const increment =
        target / speed;

        if(count < target){

            counter.innerText =
            Math.ceil(count + increment);

            setTimeout(updateCount,20);

        }

        else{

            counter.innerText = target;

        }

    };

    updateCount();

});

/* SEARCH FEATURE */

const searchInput =
document.getElementById('globalSearch');

if(searchInput){

    searchInput.addEventListener('keyup',()=>{

        const value =
        searchInput.value.toLowerCase();

        document.querySelectorAll('.card')
        .forEach(card => {

            if(card.innerText
            .toLowerCase()
            .includes(value)){

                card.style.display =
                'block';

            }

            else{

                card.style.display =
                'none';

            }

        });

    });

}

/* LOADING SCREEN */

window.addEventListener('load',()=>{

    const loader =
    document.getElementById('loader');

    if(loader){

        loader.style.display =
        'none';

    }

});

/* DESKTOP NOTIFICATIONS */

function desktopNotification(message){

    if(Notification.permission
    === 'granted'){

        new Notification(
        'iNexaX Notification',
        {
            body:message
        }
        );

    }

}

/* REQUEST NOTIFICATION */

if(Notification.permission
!== 'granted'){

    Notification.requestPermission();

}

/* AUTO NOTIFICATION */

setTimeout(()=>{

    desktopNotification(
    'Welcome to iNexaX Dashboard'
    );

},4000);

/* API STATUS */

async function checkAPIStatus(){

    try{

        const response =
        await fetch(
        'https://jsonplaceholder.typicode.com/posts/1'
        );

        if(response.ok){

            console.log(
            'API Connected Successfully'
            );

        }

    }

    catch(error){

        console.log(
        'API Connection Failed'
        );

    }

}

checkAPIStatus();

/* BUTTON RIPPLE EFFECT */

const buttons =
document.querySelectorAll('button');

buttons.forEach(button => {

    button.addEventListener('click',
    function(e){

        const circle =
        document.createElement('span');

        circle.classList.add('ripple');

        this.appendChild(circle);

        const x =
        e.clientX -
        this.offsetLeft;

        const y =
        e.clientY -
        this.offsetTop;

        circle.style.left =
        `${x}px`;

        circle.style.top =
        `${y}px`;

        setTimeout(()=>{

            circle.remove();

        },600);

    });

});

/* MOBILE MENU */

const mobileMenu =
document.getElementById('mobileMenu');

const navMenu =
document.querySelector('.nav-links');

if(mobileMenu){

    mobileMenu.addEventListener('click',()=>{

        navMenu.classList.toggle(
        'show-menu'
        );

    });

}

/* SCROLL TO TOP */

const scrollBtn =
document.getElementById('scrollTop');

window.addEventListener('scroll',()=>{

    if(window.scrollY > 300){

        if(scrollBtn){

            scrollBtn.style.display =
            'block';

        }

    }

    else{

        if(scrollBtn){

            scrollBtn.style.display =
            'none';

        }

    }

});

if(scrollBtn){

    scrollBtn.addEventListener('click',()=>{

        window.scrollTo({

            top:0,

            behavior:'smooth'

        });

    });

}