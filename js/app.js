

const fadeElements = document.querySelectorAll('.fade-up');

window.addEventListener('scroll', () => {

    fadeElements.forEach(element => {

        const elementTop = element.getBoundingClientRect().top;

        if(elementTop < window.innerHeight - 100){
            element.classList.add('show');
        }

    });

});


function openSection(sectionId){

    const boxes = document.querySelectorAll('.content-box');

    boxes.forEach(box => {
        box.classList.remove('active-box');
    });

    document.getElementById(sectionId).classList.add('active-box');

}



const form = document.getElementById('contactForm');
const toast = document.getElementById('toast');

form.addEventListener('submit', (e) => {

    e.preventDefault();

    const fname = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();

    if(fname === '' || lname === '' || phone === '' || address === ''){

        showToast('Please fill all fields');

    }else{

        showToast('Submitted Successfully');

        form.reset();

    }

});

function showToast(message){

    toast.textContent = message;

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    },3000);

}