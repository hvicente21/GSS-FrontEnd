document.addEventListener('DOMContentLoaded', function() {
    // --- Elementos do DOM ---
    const menuHamburguer = document.getElementById('menuHamburguer');
    const navMobile = document.getElementById('navMobile');
    const overlay = document.getElementById('overlay');
    const navLinksDesktop = document.querySelectorAll('.nav-desktop ul li a');
    const navLinksMobile = document.querySelectorAll('.nav-mobile ul li a');
    const themeIcons = document.querySelectorAll('.theme-icon');
    const sections = document.querySelectorAll('main section');

    // --- Lógica do Menu Hambúrguer e Mobile ---
    function toggleMobileMenu() {
        menuHamburguer.classList.toggle('active');
        navMobile.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll'); // Previne scroll do body
    }

    menuHamburguer.addEventListener('click', toggleMobileMenu);
    overlay.addEventListener('click', toggleMobileMenu);

    // Fecha o menu mobile ao clicar em um link (seja desktop ou mobile)
    navLinksMobile.forEach(link => {
        link.addEventListener('click', function() {
            if (navMobile.classList.contains('active')) {
                toggleMobileMenu(); // Fecha o menu mobile
            }
        });
    });

    // --- Lógica de Indicação da Seção Atual (para ambos os menus) ---
    function setActiveNavLink() {
        let currentActiveSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - (window.innerHeight / 3); // Ajuste para considerar o header e viewport
            const sectionBottom = sectionTop + section.clientHeight;

            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom) {
                currentActiveSectionId = section.getAttribute('id');
            }
        });

        // Atualiza links do menu desktop
        navLinksDesktop.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentActiveSectionId)) {
                link.classList.add('active');
            }
        });

        // Atualiza links do menu mobile
        navLinksMobile.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentActiveSectionId)) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNavLink);
    setActiveNavLink(); // Chama ao carregar para definir o estado inicial

    // --- Lógica de Troca de Tema ---
    function applyTheme(themeName) {
        // Remove a classe 'active-theme' de todos os ícones
        themeIcons.forEach(icon => icon.classList.remove('active-theme'));

        // Adiciona a classe 'active-theme' ao ícone do tema selecionado
        const activeIcon = document.querySelector(`.theme-icon[data-theme="${themeName}"]`);
        if (activeIcon) {
            activeIcon.classList.add('active-theme');
        }

        // Atualiza as variáveis CSS dinamicamente
        document.documentElement.style.setProperty('--primary-color', `var(--primary-color-${themeName})`);
        document.documentElement.style.setProperty('--secondary-color', `var(--secondary-color-${themeName})`);
        document.documentElement.style.setProperty('--accent-color', `var(--accent-color-${themeName})`);
        document.documentElement.style.setProperty('--text-color', `var(--text-color-${themeName})`);
        document.documentElement.style.setProperty('--light-text-color', `var(--light-text-color-${themeName})`);
        document.documentElement.style.setProperty('--background-light', `var(--background-light-${themeName})`);
        document.documentElement.style.setProperty('--background-alt-light', `var(--background-alt-light-${themeName})`);
        document.documentElement.style.setProperty('--header-footer-bg', `var(--header-footer-bg-${themeName})`);

        // Salva o tema escolhido no LocalStorage para persistência
        localStorage.setItem('selectedTheme', themeName);
    }

    // Adiciona event listeners para os ícones de tema
    themeIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const themeName = this.dataset.theme; // Obtém o valor do atributo data-theme
            applyTheme(themeName);
        });
    });

    // Carrega o tema salvo ou o tema padrão ao carregar a página
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme('default'); // Aplica o tema padrão se nenhum estiver salvo
    }
});