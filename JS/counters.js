/* ==========================================================================
   MÓDULO: counters.js
   Responsabilidade: Animação de contadores de estatísticas (count-up).
   ========================================================================== */

/**
 * Inicializa os contadores animados observados via IntersectionObserver.
 * Cada elemento com [data-count] anima do zero até o valor alvo.
 */
export function initAnimatedCounters() {
    const counterElements = document.querySelectorAll('[data-count]');
    if (counterElements.length === 0) return;

    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-count'), 10);
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 2000; // 2 segundos
        const startTime = performance.now();

        const updateNumber = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            // Função de suavização (easeOutQuad)
            const easeProgress = 1 - (1 - progress) * (1 - progress);
            const currentValue = Math.floor(easeProgress * target);

            el.textContent = `${prefix}${currentValue.toLocaleString('pt-BR')}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                el.textContent = `${prefix}${target.toLocaleString('pt-BR')}${suffix}`;
            }
        };

        requestAnimationFrame(updateNumber);
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                obs.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, { threshold: 0.4 });

    counterElements.forEach(el => observer.observe(el));
}
