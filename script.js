/**
 * GVK Software — site scripts
 *
 * To add a new app: copy an entry in APPS below, then call renderApps() on load.
 * Each app needs: id, name, description, playUrl, iconPath, iconAlt
 */
const APPS = [
  {
    id: 'hedgehog',
    name: 'Hedgehog',
    tagline: 'Password manager',
    description:
      'Privacy-first credentials manager with AES-256 encryption, two-factor encryption keys, and a zero-knowledge architecture. Works offline too.',
    playUrl: 'https://play.google.com/store/apps/details?id=com.gvksoftware.hedgehog',
    iconPath: 'assets/hedgehog.png',
    iconAlt: 'Hedgehog app icon',
  },
  {
    id: 'mylurecollection',
    name: 'My Lure Collection',
    tagline: 'Fishing',
    description:
      'Your all-in-one angling companion. Log catches, organize gear, track statistics, save fishing spots, check weather and moon phases, and build your lure collection.',
    playUrl: 'https://play.google.com/store/apps/details?id=co.uk.gvksoftware.mylurecollection',
    iconPath: 'assets/mylurecollection.png',
    iconAlt: 'My Lure Collection app icon',
  },
  {
    id: 'etheron',
    name: 'Etheron',
    tagline: 'Ethereum Stats',
    description:
      'Independent Ethereum network dashboard. Activity trends, price charts, gas fees, network health, staking stats, and read-only tools — no wallet, no trading.',
    playUrl: 'https://play.google.com/store/apps/details?id=co.uk.gvksoftware.etheron',
    iconPath: 'assets/etheron.png',
    iconAlt: 'Etheron app icon',
  },
  {
    id: 'dashboard',
    name: 'Vehicle Plate Info',
    tagline: 'MOT & Tax',
    description:
      'Welcome to Dashboard! Check MOT history (DVSA) and tax status (DVLA) for UK vehicles (cars, motorcycles, vans, HGVs, buses etc.) by entering a registration number.',
    playUrl: 'https://play.google.com/store/apps/details?id=co.uk.gvksoftware.dashboardvehicleplateinfo',
    iconPath: 'assets/dashboard.png',
    iconAlt: 'Vehicle Plate Info - MOT & Tax app icon',
  },
  {
    id: 'metrics',
    name: 'Metrics & Graph',
    tagline: 'Habit Tracker',
    description:
      'Transform your daily routines into powerful visualizations. Metrics and Graph is your ultimate Tracker for your Activities, Data, Habits, or Goals. Track measurements about health, finances, gardening, activities, and any other metric or event that comes to your mind!',
    playUrl: 'https://play.google.com/store/apps/details?id=co.uk.gvksoftware.metrics',
    iconPath: 'assets/metrics.png',
    iconAlt: 'Habit Tracker: Metrics & Graph app icon',
  },
  {
    id: 'sowingcalendar',
    name: 'Sowing Calendar',
    tagline: 'Gardening',
    description:
      'Happy gardening! A sow / harvest guide that will help you with your gardening throughout the year. All the information you need in order to successfully grow the most popular vegetables in your region. ',
    playUrl: 'https://play.google.com/store/apps/details?id=com.GVKSoftware.sowingcalendar',
    iconPath: 'assets/sowing.png',
    iconAlt: 'Sowing Calendar app icon',
  },
];

function createPlayBadge() {
  return `
    <svg class="play-badge__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M3.609 1.814L13.792 12 3.61 22.186a1.003 1.003 0 0 1-.601.291H2.006A1.006 1.006 0 0 1 1 21.472V2.528A1.006 1.006 0 0 1 2.006 1.523h1.002a1.003 1.003 0 0 1 .601.291zM15.042 8.394l-1.966 1.135 4.303 2.486 1.966-1.135-4.303-2.486zm4.303 3.729l-1.966 1.135 1.966 1.135 1.966-1.135-1.966-1.135zM15.042 15.852l4.303 2.486 1.966-1.135-4.303-2.486-1.966 1.135z"/>
    </svg>
    <span class="play-badge__text">
      <span class="play-badge__label">Get it on</span>
      <span class="play-badge__store">Google Play</span>
    </span>
  `;
}

function createAppCard(app) {
  const article = document.createElement('article');
  article.className = 'app-card';
  article.id = app.id;

  article.innerHTML = `
    <div class="app-card__icon-wrap">
      <img
        class="app-card__icon"
        src="${app.iconPath}"
        alt="${app.iconAlt}"
        width="88"
        height="88"
        loading="lazy"
        decoding="async"
      />
    </div>
    <div class="app-card__body">
      <p class="app-card__tagline">${app.tagline}</p>
      <h3 class="app-card__title">${app.name}</h3>
      <p class="app-card__description">${app.description}</p>
      <a
        class="play-badge"
        href="${app.playUrl}"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get ${app.name} on Google Play"
      >
        ${createPlayBadge()}
      </a>
    </div>
  `;

  return article;
}

function renderApps() {
  const grid = document.getElementById('apps-grid');
  if (!grid) return;

  const fragment = document.createDocumentFragment();
  APPS.forEach((app) => fragment.appendChild(createAppCard(app)));
  grid.replaceChildren(fragment);
}

function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('site-header--scrolled', window.scrollY > 12);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('site-nav--open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('nav-open', isOpen);
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('site-nav--open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderApps();
  initHeaderScroll();
  initMobileNav();
});
