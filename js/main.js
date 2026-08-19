document.addEventListener("DOMContentLoaded", function() {

    // ==========================================
    // 1. SCRIPT MENU MOBILE (HAMBURGER)
    // ==========================================
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", function(event) {
            event.stopPropagation(); // Mencegah klik bocor ke document
            mobileMenu.classList.toggle("hidden"); // Buka/Tutup menu
        });

        // Menutup menu jika user klik di sembarang tempat di luar menu
        document.addEventListener("click", function(event) {
            if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add("hidden");
            }
        });
    }

    // Fungsi tambahan untuk menutup menu lewat tombol khusus (jika ada)
    window.closeMobileMenu = function() {
        if(mobileMenu) mobileMenu.classList.add('hidden');
    };


    // ==========================================
    // 2. SCRIPT FAQ ACCORDION (TANYA JAWAB)
    // ==========================================
    const faqButtons = document.querySelectorAll('.faq-btn');
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const icon = button.querySelector('i');

            content.classList.toggle('hidden');

            if (content.classList.contains('hidden')) {
                if(icon) {
                    icon.classList.remove('fa-minus', 'text-red-500');
                    icon.classList.add('fa-plus', 'text-primary');
                    icon.style.transform = 'rotate(0deg)';
                }
            } else {
                if(icon) {
                    icon.classList.remove('fa-plus', 'text-primary');
                    icon.classList.add('fa-minus', 'text-red-500');
                    icon.style.transform = 'rotate(180deg)';
                }
            }
        });
    });

  const readMoreBtns = document.querySelectorAll('.read-more-btn');

    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Mencari paragraf ulasan yang posisinya tepat di atas tombol
            const reviewText = this.previousElementSibling;

            // Menyalakan atau mematikan pemotongan teks (line-clamp-3)
            reviewText.classList.toggle('line-clamp-3');

            // Mengubah tulisan di tombol
            if (reviewText.classList.contains('line-clamp-3')) {
                this.textContent = 'Read more';
            } else {
                this.textContent = 'Read less';
            }
        });
    });

    // ==========================================
// 5. SCRIPT NAVIGASI HALAMAN (SPA)
// ==========================================
window.navigate = function(targetId) {
    // 1. Cari semua halaman (section)
    const allSections = document.querySelectorAll('.page-section');
    
    // 2. Sembunyikan semuanya dengan menghapus class 'active'
    allSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // 3. Cari halaman yang dituju sesuai ID yang diklik
    const targetSection = document.getElementById(targetId);
    
    // 4. Jika halamannya ketemu, tampilkan dengan menambah class 'active'
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Opsional: Gulir layar otomatis ke bagian atas
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        console.warn('Halaman dengan ID "' + targetId + '" tidak ditemukan!');
    }
};
    
   });
