/* ==========================================================================
   MÓDULO: storage.js
   Responsabilidade: Persistência do rascunho do formulário via localStorage.
   Comunica-se com form.js através das funções exportadas abaixo.
   ========================================================================== */

// Chave usada para armazenar o rascunho no localStorage
const FORM_DRAFT_KEY = 'ong_cadastro_rascunho';

// IDs dos campos do formulário que serão salvos/restaurados
const FORM_FIELDS = [
    'nome', 'cpf', 'data_nasc', 'email',
    'telefone', 'cep', 'cidade', 'endereco',
    'tipo_interesse', 'mensagem'
];

/**
 * Salva os valores atuais dos campos do formulário no localStorage.
 */
export function saveFormDraft() {
    const form = document.querySelector('form');
    if (!form) return;

    const draft = {};
    FORM_FIELDS.forEach(id => {
        const el = document.getElementById(id);
        if (el) draft[id] = el.value;
    });

    localStorage.setItem(FORM_DRAFT_KEY, JSON.stringify(draft));
}

/**
 * Restaura os valores salvos no localStorage para os campos do formulário.
 * @returns {boolean} Indica se havia dados para restaurar.
 */
export function restoreFormDraft() {
    const raw = localStorage.getItem(FORM_DRAFT_KEY);
    if (!raw) return false;

    try {
        const draft = JSON.parse(raw);
        let hasData = false;

        FORM_FIELDS.forEach(id => {
            const el = document.getElementById(id);
            if (el && draft[id]) {
                el.value = draft[id];
                hasData = true;
            }
        });

        return hasData;
    } catch (e) {
        // JSON corrompido: limpa silenciosamente
        localStorage.removeItem(FORM_DRAFT_KEY);
        return false;
    }
}

/**
 * Remove o rascunho salvo do localStorage.
 */
export function clearFormDraft() {
    localStorage.removeItem(FORM_DRAFT_KEY);
}

/**
 * Inicializa o sistema de auto-save:
 * - Restaura rascunho ao carregar a página.
 * - Salva automaticamente a cada input/change nos campos.
 * - Limpa o rascunho ao clicar em "Limpar Formulário".
 * @param {Function} showToastFn - Função de notificação (injetada para evitar acoplamento).
 */
export function initFormAutoSave(showToastFn) {
    const form = document.querySelector('form');
    if (!form) return;

    // Restaura rascunho e notifica o usuário se houver dados
    const hasData = restoreFormDraft();
    if (hasData) {
        showToastFn(
            'Rascunho Restaurado',
            'Encontramos dados não enviados anteriormente e os restauramos para você.',
            'info',
            5000
        );
    }

    // Salva automaticamente ao digitar ou selecionar
    FORM_FIELDS.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', saveFormDraft);
            el.addEventListener('change', saveFormDraft);
        }
    });

    // Limpa o rascunho ao clicar em "Limpar Formulário"
    const resetBtn = form.querySelector('[type="reset"]');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            clearFormDraft();
            showToastFn('Formulário Limpo', 'O rascunho salvo também foi apagado.', 'info', 3000);
        });
    }
}
