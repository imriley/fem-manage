var slideIndex = 1;
const body = document.querySelector('body');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const fadeElems = document.querySelectorAll('.has-fade');
const btnHamburger = document.querySelector('#hamburgerbtn');
const mediaQuery = window.matchMedia('(min-width: 1024px)');
const formItem = document.querySelectorAll('.form-input');
const formError = document.querySelector('#error_message');

console.log('script loaded');

mediaQuery.addEventListener('change', handleCarouselChange);
handleCarouselChange(mediaQuery);

btnHamburger.addEventListener('click', function () { // Close Hamburger Menu
    if (header.classList.contains('open')) {
        body.classList.remove('noscroll')
        header.classList.remove('open');
        fadeElems.forEach(function (element) {
            element.classList.remove('fade-in');
            element.classList.add('fade-out');
        })
    }
    else { // Open Hamburger Menu
        body.classList.add('noscroll')
        header.classList.add('open');
        fadeElems.forEach(function (element) {
            element.classList.remove('fade-out');
            element.classList.add('fade-in');
        })
    }
});

function currentSlide(n) {
    if (mediaQuery.matches) {
        slides(slideIndex = n);
    } else {
        showSlides(slideIndex = n);
    };
};

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("carousel__item");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

function slides(n) {
    var i;
    var slides = document.getElementsByClassName('carousel__item');
    var dots = document.getElementsByClassName('dot');
    if (n > slides.length) { slideIndex = 1 };
    if (n < 1) { slideIndex = slides.length };
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].style.order = "none";
        slides[i].style.removeProperty('order');
        slides[i].className = slides[i].className.replace(" prev_slide", "");
        slides[i].className = slides[i].className.replace(" next_slide", "");
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    var active_slide = slides[slideIndex - 1];
    var active_dot = dots[slideIndex - 1];
    var prev_slide = active_slide.previousElementSibling;
    if (prev_slide == null) {prev_slide = slides[slides.length - 1]};
    var next_slide = active_slide.nextElementSibling;
    if (next_slide == null) {next_slide = slides[0]};
    prevslide(prev_slide);
    active_slide.style.display = "block";
    active_slide.style.order = 2;
    nextslide(next_slide);
    active_dot.className += " active";
}

function prevslide(n) {
    n.style.display = "block";
    // n.style.order = 1;
    n.className += " prev_slide";
}
function nextslide(n) {
    n.style.display = "block";
    // n.style.order = 3;
    n.className += " next_slide";
}

function handleCarouselChange(e) {
    if (e.matches) {
        slides(1);
    } else {
        showSlides(1)
    }
}

function emailCheck(event) {
    for (let i = 0; i < formItem.length; i++) {
        console.log(formItem[i].checkValidity())
        if (!formItem[i].checkValidity()) {
            formItem[i].oninvalid = function (e) {
                e.preventDefault();
            }
            if (!formError.classList.contains('active')) {
                formError.classList.toggle('active');
                formItem[i].classList.toggle('active');
            }
            formItem[i].addEventListener('keydown', function () {
                formItem[i].classList.toggle('active');
            })
        } else {
            if (formError.classList.contains('active')) {
                formError.classList.toggle('active');
                formItem[i].classList.toggle('active');
            }
        }

    }
}