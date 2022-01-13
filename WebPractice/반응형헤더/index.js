const btn = document.querySelector("#toggle_btn");
const menu = document.querySelector("#nav_menu");
const icon = document.querySelector("#nav_icon");

btn.addEventListener('click', () => {
    menu.classList.toggle('active');
    icon.classList.toggle('active');
})