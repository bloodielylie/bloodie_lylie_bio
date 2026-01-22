/* -----------------------
   DARK / LIGHT TOGGLE
------------------------ */
const toggle = document.getElementById('themeToggle');
const icon = toggle.querySelector('i');

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    icon.className = savedTheme === 'dark'
        ? 'fa-solid fa-moon'
        : 'fa-solid fa-sun';
}

toggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    icon.className = newTheme === 'dark'
        ? 'fa-solid fa-moon'
        : 'fa-solid fa-sun';
});

/* -----------------------
   PARALLAX (iOS-like)
------------------------ */
const app = document.querySelector('.parallax');

window.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 8;
    const y = (e.clientY / window.innerHeight - 0.5) * 8;
    app.style.transform = `translate(${x}px, ${y}px)`;
});

/* Mobile tilt (if supported) */
window.addEventListener('deviceorientation', e => {
    if (!e.beta || !e.gamma) return;
    const x = e.gamma / 20;
    const y = e.beta / 40;
    app.style.transform = `translate(${x}px, ${y}px)`;
});


/* =========================
   SCROLL REVEAL (FIXED)
========================= */
document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.product-item.reveal');

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target); // chỉ chạy 1 lần
                }
            });
        },
        {
            threshold: 0.8,              // chỉ khi thấy ~30%
            rootMargin: '0px 0px -10% 0px' // không trigger quá sớm
        }
    );

    items.forEach(item => observer.observe(item));
});


//render sản phẩm.//

const productsList = document.getElementById("products-list");

products.forEach(product => {
  const item = document.createElement("a");

  item.href = product.link;
  item.target = "_blank";
  item.rel = "noopener noreferrer";
  item.className = "product-item reveal product-link";

  item.innerHTML = `
    <div class="product-image-wrapper">
      <img src="${product.image}" alt="${product.name}">
    </div>

    <div class="product-content">
      <h4 class="product-name">${product.name}</h4>
    </div>

    <span class="product-arrow">›</span>
  `;

  productsList.appendChild(item);
});
