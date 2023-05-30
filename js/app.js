import Swiper from "swiper";
import 'swiper/css';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Initialize Swiper.js
var swiper = new Swiper(".mySwiper", {
  modules: [Pagination, Autoplay],
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  }
});

const btnMenu = document.getElementById("btn-menu")
const mobileMenu = document.querySelector(".mobile-menu")
const allLinks = document.querySelectorAll("a:link")
const sectionHeroEl = document.querySelector(".section-hero")

function showMenu() {
  btnMenu.classList.toggle("open") 
  mobileMenu.classList.toggle("show-menu")
}


btnMenu.addEventListener("click" , showMenu)
allLinks.forEach(element => {
  element.addEventListener("click" , function(e) {
    e.preventDefault()
    //Reading attribute
    const href = element.getAttribute("href")
    if(href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    } else if(href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href)
      // we did not use scrollTo bc we don't know the pixel from the top to scroll
      sectionEl.scrollIntoView({
        behavior: "smooth"
      })
      if(element.classList.contains("main-nav-link") && btnMenu.classList.contains("open")) {
        showMenu() 
      }
    }
    
  })
})

const obs = new IntersectionObserver( (enteries) => {
  if(!enteries[0].isIntersecting) {
    document.body.classList.add("sticky")
  } else {
    document.body.classList.remove("sticky")
  }
}, 
{
  // in the viewport
root: null,
threshold: 0,
rootMargin: "-80px"
}) 
obs.observe(sectionHeroEl)
