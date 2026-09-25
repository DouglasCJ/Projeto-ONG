/* ==========================================================================
   MÓDULO: form.js
   Responsabilidade: Máscaras de entrada, consulta de CEP via API ViaCEP
   e validação do formulário de cadastro de voluntários.
   Depende de: toast.js, modals.js, storage.js
   ========================================================================== */

import { showToast }                   from './toast.js';
import { validateField, validateCPF, showSuccessModal } from './modals.js';
import { clearFormDraft }               from './storage.js';

/**
 * Inicializa todas as funcionalidades do formulário de cadastro:
 * máscaras de CPF, telefone e CEP; consulta automática de endereço;
 * e validação completa na submissão.
 */
export function initFormValidationAndMasks() {
    const form = document.querySelector('form');
    if (!form) return;

    const inputCpf      = document.getElementById('cpf');
    const inputTelefone = document.getElementById('telefone');
    const inputCep      = document.getElementById('cep');
    const inputCidade   = document.getElementById('cidade');
    const inputEndereco = document.getElementById('endereco');
    const inputNome     = document.getElementById('nome');
    const inputEmail    = document.getElementById('email');

    // ------------------------------------------------------------------
    // MÁSCARAS DE ENTRADA (CPF, TELEFONE, CEP)
    // ------------------------------------------------------------------
    if (inputCpf) {
        inputCpf.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);

            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

            e.target.value = value;
            validateField(inputCpf, validateCPF(value));
        });
    }

    if (inputTelefone) {
        inputTelefone.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);

            if (value.length > 10) {
                value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else {
                value = value.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
            }

            e.target.value = value;
        });
    }

    if (inputCep) {
        inputCep.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 8) value = value.slice(0, 8);

            value = value.replace(/^(\d{5})(\d)/, '$1-$2');
            e.target.value = value;

            const rawCep = value.replace(/\D/g, '');
            if (rawCep.length === 8) {
                fetchAddressByCep(rawCep, inputCidade, inputEndereco, inputCep);
            }
        });
    }

    // ------------------------------------------------------------------
    // BUSCA AUTOMÁTICA DE ENDEREÇO VIA API VIACEP
    // ------------------------------------------------------------------
    async function fetchAddressByCep(cepDigits, cidadeEl, enderecoEl, cepEl) {
        try {
            showToast('Buscando CEP...', 'Consultando endereço na base dos Correios.', 'info', 2000);
            const response = await fetch(`https://viacep.com.br/ws/${cepDigits}/json/`);
            const data = await response.json();

            if (data.erro) {
                validateField(cepEl, false, 'CEP não encontrado. Por favor, verifique.');
                showToast('CEP não encontrado', 'Digite um CEP válido para preencher o endereço.', 'error');
                return;
            }

            if (cidadeEl) {
                cidadeEl.value = `${data.localidade} / ${data.uf}`;
                validateField(cidadeEl, true);
            }

            if (enderecoEl) {
                const logradouro = data.logradouro ? `${data.logradouro}, ` : '';
                const bairro = data.bairro ? ` - Bairro ${data.bairro}` : '';
                enderecoEl.value = `${logradouro}${bairro}`;
                enderecoEl.focus();
                validateField(enderecoEl, true);
            }

            validateField(cepEl, true);
            showToast('Endereço Localizado!', `${data.localidade} - ${data.uf}`, 'success');
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
            showToast('Erro de Conexão', 'Não foi possível consultar o CEP automaticamente.', 'error');
        }
    }

    // ------------------------------------------------------------------
    // SUBMISSÃO DO FORMULÁRIO COM VALIDAÇÃO E FEEDBACK VISUAL
    // ------------------------------------------------------------------
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;

        // Valida Nome Completo
        if (inputNome) {
            const isNomeValid = inputNome.value.trim().length >= 3;
            validateField(inputNome, isNomeValid, 'Digite seu nome completo (mínimo 3 caracteres).');
            if (!isNomeValid) isValid = false;
        }

        // Valida E-mail
        if (inputEmail) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isEmailValid = emailRegex.test(inputEmail.value.trim());
            validateField(inputEmail, isEmailValid, 'Por favor, informe um e-mail válido.');
            if (!isEmailValid) isValid = false;
        }

        // Valida CPF
        if (inputCpf) {
            const isCpfValid = validateCPF(inputCpf.value);
            validateField(inputCpf, isCpfValid, 'Informe um CPF válido no formato 000.000.000-00.');
            if (!isCpfValid) isValid = false;
        }

        // Valida Telefone
        if (inputTelefone) {
            const telDigits = inputTelefone.value.replace(/\D/g, '');
            const isTelValid = telDigits.length >= 10;
            validateField(inputTelefone, isTelValid, 'Informe um telefone válido com DDD.');
            if (!isTelValid) isValid = false;
        }

        // Valida CEP
        if (inputCep) {
            const cepDigits = inputCep.value.replace(/\D/g, '');
            const isCepValid = cepDigits.length === 8;
            validateField(inputCep, isCepValid, 'Informe um CEP válido (8 dígitos).');
            if (!isCepValid) isValid = false;
        }

        if (isValid) {
            showToast('Cadastro Concluído!', 'Obrigado por se juntar à ONG Construindo Futuros!', 'success', 5000);

            // Exibe modal de sucesso e limpa o formulário
            showSuccessModal(inputNome ? inputNome.value : 'Voluntário');
            form.reset();

            // Limpa o rascunho salvo após envio bem-sucedido
            clearFormDraft();

            // Remove classes de validação visual
            form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
                el.classList.remove('is-valid', 'is-invalid');
            });
        } else {
            showToast('Atenção no Preenchimento', 'Por favor, corrija os campos destacados em vermelho.', 'error');
        }
    });
}
