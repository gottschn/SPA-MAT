const mobileMenuButton = document.querySelector('#mobile-menu-button');
const mobileMenu = document.querySelector('#mobile-menu');

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

const carousel = document.querySelector('[data-carousel]');
const carouselSlides = carousel ? Array.from(carousel.querySelectorAll('.carousel-slide')) : [];
const prevButton = document.querySelector('#carousel-prev');
const nextButton = document.querySelector('#carousel-next');
const indicators = carousel ? Array.from(carousel.querySelectorAll('[data-carousel-indicator]')) : [];
const status = document.querySelector('#carousel-status');
let carouselIndex = 0;
let carouselTimer;

function updateCarousel(index) {
  if (!carouselSlides.length) return;
  carouselIndex = (index + carouselSlides.length) % carouselSlides.length;

  carouselSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle('hidden', slideIndex !== carouselIndex);
  });

  indicators.forEach((indicator, indicatorIndex) => {
    if (indicatorIndex === carouselIndex) {
      indicator.classList.remove('bg-white/60');
      indicator.classList.add('bg-white');
      indicator.setAttribute('aria-current', 'true');
    } else {
      indicator.classList.remove('bg-white');
      indicator.classList.add('bg-white/60');
      indicator.removeAttribute('aria-current');
    }
  });

  if (status) {
    status.textContent = `Mostrando iniciativa ${carouselIndex + 1} de ${carouselSlides.length}`;
  }
}

function nextSlide() {
  updateCarousel(carouselIndex + 1);
}

function prevSlide() {
  updateCarousel(carouselIndex - 1);
}

function startCarouselAutoplay() {
  if (!carouselSlides.length) return;
  stopCarouselAutoplay();
  carouselTimer = window.setInterval(nextSlide, 7000);
}

function stopCarouselAutoplay() {
  if (carouselTimer) {
    window.clearInterval(carouselTimer);
    carouselTimer = undefined;
  }
}

if (nextButton) {
  nextButton.addEventListener('click', () => {
    nextSlide();
    startCarouselAutoplay();
  });
}

if (prevButton) {
  prevButton.addEventListener('click', () => {
    prevSlide();
    startCarouselAutoplay();
  });
}

if (carousel && indicators.length) {
  indicators.forEach((indicator) => {
    indicator.addEventListener('click', () => {
      const targetIndex = Number(indicator.dataset.carouselIndicator);
      if (!Number.isNaN(targetIndex)) {
        updateCarousel(targetIndex);
        startCarouselAutoplay();
      }
    });
  });
}

if (carousel) {
  carousel.addEventListener('mouseenter', stopCarouselAutoplay);
  carousel.addEventListener('mouseleave', startCarouselAutoplay);
}

updateCarousel(0);
startCarouselAutoplay();

const currentYearElement = document.querySelector('#current-year');
if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear();
}
