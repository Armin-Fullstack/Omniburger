const btnMenu = document.getElementById("btn-menu")
const mobileMenu = document.querySelector(".mobile-menu")
function showMenu() {
  btnMenu.classList.toggle("open") 
  mobileMenu.classList.toggle("show-menu")
}
btnMenu.addEventListener("click" , showMenu)