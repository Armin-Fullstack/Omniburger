const btnMenu = document.getElementById("btn-menu")
function showMenu() {
  btnMenu.classList.toggle("open")
}
btnMenu.addEventListener("click" , showMenu)