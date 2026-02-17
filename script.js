/* ===================================
   WebデザインUI学習ページ — script.js
   =================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Sticky Nav ---------- */
    const nav = document.querySelector('.topnav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    });

    /* ---------- Smooth scroll ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    /* ========================================
       CAROUSEL
       ======================================== */
    const track = document.querySelector('.carousel__track');
    const slides = document.querySelectorAll('.carousel__slide');
    const dots = document.querySelectorAll('.carousel__dot');
    const prevBtn = document.querySelector('.carousel__arrow--prev');
    const nextBtn = document.querySelector('.carousel__arrow--next');
    let current = 0;
    const total = slides.length;

    function goToSlide(idx) {
        current = (idx + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    prevBtn.addEventListener('click', () => goToSlide(current - 1));
    nextBtn.addEventListener('click', () => goToSlide(current + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));

    // auto-play
    let autoPlay = setInterval(() => goToSlide(current + 1), 5000);
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', () => clearInterval(autoPlay));
    carousel.addEventListener('mouseleave', () => {
        autoPlay = setInterval(() => goToSlide(current + 1), 5000);
    });

    /* ========================================
       TABS
       ======================================== */
    const tabBtns = document.querySelectorAll('.tabs__btn');
    const tabPanels = document.querySelectorAll('.tabs__panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    /* ========================================
       ACCORDION
       ======================================== */
    document.querySelectorAll('.accordion__trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const item = trigger.closest('.accordion__item');
            const isOpen = item.classList.contains('open');
            // close all in same group
            item.parentElement.querySelectorAll('.accordion__item').forEach(i => i.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
    });

    /* ========================================
       MODAL
       ======================================== */
    const overlay = document.querySelector('.modal-overlay');

    document.querySelectorAll('[data-open-modal]').forEach(btn => {
        btn.addEventListener('click', () => overlay.classList.add('active'));
    });

    document.querySelectorAll('[data-close-modal]').forEach(btn => {
        btn.addEventListener('click', () => overlay.classList.remove('active'));
    });

    overlay.addEventListener('click', e => {
        if (e.target === overlay) overlay.classList.remove('active');
    });

    /* ========================================
       TOAST
       ======================================== */
    const toastContainer = document.querySelector('.toast-container');

    document.querySelectorAll('[data-show-toast]').forEach(btn => {
        btn.addEventListener('click', () => {
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.innerHTML = '<span class="toast__icon">✅</span> トースト通知：操作が完了しました！';
            toastContainer.appendChild(toast);

            setTimeout(() => {
                toast.classList.add('removing');
                toast.addEventListener('animationend', () => toast.remove());
            }, 3000);
        });
    });

    /* ========================================
       MOBILE FIRST TOGGLE
       ======================================== */
    const mfToggle = document.getElementById('mf-toggle');
    const mfPhone = document.getElementById('mf-phone');
    const mfLabelMob = document.getElementById('mf-label-mobile');
    const mfLabelDt = document.getElementById('mf-label-desktop');

    if (mfToggle) {
        mfToggle.addEventListener('click', () => {
            const isDesktop = mfToggle.classList.toggle('toggled');
            mfPhone.classList.toggle('desktop-mode', isDesktop);
            mfLabelMob.classList.toggle('active', !isDesktop);
            mfLabelDt.classList.toggle('active', isDesktop);
        });
    }

});
