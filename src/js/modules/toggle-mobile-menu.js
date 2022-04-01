const menuButton = document.querySelector('.menu-btn');
const menuButtonIcons = document.querySelectorAll('.menu-btn__icon')
const mobileMenu = document.querySelector('.section--mobile-menu');

const toggleMobileMenu = () => { 
    menuButtonIcons.forEach(icon => {
        icon.classList.toggle('menu-btn__icon--hidden');
    });

    mobileMenu.classList.toggle('section--mobile-menu--visible');
};

menuButton.addEventListener('click', toggleMobileMenu);