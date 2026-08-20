 // ==========================================
    // 5. SCRIPT TRIPADVISOR (SLIDER & READ MORE DROPDOWN)
    // ==========================================
    const taSlider = document.getElementById('taReviewsSlider');
    const taPrevBtn = document.getElementById('taPrevBtn');
    const taNextBtn = document.getElementById('taNextBtn');
    const sliderWrapper = document.querySelector('.ta-slider-wrapper');

    // Geser Manual lewat Tombol Panah
    if (taSlider && taPrevBtn && taNextBtn) {
        taNextBtn.addEventListener('click', () => {
            taSlider.scrollBy({ left: 300, behavior: 'smooth' });
        });

        taPrevBtn.addEventListener('click', () => {
            taSlider.scrollBy({ left: -300, behavior: 'smooth' });
        });
    }

    // Geser Otomatis (Auto-Slide)
    let slideInterval;

    const startAutoSlide = () => {
        if (!taSlider) return;
        slideInterval = setInterval(() => {
            const isAnyCardExpanded = document.querySelector('.ta-review-card.expanded');
            if (!isAnyCardExpanded) {
                if (taSlider.scrollLeft + taSlider.clientWidth >= taSlider.scrollWidth - 10) {
                    taSlider.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    taSlider.scrollBy({ left: 300, behavior: 'smooth' });
                }
            }
        }, 4500);
    };

    const stopAutoSlide = () => {
        clearInterval(slideInterval);
    };

    if (sliderWrapper) {
        startAutoSlide();
        sliderWrapper.addEventListener('mouseenter', stopAutoSlide);
        sliderWrapper.addEventListener('mouseleave', startAutoSlide);
        sliderWrapper.addEventListener('touchstart', stopAutoSlide, { passive: true });
    }

    // Dropdown Teks Read More Khusus TripAdvisor
    const taReadMoreBtns = document.querySelectorAll('.ta-read-link');

    taReadMoreBtns.forEach((btn) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.ta-review-card');

            if (card) {
                card.classList.toggle('expanded');

                if (card.classList.contains('expanded')) {
                    this.innerHTML = 'Show less <i class="fas fa-chevron-up"></i>';
                } else {
                    this.innerHTML = 'Read more <i class="fas fa-chevron-down"></i>';
                }
            }
        });
    });

});
