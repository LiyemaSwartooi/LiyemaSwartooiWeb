const iconToggle = document.querySelector('.fa-toggle-on');
const navbarMenu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu_link');
const iconClose = document.querySelector('.fa-times-circle');

iconToggle.addEventListener('click', () => {
  navbarMenu.classList.toggle('active');
});

iconClose.addEventListener('click', () => {
  navbarMenu.classList.remove('active');
});

menuLinks.forEach((menuLink) => {
  menuLink.addEventListener('click', () => {
    navbarMenu.classList.remove('active');
  });
});

// Change background header
function scrollHeader() {
    const header = document.getElementById('header');
    window.scrollY >= 20 ? header.classList.add('active') : header.classList.remove('active');
  }
  
  window.addEventListener('scroll', scrollHeader);
/* Hero type effect - REMOVED DUPLICATE INITIALIZATION */
// Scroll sections active Link
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 500;
    let sectionId = section.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector('.menu a[href*=' + sectionId + ']').classList.add('active-link');
    } else {
      document.querySelector('.menu a[href*=' + sectionId + ']').classList.remove('active-link');
    }
  });
}

window.addEventListener('scroll', scrollActive);

// Resume tabs functionality
document.addEventListener('DOMContentLoaded', () => {
    const resumeTabs = document.querySelectorAll('.resume_tabs a');
    const pages = document.querySelectorAll('.page');

    // Show first tab content by default
    pages[0].classList.add('active');

    resumeTabs.forEach((tab, index) => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove current class from all tabs
            resumeTabs.forEach(t => t.classList.remove('current'));
            // Add current class to clicked tab
            tab.classList.add('current');

            // Hide all pages
            pages.forEach(page => page.classList.remove('active'));
            // Show selected page
            pages[index].classList.add('active');
        });
    });

    // Animate progress bars when in view
    const progressBars = document.querySelectorAll('.progress_bar');
    const animateProgressBars = () => {
        progressBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight && rect.bottom >= 0) {
                const width = bar.parentElement.previousElementSibling.lastElementChild.textContent;
                bar.style.transform = `scaleX(${parseInt(width) / 100})`;
            }
        });
    };

    // Initial check for progress bars in view
    animateProgressBars();

    // Check for progress bars in view on scroll
    window.addEventListener('scroll', animateProgressBars);
});

// Portfolio filtering
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio_item');

    // Set initial active state
    filterButtons[0].classList.add('active');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 0);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

// Testimonial swiper
let swiper = new Swiper(".testimonial_container", {
  effect: 'slide',
  loop: true,
  slidesPerView: 1,
  grabCursor: true,
  spaceBetween: 100,
  breakpoints: {
      768: {
          slidesPerView: 2
      }
  }
});
// Services
let modalBtns = document.querySelectorAll('.services_button');
let modalViews = document.querySelectorAll(".services_modal");
let modalClose = document.querySelectorAll('.modal_close-icon');

let modal = function (modalClick) {
    modalViews[modalClick].classList.add('active-modal');
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i);
    });
});

modalClose.forEach(el => {
    el.addEventListener('click', () => {
        modalViews.forEach(modalView => {
            modalView.classList.remove('active-modal');
        });
    });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const menuIcon = menuToggle.querySelector('i');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('show-menu');
    menuToggle.classList.toggle('active');
    menuIcon.classList.toggle('fa-bars');
    menuIcon.classList.toggle('fa-times');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !menuToggle.contains(e.target) && menu.classList.contains('show-menu')) {
        menu.classList.remove('show-menu');
        menuToggle.classList.remove('active');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
});

// Close menu when clicking on menu items
const menuItems = document.querySelectorAll('.menu_item');
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        menu.classList.remove('show-menu');
        menuToggle.classList.remove('active');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    });
});

// Typed.js initialization - SINGLE PROPER INITIALIZATION
let typedInstance = null; // Store instance to prevent duplicates

function initializeTyped() {
    const typed = document.querySelector('.typed');
    
    if (typed && !typedInstance && typeof Typed !== 'undefined') {
        // Clear any existing content
        typed.textContent = '';
        
        let typed_strings = typed.getAttribute('data-typed-items');
        if (typed_strings) {
            typed_strings = typed_strings.split(',').map(str => str.trim());
            
            try {
                typedInstance = new Typed('.typed', {
                    strings: typed_strings,
                    loop: true,
                    typeSpeed: 80,
                    backSpeed: 40,
                    backDelay: 1500,
                    startDelay: 500,
                    showCursor: true,
                    cursorChar: '|',
                    autoInsertCss: true
                });
                console.log('Typed.js initialized successfully');
            } catch (error) {
                console.error('Error initializing Typed.js:', error);
            }
        }
    }
}

// Try to initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeTyped);

// Fallback: Try again after a short delay if Typed.js wasn't loaded yet
setTimeout(() => {
    if (!typedInstance) {
        initializeTyped();
    }
}, 1000);

// Portfolio Gallery Navigation
document.addEventListener('DOMContentLoaded', function() {
  const galleries = document.querySelectorAll('.portfolio_gallery');
  
  galleries.forEach(gallery => {
    const images = gallery.querySelectorAll('img');
    const prevBtn = gallery.querySelector('.gallery_prev');
    const nextBtn = gallery.querySelector('.gallery_next');
    let currentIndex = 0;

    function showImage(index) {
      images.forEach(img => img.classList.remove('active'));
      images[index].classList.add('active');
    }

    function nextImage() {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    }

    function prevImage() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    }

    // Initialize first image
    showImage(currentIndex);

    // Add event listeners
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);

    // Auto-advance every 5 seconds
    setInterval(nextImage, 5000);
  });
});
