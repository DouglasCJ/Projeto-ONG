
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initAnimatedCounters();
    initScrollToTop();
    initScrollSpy();
    initProjectFilters();
    initProjectModals();
    initFormValidationAndMasks();
});

/* ==========================================================================
   1. MENU MOBILE RESPONSIVO (HAMBURGER MENU)
   ========================================================================== */
function initMobileMenu() {
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

/* ==========================================================================
   2. CONTADORES DE ESTATÍSTICAS ANIMADOS (COUNT-UP)
   ========================================================================== */
function initAnimatedCounters() {
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

/* ==========================================================================
   3. BOTÃO "VOLTAR AO TOPO"
   ========================================================================== */
function initScrollToTop() {
    // Cria o botão dinamicamente se não existir na página
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
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ==========================================================================
   4. HIGHLIGHT DE NAVEGAÇÃO AO ROLAR (SCROLLSPY)
   ========================================================================== */
function initScrollSpy() {
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

/* ==========================================================================
   5. FILTRO DINÂMICO DE PROJETOS (`projetos.html`)
   ========================================================================== */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card-horizontal, .project-card');

    if (filterBtns.length === 0 || projectCards.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = '';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ==========================================================================
   6. MODAL INTERATIVO DE DETALHES DOS PROJETOS
   ========================================================================== */
const projectDetailsData = {
    educacao: {
        title: "Oficina de Leitura e Reforço Escolar",
        badge: "Educação Integral",
        image: "img/projeto_educacao_.png",
        description: "A Oficina de Leitura e Reforço Escolar é um dos pilares fundacionais da ONG Construindo Futuros. Atendemos mais de 200 crianças semanalmente no contra-turno escolar, fornecendo acompanhamento pedagógico de excelência, materiais didáticos gratuitos e um ambiente seguro e estimulante.",
        features: [
            "Aulas de reforço em Língua Portuguesa e Matemática",
            "Biblioteca comunitária com acervo de +1.500 livros infantojuvenis",
            "Atividades ludopedagógicas e rodas de contação de histórias",
            "Suporte psicológico e acompanhamento do rendimento escolar"
        ]
    },
    esporte: {
        title: "Escolinha de Esportes & Cidadania",
        badge: "Saúde e Inclusão",
        image: "img/projeto_esporte_.png",
        description: "O esporte é uma ferramenta transformadora para o desenvolvimento físico, mental e social de jovens em comunidades vulneráveis. Nosso projeto promove a prática esportiva associada a valores éticos como trabalho em equipe, disciplina e empatia.",
        features: [
            "Treinos semanais de Futebol, Basquete e Xadrez",
            "Fornecimento de uniformes, chuteiras e equipamentos gratuitos",
            "Torneios comunitários aos finais de semana promovendo integração",
            "Palestras educativas sobre saúde, nutrição e prevenção à violência"
        ]
    },
    nutricao: {
        title: "Nutrição Solidária e Cozinha Comunitária",
        badge: "Segurança Alimentar",
        image: "img/projeto_alimentacao.png",
        description: "Garantir a segurança alimentar é o primeiro passo para o aprendizado e bem-estar. Nossa cozinha comunitária prepara refeições nutritivas e balanceadas diariamente para as crianças assistidas, além de distribuirmos cestas verdes orgânicas para suas famílias.",
        features: [
            "Mais de 1.200 refeições balanceadas preparadas todos os meses",
            "Acompanhamento nutricional individualizado e pesagem periódica",
            "Oficinas de culinária sustentável e aproveitamento integral dos alimentos",
            "Parceria com produtores locais para distribuição de frutas e hortaliças"
        ]
    }
};

function initProjectModals() {
    const modalButtons = document.querySelectorAll('[data-open-modal]');
    if (modalButtons.length === 0) return;

    modalButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectKey = btn.getAttribute('data-open-modal');
            const project = projectDetailsData[projectKey];

            if (project) {
                openModal(project);
            }
        });
    });
}

function openModal(data) {
    // Remove modal anterior se existir
    closeExistingModal();

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    overlay.innerHTML = `
        <div class="modal-container" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div class="modal-header">
                <div>
                    <span class="badge" style="margin-bottom: 0.5rem;">${data.badge}</span>
                    <h3 id="modal-title">${data.title}</h3>
                </div>
                <button class="modal-close" aria-label="Fechar janela modal">&times;</button>
            </div>
            <div class="modal-body">
                <img src="${data.image}" alt="${data.title}">
                <p>${data.description}</p>
                <h4 style="margin: 1.5rem 0 0.75rem 0; color: var(--dark); font-weight: 700;">Principais Ações do Projeto:</h4>
                <ul style="padding-left: 1.25rem; color: var(--text-muted); line-height: 1.7;">
                    ${data.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline modal-cancel">Fechar</button>
                <a href="cadastro.html" class="btn btn-primary">Quero Participar / Apoyar</a>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden'; // Impede scroll do fundo

    // Força reflow para animação
    setTimeout(() => overlay.classList.add('is-active'), 10);

    const closeModalHandler = () => {
        overlay.classList.remove('is-active');
        document.body.style.overflow = '';
        setTimeout(() => overlay.remove(), 300);
    };

    overlay.querySelector('.modal-close').addEventListener('click', closeModalHandler);
    overlay.querySelector('.modal-cancel').addEventListener('click', closeModalHandler);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModalHandler();
    });

    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            closeModalHandler();
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);
}

function closeExistingModal() {
    const existing = document.querySelector('.modal-overlay');
    if (existing) {
        existing.remove();
        document.body.style.overflow = '';
    }
}

/* ==========================================================================
   7. FORMULÁRIO DE CADASTRO (MÁSCARAS, VALIDAÇÃO & CONSULTA DE CEP)
   ========================================================================== */
function initFormValidationAndMasks() {
    const form = document.querySelector('form');
    if (!form) return;

    const inputCpf = document.getElementById('cpf');
    const inputTelefone = document.getElementById('telefone');
    const inputCep = document.getElementById('cep');
    const inputCidade = document.getElementById('cidade');
    const inputEndereco = document.getElementById('endereco');
    const inputNome = document.getElementById('nome');
    const inputEmail = document.getElementById('email');

    // ----------------------------------------------------------------------
    // MÁSCARAS DE ENTRADA (CPF, TELEFONE, CEP)
    // ----------------------------------------------------------------------
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

            // Quando preencher os 8 dígitos do CEP, faz a busca na API ViaCEP
            const rawCep = value.replace(/\D/g, '');
            if (rawCep.length === 8) {
                fetchAddressByCep(rawCep, inputCidade, inputEndereco, inputCep);
            }
        });
    }

    // ----------------------------------------------------------------------
    // BUSCA AUTOMÁTICA DE ENDEREÇO VIA API VIACEP
    // ----------------------------------------------------------------------
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

    // ----------------------------------------------------------------------
    // SUBMISSÃO DO FORMULÁRIO COM VALIDAÇÃO E FEEDBACK VISUAL
    // ----------------------------------------------------------------------
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
            
            // Exibe mensagem de sucesso visual
            showSuccessModal(inputNome ? inputNome.value : 'Voluntário');
            form.reset();
            
            // Remove classes de validação
            form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
                el.classList.remove('is-valid', 'is-invalid');
            });
        } else {
            showToast('Atenção no Preenchimento', 'Por favor, corrija os campos destacados em vermelho.', 'error');
        }
    });
}

/* Helper para validação algorítmica de CPF */
function validateCPF(cpf) {
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

/* Helper para marcar campo válido/inválido com mensagem */
function validateField(field, isValid, errorMessage = '') {
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

/* Modal de confirmação de cadastro */
function showSuccessModal(nome) {
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

/* ==========================================================================
   8. SISTEMA DE TOAST NOTIFICATIONS
   ========================================================================== */
function showToast(title, message, type = 'info', duration = 4000) {
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
