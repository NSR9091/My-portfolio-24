const links = document.querySelectorAll('.section-nav a');
links.forEach((link) => {
  link.addEventListener('click', () => {
    links.forEach((item) => item.classList.remove('active'));
    link.classList.add('active');
  });
});

if (links.length) {
  links[0].classList.add('active');
}

const themeToggle = document.querySelector('.theme-toggle');
const sparkleLayer = document.querySelector('.sparkles');
const entryOverlay = document.getElementById('entryOverlay');
const enterButton = document.getElementById('enterButton');

if (entryOverlay && enterButton) {
  enterButton.addEventListener('click', () => {
    document.body.classList.add('entered');
    document.body.classList.remove('entry-locked');
    entryOverlay.style.display = 'none';
  });
}

if (themeToggle) {
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.setAttribute('aria-pressed', 'true');
    themeToggle.querySelector('.toggle-icon').textContent = '☀️';
  }

  themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.querySelector('.toggle-icon').textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
  });
}

if (sparkleLayer) {
  const sparkleCount = 14;
  for (let i = 0; i < sparkleCount; i += 1) {
    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.setProperty('--delay', `${Math.random() * 3}s`);
    sparkle.style.animationDuration = `${3 + Math.random() * 3}s`;
    sparkleLayer.appendChild(sparkle);
  }
}

const revealItems = document.querySelectorAll('.sidebar-section, .panel, .topbar');

revealItems.forEach((item, index) => {
  item.style.setProperty('--reveal-delay', `${Math.min(index * 70, 420)}ms`);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px' });

revealItems.forEach((item) => observer.observe(item));

let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const currentScrollTop = window.scrollY || document.documentElement.scrollTop;

  if (currentScrollTop > lastScrollTop) {
    document.body.classList.add('scrolling-down');
    document.body.classList.remove('scrolling-up');
  } else {
    document.body.classList.add('scrolling-up');
    document.body.classList.remove('scrolling-down');
  }

  lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
}, { passive: true });
