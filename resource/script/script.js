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
    "resource/image/dashboard1.png",
    "resource/image/allcampaign.png",
    "resource/image/createnew.png",
    "resource/image/mysummery.png",
    "resource/image/dashboard2.png",
    "resource/image/dashboard3.png",
    "resource/image/notifications.png",
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

// Updated to match all 57 images found in resource/image/
const portfolioData = [
  { name: "dashboard1", title: "Dashboard 1", link: "index.html" },
  { name: "dashboard2", title: "Dashboard 2", link: "dashboard1.html" },
  { name: "dashboard3", title: "Dashboard 3", link: "dashboard2.html" },
  { name: "mysummery", title: "My Summary", link: "mysummery.html" },
  { name: "notifications", title: "Notifications", link: "notifications.html" },
  { name: "allcampaign", title: "All Campaign", link: "allcampaigns.html" },
  { name: "createnew", title: "Create New", link: "createnew.html" },
  { name: "draft", title: "Draft", link: "draft.html" },
  { name: "scheduled", title: "Scheduled", link: "scheduled.html" },
  { name: "sent", title: "Sent", link: "sent.html" },
  { name: "aigenerator", title: "AI Generator", link: "aigenerator.html" },
  { name: "subjectlineai", title: "Subject Line AI", link: "subjectlineai.html" },
  { name: "abtesting", title: "A/B Testing", link: "abtesting.html" },
  { name: "emailtemplates", title: "Email Templates", link: "emailtemplates.html" },
  { name: "savedlayouts", title: "Saved Layouts", link: "savedlayouts.html" },
  { name: "snippetlayouts", title: "Snippet Layouts", link: "snippetsblocks.html" },
  { name: "workflow", title: "Workflow", link: "workflow.html" },
  { name: "trigger&Rules", title: "Trigger & Rules", link: "triggersrules.html" },
  { name: "dripSequence", title: "Drip Sequence", link: "dripsequences.html" },
  { name: "campaignCalender", title: "Campaign Calender", link: "campaigncalendar.html" },
  { name: "sendTimeAi", title: "Send Time AI", link: "sendtimeai.html" },
  { name: "abandonedCart", title: "Abandoned Cart", link: "abandonedcart.html" },
  { name: "onboardingFlows", title: "Onboarding Flows", link: "onboardingflows.html" },
  { name: "reEngagementFlows", title: "Re-Engagement Flows", link: "reengagementflows.html" },
  { name: "allContacts", title: "All Contacts", link: "allcontacts.html" },
  { name: "segments", title: "Segments", link: "segments.html" },
  { name: "tags&attribute", title: "Tags & Attribute", link: "tagsattributes.html" },
  { name: "companiesAccount", title: "Companies Account", link: "companiesaccounts.html" },
  { name: "dealsPipelines", title: "Deals Pipelines", link: "dealspipelines.html" },
  { name: "task&Flowup", title: "Task & Follow-up", link: "tasksfollowup.html" },
  { name: "riskInsights", title: "Risk Insights", link: "riskinsights.html" },
  { name: "targetGroups", title: "Target Groups", link: "targetgroups.html" },
  { name: "segmentsAi", title: "Segments AI", link: "segmentsai.html" },
  { name: "overview1", title: "Overview 1", link: "overview.html" },
  { name: "overview2", title: "Overview 2", link: "overview2.html" },
  { name: "campaignPerformance", title: "Campaign Performance", link: "campaignperformance.html" },
  { name: "automationStats", title: "Automation Stats", link: "automationstats.html" },
  { name: "contactInsight", title: "Contact Insight", link: "contactinsights.html" },
  { name: "emailDeliverabililty", title: "Email Deliverability", link: "emaildeliverability.html" },
  { name: "exportReport", title: "Export Report", link: "exportreports.html" },
  { name: "conversionReport", title: "Conversion Report", link: "conversionreport.html" },
  { name: "spamMonitoring", title: "Spam Monitoring", link: "spammonitoring.html" },
  { name: "domain", title: "Domain", link: "domain.html" },
  { name: "emailVerification", title: "Email Verification", link: "emailverification.html" },
  { name: "inboxPreview", title: "Inbox Preview", link: "inboxpreview.html" },
  { name: "linkTracker", title: "Link Tracker", link: "linktracker.html" },
  { name: "spamChecker", title: "Spam Checker", link: "spamchecker.html" },
  { name: "CRMIntegration", title: "CRM Integration", link: "crmintegrations.html" },
  { name: "eCommerceIntegration", title: "E-Commerce Integration", link: "ecommerceintegrations.html" },
  { name: "webhooksApi", title: "Webhooks API", link: "webhooksapikeys.html" },
  { name: "billing&Subscription", title: "Billing & Subscription", link: "billingsubscription.html" },
  { name: "emailSendingSetting", title: "Email Sending Setting", link: "emailsettings.html" },
  { name: "user&Roles", title: "User & Roles", link: "usersroles.html" },
  { name: "workplace&Branding", title: "Workplace & Branding", link: "workplacebranding.html" },
  { name: "documentaion", title: "Documentation", link: "documentation.html" },
  { name: "supportTickets", title: "Support Tickets", link: "supporttickets.html" },
  { name: "systemStatus", title: "System Status", link: "systemstatus.html" },
];

const BASE_URL = "https://outreachly-phi.vercel.app/";

const portfolioItems = portfolioData.map((item, i) => ({
  id: i + 1,
  title: item.title,
  lightImage: `resource/image/${item.name}.png`,
  darkImage: `resource/image/${item.name}.png`,
  link: `${BASE_URL}${item.link}`,
}));

window.previewWithTheme = function (url, theme) {
  const isDark = theme === "dark";

  // 1. Storage Injection (Works if on the same domain)
  // Matching Alpine.js $persist format from your screenshot:
  // Booleans are stored as "true" or "false"
  // Strings are stored with quotes like ""light""
  try {
    localStorage.setItem("_x_isDarkMode", isDark ? "true" : "false");
    localStorage.setItem("_x_theme", JSON.stringify(theme));
    localStorage.setItem("_x_contrast", JSON.stringify("low"));
    localStorage.setItem("_x_stretch", "false");
    localStorage.setItem("primaryColor", "142 51 255");
  } catch (e) {
    console.warn("Cross-origin storage blocked. Relying on URL parameters.");
  }

  // 2. URL Parameter Injection (DEFINITIVE FIX)
  // Your project code looks for: const isDark = urlParams.darkMode === 'true' || urlParams.darkMode === 'dark'
  const separator = url.includes("?") ? "&" : "?";
  const targetUrl = `${url}${separator}darkMode=${isDark ? "dark" : "light"}`;

  window.open(targetUrl, "_blank");
};

function renderPortfolio() {
  const grid = document.getElementById("portfolio-grid");
  if (!grid) return;

  grid.innerHTML = portfolioItems
    .map(
      (item) => `
      <div class="portfolio-item-wrapper group">
        <div class="portfolio-card hero-reveal" style="transition-delay: 0.1s">
          <div class="portfolio-card-image relative z-10">
          <div>
            <img src="${item.lightImage}" alt="${item.title}" class="w-full h-full" />
          </div>
            <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-20">
               <button class="bg-white px-4 h-10 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 text-sm font-semibold" 
                       onclick="event.preventDefault(); event.stopPropagation(); previewWithTheme('${item.link}', 'light')">
                 Light
               </button>
               <button class="bg-white px-4 h-10 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75 text-sm font-semibold" 
                       onclick="event.preventDefault(); event.stopPropagation(); previewWithTheme('${item.link}', 'dark')">
                 Dark
               </button>
            </div>
          </div>
          <div class="portfolio-card-content relative z-10">
            <h3 class="portfolio-card-title">${item.title}</h3>
          </div>
        </div>
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
      src: "resource/image/dashboard1.png",
      span: "col-span-12 lg:col-span-7",
      height: "h-[250px]",
    },
    {
      src: "resource/image/dashboard2.png",
      span: "col-span-12 lg:col-span-5",
      height: "h-[250px]",
    },
    {
      src: "resource/image/allcampaign.png",
      span: "col-span-12 lg:col-span-4",
      height: "h-[220px]",
    },
    {
      src: "resource/image/notifications.png",
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
      src: "resource/image/dashboard1.png",
      height: "h-48 md:h-64",
    },
    {
      src: "resource/image/notifications.png",
      height: "h-40 md:h-52",
    },
    {
      src: "resource/image/mysummery.png",
      height: "h-44 md:h-60",
    },
    {
      src: "resource/image/dashboard3.png",
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
    { src: "resource/image/dashboard1.png", height: "h-[450px]" },
    { src: "resource/image/allcampaign.png", height: "h-[320px]" },
    { src: "resource/image/dashboard2.png", height: "h-[500px]" },
  ];
  const rightImages = [
    { src: "resource/image/dashboard3.png", height: "h-[350px]" },
    { src: "resource/image/notifications.png", height: "h-[550px]" },
    {
      src: "resource/image/createnew.png",
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
      "resource/image/dashboard1.png",
      "resource/image/dashboard2.png",
      "resource/image/allcampaign.png",
      "resource/image/createnew.png",
    ],
    [
      "resource/image/notifications.png",
      "resource/image/mysummery.png",
      "resource/image/dashboard3.png",
      "resource/image/dashboard1.png",
    ],
    [
      "resource/image/createnew.png",
      "resource/image/dashboard1.png",
      "resource/image/dashboard2.png",
      "resource/image/allcampaign.png",
    ],
    [
      "resource/image/mysummery.png",
      "resource/image/dashboard3.png",
      "resource/image/notifications.png",
      "resource/image/dashboard1.png",
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
            <img src="${imageUrl}" alt="Preview ${imgIndex + 1}" class="w-full h-full object-cover bg-gray-50" loading="lazy" />
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
