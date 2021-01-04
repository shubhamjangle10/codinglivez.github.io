const hamburger = document.querySelector('.burger');
const navlink = document.querySelector('.nav-link');
const links = document.querySelectorAll('.nav-link li');

hamburger.addEventListener('click', () => {
    navlink.classList.toggle('open');
    links.forEach(link => {
        link.classList.toggle("fade");
    })
})