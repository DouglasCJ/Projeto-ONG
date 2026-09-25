/* ==========================================================================
   MÓDULO: modals.js
   Responsabilidade: Helpers de validação de campos, CPF e modal de sucesso.
   ========================================================================== */

/**
 * Marca um campo do formulário como válido ou inválido com mensagem de erro.
 * @param {HTMLElement} field        - O campo a ser validado.
 * @param {boolean}     isValid      - Se o campo é válido.
 * @param {string}      errorMessage - Mensagem exibida quando inválido.
 */
export function validateField(field, isValid, errorMessage = '') {
    if (!field) return;

    const parentGroup = field.closest('.form-group') || field.parentElement;
    let errorEl = parentGroup.querySelector('.error-message');

    if (isValid) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
        if (errorEl) errorEl.remove();
    } else {
        field.classList.remove('is-valid');
        field.classList.add('is-invalid');

        if (!errorEl && errorMessage) {
            errorEl = document.createElement('span');
            errorEl.className = 'error-message';
            errorEl.innerHTML = `⚠️ ${errorMessage}`;
            parentGroup.appendChild(errorEl);
        } else if (errorEl && errorMessage) {
            errorEl.innerHTML = `⚠️ ${errorMessage}`;
        }
    }
}

/**
 * Valida algoritmicamente um CPF brasileiro.
 * @param {string} cpf - CPF formatado ou somente dígitos.
 * @returns {boolean}
 */
export function validateCPF(cpf) {
    const cleanCpf = cpf.replace(/\D/g, '');
    if (cleanCpf.length !== 11 || /^(\d)\1{10}$/.test(cleanCpf)) return false;

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cleanCpf.substring(i - 1, i), 10) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCpf.substring(9, 10), 10)) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cleanCpf.substring(i - 1, i), 10) * (12 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCpf.substring(10, 11), 10)) return false;

    return true;
}

/**
 * Exibe o modal de confirmação após cadastro bem-sucedido.
 * @param {string} nome - Nome do usuário cadastrado.
 */
export function showSuccessModal(nome) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay is-active';

    overlay.innerHTML = `
        <div class="modal-container" style="text-align: center; padding: 2.5rem 2rem;">
            <div style="font-size: 3.5rem; margin-bottom: 1rem;">🎉</div>
            <h3 style="font-size: 1.75rem; color: var(--dark); font-weight: 800; margin-bottom: 0.75rem;">
                Cadastro Realizado com Sucesso!
            </h3>
            <p style="color: var(--text-muted); font-size: 1.05rem; line-height: 1.6; margin-bottom: 2rem;">
                Olá <strong>${nome}</strong>, recebemos sua inscrição com muita alegria. Nossa equipe entrará em contato em breve via WhatsApp ou E-mail!
            </p>
            <div>
                <button class="btn btn-primary" id="btn-modal-done">Entendido, Obrigado!</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    const closeBtn = overlay.querySelector('#btn-modal-done');
    closeBtn.addEventListener('click', () => {
        overlay.classList.remove('is-active');
        setTimeout(() => overlay.remove(), 300);
    });
}
