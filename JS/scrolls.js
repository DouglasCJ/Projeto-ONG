/* ==========================================================================
   MÓDULO: scrolls.js
   Responsabilidade: Botão "Voltar ao Topo" e ScrollSpy de navegação.
   ========================================================================== */

/**
 * Cria dinamicamente e controla o botão de "Voltar ao Topo".
 * O botão aparece após 300px de scroll e some ao voltar ao início.
 */
export function initScrollToTop() {
    let scrollBtn = document.querySelector('.scroll-to-top');
    if (!scrollBtn) {
        scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.setAttribute('aria-label', 'Voltar ao topo da página');
        scrollBtn.innerHTML = '↑';
        document.body.appendChild(scrollBtn);
    }

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('is-visible');
        } else {
            scrollBtn.classList.remove('is-visible');
        }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * Aplica a classe "active" no link de navegação correspondente à seção
 * visível durante o scroll (ScrollSpy).
 */
export function initScrollSpy() {
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    if (navLinks.length === 0) return;

    const sections = Array.from(navLinks)
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    window.addEventListener('scroll', () => {
        let currentSection = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                currentSection = '#' + section.id;
            }
        });

        if (currentSection) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === currentSection);
            });
        }
    }, { passive: true });
}
