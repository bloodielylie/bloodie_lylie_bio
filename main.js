/* -----------------------
   DARK / LIGHT TOGGLE
------------------------ */
// const toggle = document.getElementById('themeToggle');
// const icon = toggle.querySelector('i');

// const savedTheme = localStorage.getItem('theme');
// if (savedTheme) {
//     document.documentElement.setAttribute('data-theme', savedTheme);
//     icon.className = savedTheme === 'dark'
//         ? 'fa-solid fa-moon'
//         : 'fa-solid fa-sun';
// }

// toggle.addEventListener('click', () => {
//     const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
//     const newTheme = isDark ? 'light' : 'dark';

//     document.documentElement.setAttribute('data-theme', newTheme);
//     localStorage.setItem('theme', newTheme);

//     icon.className = newTheme === 'dark'
//         ? 'fa-solid fa-moon'
//         : 'fa-solid fa-sun';
// });
const toggle = document.getElementById('themeToggle');
const icon = toggle.querySelector('i');

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
  if (icon) {
    icon.className = savedTheme === 'dark'
      ? 'fa-solid fa-moon'
      : 'fa-solid fa-sun';
  }
}

toggle.addEventListener('pointerup', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  if (icon) {
    icon.className = newTheme === 'dark'
      ? 'fa-solid fa-moon'
      : 'fa-solid fa-sun';
  }
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
// document.addEventListener('DOMContentLoaded', () => {
//     const items = document.querySelectorAll('.product-item.reveal');

//     const observer = new IntersectionObserver(
//         (entries, obs) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     entry.target.classList.add('is-visible');
//                     obs.unobserve(entry.target); // chỉ chạy 1 lần
//                 }
//             });
//         },
//         {
//             threshold: 0.3,              // chỉ khi thấy ~30%
//             rootMargin: '0px 0px -10% 0px' // không trigger quá sớm
//         }
//     );

//     items.forEach(item => observer.observe(item));
// });


//render sản phẩm.//

document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.product-item.reveal');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: '0px 0px -10% 0px'
    }
  );

  items.forEach(item => observer.observe(item));
});


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


// tìm kiếm
const searchInput = document.getElementById('productSearch');
const clearBtn = document.getElementById('clearSearch');
const productItems = document.querySelectorAll('.product-item');
const emptyState = document.getElementById('emptyState');

function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function highlight(text, keyword) {
  if (!keyword) return text;

  const regex = new RegExp(`(${keyword})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

searchInput.addEventListener('input', () => {
  const keywordRaw = searchInput.value.trim();
  const keyword = normalize(keywordRaw);


  let visibleCount = 0;

  productItems.forEach(item => {
    const nameEl = item.querySelector('.product-name');
    const originalText = nameEl.textContent;
    const normalizedName = normalize(originalText);

    if (normalizedName.includes(keyword)) {
      item.style.display = '';
      item.classList.remove('hide');

      nameEl.innerHTML = highlight(originalText, keywordRaw);
      visibleCount++;
    } else {
      item.classList.add('hide');
      setTimeout(() => {
        item.style.display = 'none';
      }, 300);

      nameEl.textContent = originalText;
      item.classList.remove('is-visible');
    }
  });

  emptyState.hidden = visibleCount !== 0;
});


