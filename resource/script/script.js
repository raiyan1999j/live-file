document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item");
  const highlighter = document.getElementById("lamp-highlighter");

  function updateHighlighter(activeItem) {
    if (!activeItem) return;

    const rect = activeItem.getBoundingClientRect();
    const parentRect = activeItem.parentElement.getBoundingClientRect();

    // Calculate position relative to container
    const left = rect.left - parentRect.left;
    const width = rect.width;

    highlighter.style.left = `${left}px`;
    highlighter.style.width = `${width}px`;
    highlighter.style.opacity = "1";
  }

  // Handle navigation clicks
  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      // Get target section
      const targetId = item.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Scroll to section
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });

        // Update active state
        navItems.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
        updateHighlighter(item);
      }
    });
  });

  // Update active nav item based on scroll position
  function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = window.scrollY + 100; // Offset for better detection

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        // Remove active from all
        navItems.forEach((item) => item.classList.remove("active"));

        // Add active to matching nav item
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

  // Listen to scroll events
  window.addEventListener("scroll", updateActiveNavOnScroll, { passive: true });

  // Initial positioning
  const activeItem = document.querySelector(".nav-item.active");
  if (activeItem) {
    // Wait a bit for layout
    setTimeout(() => updateHighlighter(activeItem), 50);
  }

  // Update on resize
  window.addEventListener("resize", () => {
    const currentActive = document.querySelector(".nav-item.active");
    updateHighlighter(currentActive);
  });

  // Reveal Animations on Scroll
  const observerOptions = {
    threshold: 0.1,
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".hero-reveal").forEach((el) => {
    revealObserver.observe(el);
  });

  // Carousel Logic (Now handled by CSS Marquee)
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  if (prevBtn) prevBtn.style.display = "none";
  if (nextBtn) nextBtn.style.display = "none";
});

/* =========================================
   Carousel Configuration & Initialization
   ========================================= */
/**
 * HOW TO USE:
 *
 * To customize the carousel images, simply update the image URLs in the
 * `carouselConfig.images` array below.
 *
 * CUSTOMIZATION:
 * - Add or remove image URLs from the array
 * - The carousel will automatically duplicate images for seamless scrolling
 * - Use any image URL (Unsplash, your own server, etc.)
 *
 * EXAMPLE:
 * images: [
 *   'image1.jpg',
 *   'image2.jpg',
 *   'image3.jpg',
 * ]
 */
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

// Initialize carousel
function initCarousel() {
  const container = document.getElementById("carousel-container");
  if (!container) return;

  // Create image HTML
  const createImageHTML = (imageUrl, index) => {
    return `
      <figure class="md:max-w-[468px] sm:max-w-[300px] max-w-[250px] w-full rounded-2xl overflow-hidden carousel-item-saas">
        <img
          src="${imageUrl}"
          class="object-cover size-full"
          alt="demo ${index + 1}"
          loading="lazy"
        />
      </figure>
    `;
  };

  // Generate images HTML
  const imagesHTML = carouselConfig.images
    .map((url, index) => createImageHTML(url, index))
    .join("");

  // Create marquee structure (two groups for infinite scroll)
  const marqueeHTML = `
    <!-- First Marquee Group -->
    <div class="rfm-marquee marquee-animation">
      <div class="rfm-initial-child-container">
        <div class="rfm-child marquee-child">
          <div class="flex items-start gap-x-3 mr-3">
            ${imagesHTML}
          </div>
        </div>
      </div>
    </div>
    <!-- Second Marquee Group (for infinite effect) -->
    <div class="rfm-marquee marquee-animation">
      <div class="rfm-child marquee-child">
        <div class="flex items-start gap-x-3 mr-3">
          ${imagesHTML}
        </div>
      </div>
    </div>
  `;

  // Insert into container
  container.innerHTML = marqueeHTML;
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", initCarousel);

/* =========================================
   Portfolio Grid Logic
   ========================================= */
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
        <div class="portfolio-card hero-reveal" style="transition-delay: 0.1s">
          <a id="card-link-${item.id}" href="${item.lightLink}" target="_blank" class="absolute inset-0 z-0"></a>
          
          <!-- Card Image Column -->
          <div class="portfolio-card-image relative z-10">
            <img id="card-img-${item.id}" src="${item.lightImage}" alt="${item.title}" />
            
            <!-- Hover Overlay -->
            <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-20">
               <button class="bg-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300" 
                       onclick="event.stopPropagation(); updateCard(${item.id}, '${item.lightImage}', '${item.lightLink}', this, 'light')">
                 <i class="ph ph-sun text-xl"></i>
               </button>
               <button class="bg-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75" 
                       onclick="event.stopPropagation(); updateCard(${item.id}, '${item.darkImage}', '${item.darkLink}', this, 'dark')">
                 <i class="ph ph-moon text-xl"></i>
               </button>
            </div>
          </div>

          <!-- Card Content -->
          <div class="portfolio-card-content relative z-10 pointer-events-none">
            <h3 class="portfolio-card-title">AI Voice Generator</h3>
          </div>
        </div>
      </div>
    `,
    )
    .join("");

  // Re-observe new elements for scroll reveal
  const observerOptions = { threshold: 0.1 };
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, observerOptions);

  grid.querySelectorAll(".hero-reveal").forEach((el) => {
    revealObserver.observe(el);
  });
}

function updateCard(id, imgSrc, linkUrl, btn, mode) {
  const img = document.getElementById(`card-img-${id}`);
  const link = document.getElementById(`card-link-${id}`);

  if (img && link) {
    // Smooth transition effect
    img.style.opacity = "0.5";
    img.style.filter = "blur(10px)";

    setTimeout(() => {
      img.src = imgSrc;
      link.href = linkUrl;
      img.style.opacity = "1";
      img.style.filter = "blur(0px)";
    }, 250);
  }

  // Update Button Styles
  if (btn) {
    const buttons = btn.parentElement.querySelectorAll("button");
    buttons.forEach((b) => {
      b.style.backgroundColor = ""; // Reset inline colors
      b.classList.remove(" ring-2", "ring-blue-500");
    });
    // Add blue border to active toggle
    btn.style.border = "2px solid #0ea5e9";
  }
}

/* =========================================
   Glowing Effect Logic (Vanilla JS)
   ========================================= */

class GlowingEffect {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      spread: 40,
      proximity: 64,
      inactiveZone: 0.01,
      matchBorderWidth: 3,
      movementDuration: 0.2, // fast follow
      ...options,
    };

    this.container = element;
    this.lastPosition = { x: 0, y: 0 };
    this.animationFrame = null;
    this.currentAngle = 0;

    // Set initial CSS variables
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
       repeating-conic-gradient(
         from 236.84deg at 50% 50%,
         #dd7bbb 0%,
         #d79f1e calc(25% / var(--repeating-conic-gradient-times)),
         #5a922c calc(50% / var(--repeating-conic-gradient-times)), 
         #4c7894 calc(75% / var(--repeating-conic-gradient-times)),
         #dd7bbb calc(100% / var(--repeating-conic-gradient-times))
       )`,
    );

    this.handleMove = this.handleMove.bind(this);
    this.init();
  }

  init() {
    window.addEventListener("scroll", this.handleMove, { passive: true });
    document.body.addEventListener("pointermove", this.handleMove, {
      passive: true,
    });
  }

  handleMove(e) {
    if (!this.container) return;

    // Throttle via RAF
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    this.animationFrame = requestAnimationFrame(() => {
      const rect = this.container.getBoundingClientRect();
      const { left, top, width, height } = rect;

      const mouseX = e?.x ?? this.lastPosition.x;
      const mouseY = e?.y ?? this.lastPosition.y;

      if (e) {
        this.lastPosition = { x: mouseX, y: mouseY };
      }

      const centerX = left + width * 0.5;
      const centerY = top + height * 0.5;

      const distanceFromCenter = Math.hypot(mouseX - centerX, mouseY - centerY);
      const inactiveRadius =
        0.5 * Math.min(width, height) * this.options.inactiveZone;

      const glowEffect = this.container.querySelector(".glowing-effect");
      const glowLine = this.container.querySelector(".glow-line");

      if (distanceFromCenter < inactiveRadius) {
        this.container.style.setProperty("--active", "0");
        if (glowLine) glowLine.style.opacity = "0";
        return;
      }

      const isActive =
        mouseX > left - this.options.proximity &&
        mouseX < left + width + this.options.proximity &&
        mouseY > top - this.options.proximity &&
        mouseY < top + height + this.options.proximity;

      this.container.style.setProperty("--active", isActive ? "1" : "0");
      if (glowLine) glowLine.style.opacity = isActive ? "1" : "0";

      if (!isActive) return;

      // Calculate Angle
      let targetAngle =
        (180 * Math.atan2(mouseY - centerY, mouseX - centerX)) / Math.PI + 90;

      // Smooth angle transition (simple lerp for vanilla)
      // For exact 'animate' behavior we'd need a library, but basic Lerp works fine
      const angleDiff = ((targetAngle - this.currentAngle + 180) % 360) - 180;
      this.currentAngle += angleDiff * 0.15; // 0.15 easing factor

      this.container.style.setProperty("--start", this.currentAngle);
    });
  }
}

// Initialize Portfolio when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  renderPortfolio();

  // Initialize Glowing Effect for feature cards
  document.querySelectorAll(".glowing-card-border").forEach((el) => {
    new GlowingEffect(el);
  });

  // Initialize Image-based Testimonials
  initImageTestimonials();
});

// =========================================
// Image-based Testimonials Configuration
// =========================================
/**
 * HOW TO USE:
 *
 * To customize the testimonials images, simply update the image URLs in the
 * `testimonialsConfig.columns` array below.
 *
 * STRUCTURE:
 * - There are 4 columns total (0-3)
 * - Column 0: Left side, first column
 * - Column 1: Left side, second column
 * - Column 2: Right side, first column
 * - Column 3: Right side, second column
 *
 * CUSTOMIZATION:
 * - Add or remove image URLs from any column array
 * - Each column can have a different number of images
 * - Images will automatically duplicate for seamless scrolling
 * - Use any image URL (Unsplash, your own server, etc.)
 *
 * EXAMPLE:
 * columns: [
 *   ['image1.jpg', 'image2.jpg'],  // Column 0
 *   ['image3.jpg', 'image4.jpg'],  // Column 1
 *   ['image5.jpg', 'image6.jpg'],  // Column 2
 *   ['image7.jpg', 'image8.jpg'],  // Column 3
 * ]
 */
const testimonialsConfig = {
  columns: [
    // Column 0 (Left 1)
    [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=550&fit=crop",
    ],
    // Column 1 (Left 2)
    [
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=580&fit=crop",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=520&fit=crop",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=600&fit=crop",
    ],
    // Column 2 (Right 1)
    [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=550&fit=crop",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=520&fit=crop",
    ],
    // Column 3 (Right 2)
    [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=580&fit=crop",
      "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=400&h=550&fit=crop",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop",
    ],
  ],
};

// =========================================
// Initialize Image-based Testimonials
// =========================================
function initImageTestimonials() {
  const columns = document.querySelectorAll(".testimonial-column");

  if (columns.length === 0) return;

  columns.forEach((column) => {
    const columnIndex = parseInt(column.getAttribute("data-column"));
    const scrollContainer = column.querySelector(".testimonial-scroll");

    if (!scrollContainer || !testimonialsConfig.columns[columnIndex]) return;

    const images = testimonialsConfig.columns[columnIndex];

    // Create image cards (duplicate twice for seamless loop)
    const createImageCards = () => {
      let html = "";
      for (let i = 0; i < 2; i++) {
        // Duplicate set
        images.forEach((imageUrl, imgIndex) => {
          html += `
            <div class="testimonial-image-card bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 mb-6 hover:shadow-xl transition-shadow duration-300">
              <img 
                src="${imageUrl}" 
                alt="Template preview ${imgIndex + 1}" 
                class="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          `;
        });
      }
      return html;
    };

    // Insert the images
    scrollContainer.innerHTML = createImageCards();
  });

  // Initialize scroll-based animation
  initTestimonialsScrollAnimation();
}

// =========================================
// Scroll-based Testimonials Animation
// =========================================
function initTestimonialsScrollAnimation() {
  const columns = document.querySelectorAll(".testimonial-column");

  if (columns.length === 0) return;

  // Different scroll speeds for each column (parallax effect)
  const scrollMultipliers = [1, 1.3, 0.8, 1.1];

  function updateTestimonialsPosition() {
    columns.forEach((column) => {
      const scrollContainer = column.querySelector(".testimonial-scroll");
      if (!scrollContainer) return;

      // Get section position
      const section = column.closest("section");
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll progress through the section
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      // Start animation when section is in view
      if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
        // Calculate how far we've scrolled through the section
        const scrollProgress =
          (windowHeight - sectionTop) / (windowHeight + sectionHeight);

        // Clamp between 0 and 1
        const progress = Math.max(0, Math.min(1, scrollProgress));

        // Apply different multipliers for parallax effect
        const columnIndex = parseInt(column.getAttribute("data-column"));
        const multiplier = scrollMultipliers[columnIndex] || 1;

        // Move the column (50% is full loop since content is duplicated)
        const translateY = -(progress * 50 * multiplier);

        scrollContainer.style.transform = `translateY(${translateY}%)`;
      }
    });
  }

  // Update on scroll
  window.addEventListener("scroll", updateTestimonialsPosition, {
    passive: true,
  });

  // Initial update
  updateTestimonialsPosition();
}
