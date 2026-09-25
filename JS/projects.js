/* ==========================================================================
   MÓDULO: projects.js
   Responsabilidade: Filtro dinâmico de projetos e modais de detalhes.
   ========================================================================== */

// Dados dos projetos utilizados para popular o modal de detalhes
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

/**
 * Inicializa os botões de filtro de projetos.
 * Mostra/oculta os cards com animação suave conforme a categoria selecionada.
 */
export function initProjectFilters() {
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

/**
 * Inicializa os botões que abrem modais de detalhes dos projetos.
 */
export function initProjectModals() {
    const modalButtons = document.querySelectorAll('[data-open-modal]');
    if (modalButtons.length === 0) return;

    modalButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectKey = btn.getAttribute('data-open-modal');
            const project = projectDetailsData[projectKey];

            if (project) openProjectModal(project);
        });
    });
}

/**
 * Constrói e exibe o modal de detalhes de um projeto.
 * @param {object} data - Dados do projeto (title, badge, image, description, features).
 */
function openProjectModal(data) {
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
                <a href="cadastro.html" class="btn btn-primary">Quero Participar / Apoiar</a>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

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

/**
 * Remove qualquer modal de overlay existente na página.
 */
function closeExistingModal() {
    const existing = document.querySelector('.modal-overlay');
    if (existing) {
        existing.remove();
        document.body.style.overflow = '';
    }
}
