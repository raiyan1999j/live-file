document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     1. Navigation & Reveal Animations
     ========================================= */

  // Navigation Lamp Highlighter
  const navItems = document.querySelectorAll(".nav-item");
  const highlighter = document.getElementById("lamp-highlighter");

  function updateHighlighter(activeItem) {
    if (!activeItem) return;
    const rect = activeItem.getBoundingClientRect();
    const parentRect = activeItem.parentElement.getBoundingClientRect();

    const left = rect.left - parentRect.left;
    const width = rect.width;

    highlighter.style.left = `${left}px`;
    highlighter.style.width = `${width}px`;
    highlighter.style.opacity = "1";
  }

  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = item.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
        navItems.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
        updateHighlighter(item);
      }
    });
  });

  function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navItems.forEach((item) => item.classList.remove("active"));
        const activeNavItem = document.querySelector(
          `.nav-item[href="#${sectionId}"]`,
        );
        if (activeNavItem) {
          activeNavItem.classList.add("active");
          updateHighlighter(activeNavItem);
        }
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavOnScroll, { passive: true });
  window.addEventListener("resize", () => {
    const currentActive = document.querySelector(".nav-item.active");
    if (currentActive) updateHighlighter(currentActive);
  });

  // Initial positioning for navbar
  const activeItem = document.querySelector(".nav-item.active");
  if (activeItem) setTimeout(() => updateHighlighter(activeItem), 50);

  // Global Scroll Reveal Observer (Applies to Hero and other sections)
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.1 },
  );

  document
    .querySelectorAll(".hero-reveal")
    .forEach((el) => revealObserver.observe(el));

  /* =========================================
     2. Gallery Carousel Section
     ========================================= */
  initCarousel();

  /* =========================================
     3. Portfolio Grid Section (Demos)
     ========================================= */
  renderPortfolio();

  /* =========================================
     4. Feature Section (Glowing Effect)
     ========================================= */
  document.querySelectorAll(".glowing-card-border").forEach((el) => {
    new GlowingEffect(el);
  });

  /* =========================================
     5. Mega Menu Showcase Section
     ========================================= */
  initMegaMenuShowcase();

  /* =========================================
     6. Ready Pages Showcase Section
     ========================================= */
  initPagesShowcase();

  /* =========================================
     7. Prebuilt Sections Showcase
     ========================================= */
  initPrebuiltSectionsShowcase();

  /* =========================================
     8. Testimonials Section (Animated)
     ========================================= */
  initImageTestimonials();
});

/* =========================================
   Gallery Carousel Logic
   ========================================= */
const carouselConfig = {
  images: [
    "resource/image/lightmode/dashboard.png",
    "resource/image/lightmode/all-campaigns.png",
    "resource/image/lightmode/create-new.png",
    "resource/image/lightmode/ai-generator.png",
    "resource/image/darkmode/dashboard.png",
    "resource/image/darkmode/all-campaigns.png",
    "resource/image/darkmode/create-new.png",
    "resource/image/darkmode/ai-generator.png",
  ],
};

function initCarousel() {
  const container = document.getElementById("carousel-container");
  if (!container) return;

  const createImageHTML = (imageUrl, index) => `
    <figure class="md:max-w-[468px] sm:max-w-[300px] max-w-[250px] w-full rounded-2xl overflow-hidden carousel-item-saas">
      <img src="${imageUrl}" class="object-cover size-full" alt="demo ${index + 1}" loading="lazy" />
    </figure>
  `;

  const imagesHTML = carouselConfig.images
    .map((url, index) => createImageHTML(url, index))
    .join("");

  container.innerHTML = `
    <div class="rfm-marquee marquee-animation">
      <div class="rfm-initial-child-container">
        <div class="rfm-child marquee-child">
          <div class="flex items-start gap-x-3 mr-3">${imagesHTML}</div>
        </div>
      </div>
    </div>
    <div class="rfm-marquee marquee-animation">
      <div class="rfm-child marquee-child">
        <div class="flex items-start gap-x-3 mr-3">${imagesHTML}</div>
      </div>
    </div>
  `;
}

/* =========================================
   Portfolio Grid Logic (Demos)
   ========================================= */

// To use: Create 'lightmode' & 'darkmode' folders in 'resource/image/'
// and name files matching the 'name' property below.
const portfolioData = [
  { name: "dashboard", title: "Main Dashboard" },
  { name: "dashboard-1", title: "E-commerce Overview" },
  { name: "dashboard-2", title: "SaaS Analytics" },
  { name: "my-summary", title: "Personal Summary" },
  { name: "notifications", title: "Notification Center" },
  { name: "all-campaigns", title: "Campaign Manager" },
  { name: "create-new", title: "Campaign Builder" },
  { name: "drafts", title: "Draft Campaigns" },
  { name: "scheduled", title: "Scheduled Tasks" },
  { name: "sent", title: "Sent Analytics" },
  { name: "ai-generator", title: "AI Campaign Tool" },
  { name: "subject-line-ai", title: "AI Subject Line" },
  { name: "ab-testing", title: "A/B Test Center" },
  { name: "email-templates", title: "Template Library" },
  { name: "saved-layouts", title: "Custom Layouts" },
  { name: "snippets-blocks", title: "Content Blocks" },
];

const portfolioItems = portfolioData.map((item, i) => ({
  id: i + 1,
  title: item.title,
  lightImage: `resource/image/lightmode/${item.name}.png`,
  darkImage: `resource/image/darkmode/${item.name}.png`,
  lightLink: "#",
  darkLink: "#",
}));

function renderPortfolio() {
  const grid = document.getElementById("portfolio-grid");
  if (!grid) return;

  grid.innerHTML = portfolioItems
    .map(
      (item) => `
      <div class="portfolio-item-wrapper group">
        <a id="card-link-${item.id}" href="${item.lightLink}" target="_blank" class="portfolio-card hero-reveal" style="transition-delay: 0.1s">
          <div class="portfolio-card-image relative z-10">
            <img id="card-img-${item.id}" src="${item.lightImage}" alt="${item.title}" />
            <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-20">
               <button class="bg-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300" 
                       onclick="event.preventDefault(); event.stopPropagation(); updateCard(${item.id}, '${item.lightImage}', '${item.lightLink}', this, 'light')">
                 <i class="ph ph-sun text-xl"></i>
               </button>
               <button class="bg-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75" 
                       onclick="event.preventDefault(); event.stopPropagation(); updateCard(${item.id}, '${item.darkImage}', '${item.darkLink}', this, 'dark')">
                 <i class="ph ph-moon text-xl"></i>
               </button>
            </div>
          </div>
          <div class="portfolio-card-content relative z-10">
            <h3 class="portfolio-card-title">${item.title}</h3>
          </div>
        </a>
      </div>
    `,
    )
    .join("");

  // Re-observe for scroll reveal
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("active");
      });
    },
    { threshold: 0.1 },
  );

  grid
    .querySelectorAll(".hero-reveal")
    .forEach((el) => revealObserver.observe(el));
}

function updateCard(id, imgSrc, linkUrl, btn, mode) {
  const img = document.getElementById(`card-img-${id}`);
  const link = document.getElementById(`card-link-${id}`);

  if (img && link) {
    img.style.opacity = "0.5";
    img.style.filter = "blur(10px)";
    setTimeout(() => {
      img.src = imgSrc;
      link.href = linkUrl;
      img.style.opacity = "1";
      img.style.filter = "blur(0px)";
    }, 250);
  }

  if (btn) {
    const buttons = btn.parentElement.querySelectorAll("button");
    buttons.forEach((b) => {
      b.style.backgroundColor = "";
      b.classList.remove("ring-2", "ring-blue-500");
    });
    btn.style.border = "2px solid #0ea5e9";
  }
}

/* =========================================
   Feature Section (Glowing Effect Logic)
   ========================================= */
class GlowingEffect {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      spread: 40,
      proximity: 64,
      inactiveZone: 0.01,
      matchBorderWidth: 3,
      ...options,
    };
    this.container = element;
    this.lastPosition = { x: 0, y: 0 };
    this.animationFrame = null;
    this.currentAngle = 0;

    this.init();
  }

  init() {
    this.container.style.setProperty("--spread", this.options.spread);
    this.container.style.setProperty(
      "--glowingeffect-border-width",
      `${this.options.matchBorderWidth}px`,
    );
    this.container.style.setProperty("--repeating-conic-gradient-times", "5");
    this.container.style.setProperty(
      "--gradient",
      `radial-gradient(circle, #dd7bbb 10%, #dd7bbb00 20%),
       radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%),
       radial-gradient(circle at 60% 60%, #5a922c 10%, #5a922c00 20%), 
       radial-gradient(circle at 40% 60%, #4c7894 10%, #4c789400 20%),
       repeating-conic-gradient(from 236.84deg at 50% 50%, #dd7bbb 0%, #d79f1e calc(25% / var(--repeating-conic-gradient-times)), #5a922c calc(50% / var(--repeating-conic-gradient-times)), #4c7894 calc(75% / var(--repeating-conic-gradient-times)), #dd7bbb calc(100% / var(--repeating-conic-gradient-times)))`,
    );

    this.handleMove = this.handleMove.bind(this);
    window.addEventListener("scroll", this.handleMove, { passive: true });
    document.body.addEventListener("pointermove", this.handleMove, {
      passive: true,
    });
  }

  handleMove(e) {
    if (!this.container) return;
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);

    this.animationFrame = requestAnimationFrame(() => {
      const rect = this.container.getBoundingClientRect();
      const mouseX = e?.x ?? this.lastPosition.x;
      const mouseY = e?.y ?? this.lastPosition.y;
      if (e) this.lastPosition = { x: mouseX, y: mouseY };

      const centerX = rect.left + rect.width * 0.5;
      const centerY = rect.top + rect.height * 0.5;
      const distanceFromCenter = Math.hypot(mouseX - centerX, mouseY - centerY);

      const glowLine = this.container.querySelector(".glow-line");
      const isActive =
        mouseX > rect.left - this.options.proximity &&
        mouseX < rect.right + this.options.proximity &&
        mouseY > rect.top - this.options.proximity &&
        mouseY < rect.bottom + this.options.proximity;

      this.container.style.setProperty("--active", isActive ? "1" : "0");
      if (glowLine) glowLine.style.opacity = isActive ? "1" : "0";

      if (isActive) {
        let targetAngle =
          (180 * Math.atan2(mouseY - centerY, mouseX - centerX)) / Math.PI + 90;
        const angleDiff = ((targetAngle - this.currentAngle + 180) % 360) - 180;
        this.currentAngle += angleDiff * 0.15;
        this.container.style.setProperty("--start", this.currentAngle);
      }
    });
  }
}

/* =========================================
   Mega Menu Showcase Logic
   ========================================= */
function initMegaMenuShowcase() {
  const container = document.getElementById("mega-menu-images-container");
  if (!container) return;
  container.innerHTML = "";

  const blocks = [
    {
      src: "resource/image/lightmode/dashboard.png",
      span: "col-span-12 lg:col-span-7",
      height: "h-[250px]",
    },
    {
      src: "resource/image/lightmode/email-templates.png",
      span: "col-span-12 lg:col-span-5",
      height: "h-[250px]",
    },
    {
      src: "resource/image/lightmode/all-campaigns.png",
      span: "col-span-12 lg:col-span-4",
      height: "h-[220px]",
    },
    {
      src: "resource/image/lightmode/scheduled.png",
      span: "col-span-12 lg:col-span-8",
      height: "h-[220px]",
    },
  ];

  blocks.forEach((block) => {
    const wrapper = document.createElement("div");
    wrapper.className = `group relative rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 ${block.span} ${block.height}`;
    wrapper.innerHTML = `
      <img src="${block.src}" alt="Feature" class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    `;
    container.appendChild(wrapper);
  });
}

/* =========================================
   Ready Pages Showcase Logic
   ========================================= */
function initPagesShowcase() {
  const container = document.getElementById("pages-showcase-container");
  if (!container) return;
  container.innerHTML = "";

  const pages = [
    {
      src: "resource/image/lightmode/ai-generator.png",
      height: "h-48 md:h-64",
    },
    {
      src: "resource/image/lightmode/notifications.png",
      height: "h-40 md:h-52",
    },
    {
      src: "resource/image/lightmode/saved-layouts.png",
      height: "h-44 md:h-60",
    },
    {
      src: "resource/image/lightmode/subject-line-ai.png",
      height: "h-52 md:h-72",
    },
  ];

  pages.forEach((page) => {
    const wrapper = document.createElement("div");
    wrapper.className = `group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`;
    wrapper.innerHTML = `<img src="${page.src}" class="w-full ${page.height} object-cover transform transition-transform duration-700 group-hover:scale-105" />`;
    container.appendChild(wrapper);
  });
}

/* =========================================
   Prebuilt Sections Showcase Logic
   ========================================= */
function initPrebuiltSectionsShowcase() {
  const leftCol = document.getElementById("sections-left-column");
  const rightCol = document.getElementById("sections-right-column");
  if (!leftCol || !rightCol) return;

  const leftImages = [
    { src: "resource/image/lightmode/dashboard.png", height: "h-[450px]" },
    { src: "resource/image/lightmode/all-campaigns.png", height: "h-[320px]" },
    { src: "resource/image/lightmode/scheduled.png", height: "h-[500px]" },
  ];
  const rightImages = [
    { src: "resource/image/lightmode/ai-generator.png", height: "h-[350px]" },
    { src: "resource/image/lightmode/notifications.png", height: "h-[550px]" },
    {
      src: "resource/image/lightmode/email-templates.png",
      height: "h-[400px]",
    },
  ];

  const createCard = (imgData) => {
    const wrapper = document.createElement("div");
    wrapper.className =
      "group relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.02]";
    wrapper.innerHTML = `<img src="${imgData.src}" alt="Section" class="w-full ${imgData.height} object-cover object-top transform transition-transform duration-700 group-hover:scale-105" />`;
    return wrapper;
  };

  leftImages.forEach((img) => leftCol.appendChild(createCard(img)));
  rightImages.forEach((img) => rightCol.appendChild(createCard(img)));
}

/* =========================================
   Testimonials Logic (Animated Columns)
   ========================================= */
const testimonialsConfig = {
  columns: [
    [
      "resource/image/lightmode/dashboard.png",
      "resource/image/lightmode/ai-generator.png",
      "resource/image/lightmode/all-campaigns.png",
      "resource/image/lightmode/ab-testing.png",
    ],
    [
      "resource/image/lightmode/notifications.png",
      "resource/image/lightmode/saved-layouts.png",
      "resource/image/lightmode/scheduled.png",
      "resource/image/lightmode/email-templates.png",
    ],
    [
      "resource/image/lightmode/create-new.png",
      "resource/image/lightmode/dashboard-1.png",
      "resource/image/lightmode/dashboard-2.png",
      "resource/image/lightmode/drafts.png",
    ],
    [
      "resource/image/lightmode/my-summary.png",
      "resource/image/lightmode/sent.png",
      "resource/image/lightmode/snippets-blocks.png",
      "resource/image/lightmode/subject-line-ai.png",
    ],
  ],
};

function initImageTestimonials() {
  const columns = document.querySelectorAll(".testimonial-column");
  if (columns.length === 0) return;

  columns.forEach((column) => {
    const columnIndex = parseInt(column.getAttribute("data-column"));
    const scrollContainer = column.querySelector(".testimonial-scroll");
    if (!scrollContainer || !testimonialsConfig.columns[columnIndex]) return;

    const images = testimonialsConfig.columns[columnIndex];
    let html = "";
    for (let i = 0; i < 2; i++) {
      images.forEach((imageUrl, imgIndex) => {
        html += `
          <div class="testimonial-image-card w-[240px] h-[463px] bg-white rounded-2xl overflow-hidden shadow-lg mb-6 hover:shadow-xl transition-shadow duration-300">
            <img src="${imageUrl}" alt="Preview ${imgIndex + 1}" class="w-full h-full object-contain bg-gray-50" loading="lazy" />
          </div>`;
      });
    }
    scrollContainer.innerHTML = html;
  });

  initTestimonialsScrollAnimation();
}

function initTestimonialsScrollAnimation() {
  const columns = document.querySelectorAll(".testimonial-column");
  if (columns.length === 0) return;
  const scrollMultipliers = [1, 1.3, 0.8, 1.1];

  window.addEventListener(
    "scroll",
    () => {
      columns.forEach((column) => {
        const scrollContainer = column.querySelector(".testimonial-scroll");
        if (!scrollContainer) return;
        const rect = column.closest("section").getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
          const progress = Math.max(
            0,
            Math.min(
              1,
              (windowHeight - rect.top) / (windowHeight + rect.height),
            ),
          );
          const columnIndex = parseInt(column.getAttribute("data-column"));
          const multiplier = scrollMultipliers[columnIndex] || 1;
          scrollContainer.style.transform = `translateY(${-(progress * 50 * multiplier)}%)`;
        }
      });
    },
    { passive: true },
  );
}
