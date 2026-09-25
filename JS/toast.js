/* ==========================================================================
   MÓDULO: toast.js
   Responsabilidade: Sistema de notificações visuais (toast notifications).
   ========================================================================== */

/**
 * Exibe uma notificação toast na tela.
 * @param {string} title    - Título do toast.
 * @param {string} message  - Mensagem do toast.
 * @param {'success'|'error'|'info'} type - Tipo visual do toast.
 * @param {number} duration - Duração em ms antes de sumir (padrão: 4000).
 */
export function showToast(title, message, type = 'info', duration = 4000) {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️'
    };

    toast.innerHTML = `
        <div class="toast-icon">${icons[type] || '🔔'}</div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastOut 0.35s ease forwards';
        setTimeout(() => toast.remove(), 350);
    }, duration);
}
