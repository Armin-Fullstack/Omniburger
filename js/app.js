import Swiper from "swiper";
import 'swiper/css';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import i18next from "i18next";

// Selectors
const btnMenu = document.getElementById("btn-menu")
const mobileMenu = document.querySelector(".mobile-menu")
const allLinks = document.querySelectorAll("a:link")
const sectionHeroEl = document.querySelector(".section-hero")
const toTop = document.querySelector(".to-top")
const scrollUpBtn = document.querySelector(".scrollUp-btn")
const englishBtn = document.querySelector(".english-btn")
const spanishBtn = document.querySelector(".spanish-btn")
const languageActive = document.querySelector(".language-active")

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

// Show menu function
function showMenu() {
  btnMenu.classList.toggle("open") 
  mobileMenu.classList.toggle("show-menu")
}

btnMenu.addEventListener("click" , showMenu)

// Implemented section scroll
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

// Scroll up btn functionality
window.addEventListener("scroll" , () => {
  const clientHeight = document.body.clientHeight
  const windowHeight = window.innerHeight
  const scrolled = window.scrollY
  const scrolledPercentage = (scrolled / (clientHeight - windowHeight)) * 100
  toTop.style.background = `conic-gradient(#e03131 ${scrolledPercentage}% , #fff ${scrolledPercentage}%)`
  if(scrolled > 250) {
    toTop.classList.add("active-to-top")
  } else {
    toTop.classList.remove("active-to-top")
  }
  toTop.addEventListener("click" , () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  })
})

// Initialize i18next
i18next.init({
  lng: "en",
  fallbacking: "en",
  debug: true,
  resources: {
    en: {
      translation: {}
    },
    es: {
      translation: {}
    },
  }
})

// Access to the json file
const loadLanguageData = lang => {
  fetch(`./locales/${lang}/translation.json`)
  .then(response => response.json())
  .then(data => {
    i18next.addResources(lang , "translation" , data)
  })
  .catch(error => console.log(error))
}
loadLanguageData("en")
loadLanguageData("es")

// Change language
spanishBtn.addEventListener("click" , () => {
  languageActive.style.left = "11rem"
  i18next.changeLanguage("es" , (err , t) => {
    document.querySelectorAll("[data-i18n]").forEach(element => {
      element.innerHTML = t(element.dataset.i18n)
    })
  })
})

// Change language
englishBtn.addEventListener("click" , () => {
  languageActive.style.left = "0"
  i18next.changeLanguage("en" , (err , t) => {
    document.querySelectorAll("[data-i18n]").forEach(element => {
      element.innerHTML = t(element.dataset.i18n)
    })
  })
})