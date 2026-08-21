document.addEventListener("DOMContentLoaded", function() {

    // ==========================================
    // 1. SCRIPT MENU MOBILE (HAMBURGER)
    // ==========================================
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", function(event) {
            event.stopPropagation();
            mobileMenu.classList.toggle("hidden");
        });

        document.addEventListener("click", function(event) {
            if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add("hidden");
            }
        });
    }

    window.closeMobileMenu = function() {
        if (mobileMenu) mobileMenu.classList.add('hidden');
    };


    // ==========================================
    // 2. SCRIPT FAQ ACCORDION (TANYA JAWAB)
    // ==========================================
    const faqButtons = document.querySelectorAll('.faq-btn');
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const icon = button.querySelector('i');

            if (content) {
                content.classList.toggle('hidden');
            }

            if (icon && content) {
                if (content.classList.contains('hidden')) {
                    icon.classList.remove('fa-minus', 'text-red-500');
                    icon.classList.add('fa-plus', 'text-primary');
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    icon.classList.remove('fa-plus', 'text-primary');
                    icon.classList.add('fa-minus', 'text-red-500');
                    icon.style.transform = 'rotate(180deg)';
                }
            }
        });
    });


    // ==========================================
    // 3. SCRIPT GENERAL READ MORE
    // ==========================================
    const generalReadMoreBtns = document.querySelectorAll('.read-more-btn');
    generalReadMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const reviewText = this.previousElementSibling;
            if (reviewText) {
                reviewText.classList.toggle('line-clamp-3');
                if (reviewText.classList.contains('line-clamp-3')) {
                    this.textContent = 'Read more';
                } else {
                    this.textContent = 'Read less';
                }
            }
        });
    });


    // ==========================================
    // 4. SCRIPT NAVIGASI HALAMAN (SPA)
    // ==========================================
    window.navigate = function(targetId) {
        const allSections = document.querySelectorAll('.page-section');
        allSections.forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            console.warn('Halaman dengan ID "' + targetId + '" tidak ditemukan!');
        }
    };


    // ==========================================
    // 5. SCRIPT TRIPADVISOR (SLIDER & READ MORE)
    // ==========================================
    const taSlider = document.getElementById('taReviewsSlider');
    const taPrevBtn = document.getElementById('taPrevBtn');
    const taNextBtn = document.getElementById('taNextBtn');
    const sliderWrapper = document.querySelector('.ta-slider-wrapper');

    // Geser Manual
    if (taSlider && taPrevBtn && taNextBtn) {
        taNextBtn.onclick = () => taSlider.scrollBy({ left: 320, behavior: 'smooth' });
        taPrevBtn.onclick = () => taSlider.scrollBy({ left: -320, behavior: 'smooth' });
    }

    // Auto-Slide
    let slideInterval;
    const startAutoSlide = () => {
        if (!taSlider) return;
        slideInterval = setInterval(() => {
            const isAnyCardExpanded = document.querySelector('.ta-review-card.expanded');
            if (!isAnyCardExpanded) {
                if (taSlider.scrollLeft + taSlider.clientWidth >= taSlider.scrollWidth - 10) {
                    taSlider.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    taSlider.scrollBy({ left: 320, behavior: 'smooth' });
                }
            }
        }, 4500);
    };

    const stopAutoSlide = () => clearInterval(slideInterval);

    if (sliderWrapper) {
        startAutoSlide();
        sliderWrapper.addEventListener('mouseenter', stopAutoSlide);
        sliderWrapper.addEventListener('mouseleave', startAutoSlide);
        sliderWrapper.addEventListener('touchstart', stopAutoSlide, { passive: true });
    }

    // Event Delegation Read More
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.ta-read-link');
        if (!btn) return;

        e.preventDefault();
        const card = btn.closest('.ta-review-card');
        if (card) {
            card.classList.toggle('expanded');
            if (card.classList.contains('expanded')) {
                btn.innerHTML = 'Show less <i class="fas fa-chevron-up"></i>';
            } else {
                btn.innerHTML = 'Read more <i class="fas fa-chevron-down"></i>';
            }
        }
    });

}); 
