/* ==========================================================================
   MÓDULO: menu.js
   Responsabilidade: Menu mobile responsivo com lógica de hambúrguer.
   ========================================================================== */

/**
 * Inicializa o menu mobile (hambúrguer).
 * Abre/fecha ao clicar no botão e fecha ao clicar fora ou nos links.
 */
export function initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (!toggleBtn || !mainNav) return;

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = mainNav.classList.contains('is-open');

        toggleBtn.classList.toggle('is-active', !isOpen);
        mainNav.classList.toggle('is-open', !isOpen);
        toggleBtn.setAttribute('aria-expanded', !isOpen);
    });

    // Fechar ao clicar nos links do menu
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggleBtn.classList.remove('is-active');
            mainNav.classList.remove('is-open');
            toggleBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // Fechar ao clicar fora do menu
    document.addEventListener('click', (event) => {
        if (!mainNav.contains(event.target) && !toggleBtn.contains(event.target)) {
            toggleBtn.classList.remove('is-active');
            mainNav.classList.remove('is-open');
            toggleBtn.setAttribute('aria-expanded', 'false');
        }
    });
}
