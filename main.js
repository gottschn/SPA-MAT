const mobileMenuButton = document.querySelector('#mobile-menu-button');
const mobileMenu = document.querySelector('#mobile-menu');

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialCards = testimonialTrack ? Array.from(testimonialTrack.children) : [];
let testimonialIndex = 0;

const prevButton = document.querySelector('.testimonial-prev');
const nextButton = document.querySelector('.testimonial-next');

function visibleTestimonialsCount() {
  return window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
}

function updateTestimonials() {
  if (!testimonialCards.length) return;
  const visibleCount = visibleTestimonialsCount();
  testimonialCards.forEach((card, index) => {
    const isVisible = index >= testimonialIndex && index < testimonialIndex + visibleCount;
    card.classList.toggle('hidden', !isVisible);
  });
}

function moveTestimonials(direction) {
  if (!testimonialCards.length) return;
  const visibleCount = visibleTestimonialsCount();
  const maxIndex = Math.max(0, testimonialCards.length - visibleCount);
  testimonialIndex = Math.min(Math.max(testimonialIndex + direction, 0), maxIndex);
  updateTestimonials();
}

if (prevButton) {
  prevButton.addEventListener('click', () => moveTestimonials(-1));
}

if (nextButton) {
  nextButton.addEventListener('click', () => moveTestimonials(1));
}

window.addEventListener('resize', () => {
  testimonialIndex = Math.min(testimonialIndex, Math.max(0, testimonialCards.length - visibleTestimonialsCount()));
  updateTestimonials();
});

updateTestimonials();
