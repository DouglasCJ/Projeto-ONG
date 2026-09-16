# 🤝 ONG Construindo Futuros

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Faculdade](https://img.shields.io/badge/Disciplina-Desenvolvimento_Front--end_para_Web-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Conclu%C3%ADdo-brightgreen?style=for-the-badge)

Uma plataforma web moderna, acessível e totalmente interativa desenvolvida como trabalho acadêmico para a disciplina de **Desenvolvimento Front-end para Web**. O projeto simula a presença digital da **ONG Construindo Futuros**, uma organização sem fins lucrativos focada no acolhimento, educação integral, apoio esportivo e nutrição solidária para crianças e jovens em situação de vulnerabilidade social.

---

## 📸 Demonstração do Projeto

O site conta com design responsivo e fluidez visual, otimizado para dispositivos móveis, tablets e desktops:

- **Página Inicial (`index.html`)**: Apresentação da causa, métricas de impacto animadas, seção "Quem Somos" e iniciativas de destaque.
- **Projetos (`projetos.html`)**: Filtro de iniciativas por categoria e modal interativo com informações detalhadas.
- **Seja Voluntário (`cadastro.html`)**: Formulário inteligente com busca automática de endereço via CEP e validação de dados em tempo real.

---

## ✨ Principais Funcionalidades

### 📱 1. Navegação Responsiva & Menu Mobile
- Cabeçalho fixo (*sticky*) com efeito de desfoque (*backdrop-filter blur*).
- Menu hambúrguer interativo para dispositivos móveis com animação suave e suporte a acessibilidade (atributos `aria-*`).

### 📊 2. Contadores de Estatísticas Animados
- Animação de contagem numérica progressiva (Count-Up) acionada via `IntersectionObserver` quando a seção entra na tela (+5.000 crianças, +120 voluntários, +15.000 refeições, 8 anos de história).

### 📋 3. Formulário Inteligente com Mascaramento & API ViaCEP
- **Máscaras em Tempo Real:** Formatação automática para **CPF** (`000.000.000-00`), **Telefone** (`(00) 00000-0000`) e **CEP** (`00000-000`).
- **Validação Algorítmica de CPF:** Algoritmo oficial de checagem dos dígitos verificadores do CPF.
- **Autopreenchimento de Endereço:** Consulta assíncrona (`fetch`) à **API ViaCEP** ao digitar 8 números no CEP, preenchendo automaticamente *Cidade/UF* e *Endereço*.
- **Feedback Visual & Modais:** Destaque de campos válidos/inválidos e modal de confirmação após envio.

### 🎨 4. Filtro por Categoria & Modal de Detalhes dos Projetos
- Filtro interativo na página de projetos (*Todos, Educação & Leitura, Esporte & Cidadania, Nutrição Solidária*).
- Janela modal *pop-up* com detalhes, fotos e formas de contribuição de cada projeto.

### ⬆️ 5. Recursos Adicionais de UX
- Botão flutuante **"Voltar ao Topo"** (*Scroll-to-top*).
- Highlighting dinâmico do item ativo no menu (*Scrollspy*).
- Sistema de **Toast Notifications** (notificações temporárias de feedback).

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 Semântico:** Estruturação padronizada e otimizada para SEO e leitores de tela.
- **CSS3 Moderno:** Flexbox, CSS Grid, Variáveis CSS (`custom properties`), animações `@keyframes` e design responsivo.
- **JavaScript (ES6+):** Código assíncrono (`async/await`), manipulação limpa do DOM e consumo de API REST.
- **API ViaCEP:** Web service gratuito para consulta de Códigos de Endereçamento Postal (CEP).

---

## 📁 Estrutura do Projeto

```bash
Projeto-ONG/
├── CSS/
│   └── estilos.css        # Estilos globais, componentes e responsividade
├── JS/
│   └── script.js          # Lógica das interatividades e consumo da API ViaCEP
├── img/                   # Logotipo, banners e imagens dos projetos
│   ├── brand_banner.png
│   ├── ong_logo.png
│   ├── projeto_alimentacao.png
│   ├── projeto_educacao_.png
│   └── projeto_esporte_.png
├── index.html             # Página principal / Home
├── projetos.html          # Página de lista e filtros de projetos
├── cadastro.html          # Página de formulário para voluntários/doadores
└── README.md              # Documentação do projeto
```

---

## 🚀 Como Executar o Projeto Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/SeuUsuario/Projeto-ONG.git
   ```

2. **Acesse a pasta do projeto:**
   ```bash
   cd Projeto-ONG
   ```

3. **Abra o arquivo `index.html` no seu navegador:**
   - Você pode dar dois cliques no arquivo `index.html` ou utilizar a extensão **Live Server** no VS Code para visualizar com recarregamento automático.

---

## 🎓 Contexto Acadêmico

Este projeto foi elaborado como trabalho prático para a disciplina de **Desenvolvimento Front-end para Web**, aplicando os conceitos fundamentais de:
- **HTML5 Semântico** para marcação e acessibilidade;
- **CSS3 Avançado** para estilização, layout responsivo (Flexbox e Grid) e animações;
- **JavaScript ES6+** para dinamismo, manipulação do DOM, controle de eventos e consumo de APIs externas (ViaCEP).

---

## 👨‍💻 Desenvolvedor

Desenvolvido por **Douglas Caique**.

---

⭐ *Se este projeto te ajudou ou te inspirou, considere dar uma estrela no repositório!*
