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





// quiz_console.js

function iniciarQuizConsole() {
    alert("Bem-vindo ao Quiz sobre Enchentes!\nResponda às perguntas e veja sua pontuação no console.");

    const perguntas = [
        {
            pergunta: "1. Qual das seguintes opções é a principal causa das enchentes urbanas?\n(a) Desmatamento de encostas\n(b) Impermeabilização do solo\n(c) Chuvas de granizo intensas\n(d) Construção de barragens",
            respostaCorreta: "b",
            explicacao: "A impermeabilização do solo (asfalto, concreto) impede a absorção da água, aumentando o escoamento superficial e o volume que os sistemas de drenagem precisam lidar."
        },
        {
            pergunta: "2. O que são 'cabeças d'água' e qual o risco que elas representam?\n(a) Acúmulo de água no topo de montanhas, causando erosão.\n(b) Aumento súbito e violento do nível de rios e córregos, geralmente em áreas de serra.\n(c) Grandes ondas em rios, causadas por tsunamis.\n(d) Deslizamentos de terra saturada de água.",
            respostaCorreta: "b",
            explicacao: "Cabeças d'água são fenômenos perigosos de aumento rápido e violento do nível de rios e córregos, especialmente em áreas de serra, devido a chuvas intensas nas cabeceiras, que podem surpreender e arrastar pessoas."
        },
        {
            pergunta: "3. Qual o papel do desmatamento na ocorrência de enchentes?\n(a) Aumenta a infiltração da água no solo.\n(b) Reduz a erosão do solo.\n(c) Diminui a capacidade do solo de absorver água, acelerando o escoamento superficial.\n(d) Não tem relação direta com enchentes.",
            respostaCorreta: "c",
            explicacao: "O desmatamento remove a vegetação que ajuda a reter e absorver a água da chuva, diminuindo a capacidade do solo de absorver e acelerando o escoamento superficial para rios e córregos."
        },
        {
            pergunta: "4. Além dos danos materiais, quais são as principais consequências das enchentes para a saúde pública?\n(a) Aumento de problemas respiratórios.\n(b) Proliferação de doenças transmitidas pela água (leptospirose, hepatite A, etc.) e vetores.\n(c) Deficiência de nutrientes na alimentação.\n(d) Somente problemas psicológicos.",
            respostaCorreta: "b",
            explicacao: "Enchentes podem contaminar a água e o solo, levando à proliferação de doenças como leptospirose, hepatite A, cólera, e aumentando a população de vetores como mosquitos."
        },
        {
            pergunta: "5. Qual a importância de um sistema de drenagem eficiente nas cidades?\n(a) Apenas para embelezar a paisagem urbana.\n(b) Conduzir rapidamente o excesso de água da chuva para fora das áreas urbanas, prevenindo alagamentos.\n(c) Armazenar água para uso em períodos de seca.\n(d) Gerar energia elétrica a partir da água da chuva.",
            respostaCorreta: "b",
            explicacao: "Sistemas de drenagem eficientes são cruciais para escoar o excesso de água da chuva, evitando alagamentos e inundações em áreas urbanas."
        },
        {
            pergunta: "6. O que é a 'cultura de risco' em relação às enchentes?\n(a) O hábito de ignorar os avisos de desocupação de áreas de risco.\n(b) A compreensão e a adoção de medidas para reduzir a vulnerabilidade a desastres.\n(c) A prática de esportes radicais em áreas alagadas.\n(d) O estudo dos riscos geológicos de uma região.",
            respostaCorreta: "b",
            explicacao: "Cultura de risco envolve a conscientização e a preparação da comunidade e autoridades para lidar com desastres, adotando medidas para reduzir a vulnerabilidade e os impactos."
        },
        {
            pergunta: "7. Quais são as principais medidas preventivas que os cidadãos podem adotar para minimizar os impactos das enchentes em suas casas?\n(a) Estocar alimentos e água em grande quantidade.\n(b) Descartar lixo em córregos e bueiros para que a água leve embora.\n(c) Limpar calhas, não jogar lixo na rua e ter um plano de emergência familiar.\n(d) Construir muros altos ao redor da casa.",
            respostaCorreta: "c",
            explicacao: "Ações como limpar calhas, evitar jogar lixo na rua e ter um plano de emergência familiar são essenciais para a prevenção e segurança individual."
        },
        {
            pergunta: "8. Por que a ocupação de áreas de várzea é um fator de risco para enchentes?\n(a) Porque são áreas muito frias.\n(b) Porque são áreas naturalmente destinadas ao extravasamento de rios em períodos de cheia.\n(c) Porque a água subterrânea impede a construção.\n(d) Porque são áreas com solo muito rochoso.",
            respostaCorreta: "b",
            explicacao: "Várzeas são planícies de inundação naturais de rios. Ao ocupar essas áreas, as construções ficam diretamente expostas ao risco de inundações em períodos de cheia."
        },
        {
            pergunta: "9. Qual o papel da Defesa Civil em casos de enchentes?\n(a) Construir casas para as vítimas.\n(b) Emitir alertas, coordenar ações de resgate, assistência e recuperação em situações de desastre.\n(c) Apenas distribuir cestas básicas.\n(d) Regular o nível dos rios.",
            respostaCorreta: "b",
            explicacao: "A Defesa Civil tem um papel crucial na gestão de desastres, incluindo a emissão de alertas, coordenação de resgates, assistência às vítimas e ações de recuperação."
        },
        {
            pergunta: "10. O que significa o termo 'resiliência' no contexto de desastres naturais como as enchentes?\n(a) A capacidade de uma comunidade de resistir a um desastre sem sofrer danos.\n(b) A rapidez com que uma comunidade se recupera e se adapta após um desastre.\n(c) A quantidade de chuvas que uma região suporta.\n(d) A rigidez das construções para evitar desmoronamentos.",
            respostaCorreta: "b",
            explicacao: "Resiliência, neste contexto, refere-se à capacidade de uma comunidade, sistema ou ecossistema de absorver perturbações, se recuperar e se adaptar rapidamente a eventos adversos como enchentes."
        }
    ];

    let pontuacao = 0;
    const respostasUsuario = [];

    // Loop através das perguntas
    for (let i = 0; i < perguntas.length; i++) {
        const p = perguntas[i];
        let resposta = prompt(p.pergunta + "\n\nDigite a letra da sua resposta (a, b, c ou d):").toLowerCase();

        // Validação básica da resposta
        while (!['a', 'b', 'c', 'd'].includes(resposta)) {
            alert("Resposta inválida. Por favor, digite 'a', 'b', 'c' ou 'd'.");
            resposta = prompt(p.pergunta + "\n\nDigite a letra da sua resposta (a, b, c ou d):").toLowerCase();
        }

        const acertou = resposta === p.respostaCorreta;
        respostasUsuario.push({
            numero: i + 1,
            pergunta: p.pergunta.split('\n')[0], // Pega só a primeira linha da pergunta
            suaResposta: resposta,
            respostaCorreta: p.respostaCorreta,
            acertou: acertou,
            explicacao: p.explicacao
        });

        if (acertou) {
            pontuacao++;
            alert("Correto!");
        } else {
            alert(`Errado! A resposta correta é '${p.respostaCorreta.toUpperCase()}'.\n${p.explicacao}`);
        }
    }

    // Exibindo os resultados no console
    console.clear(); // Limpa o console para uma nova execução
    console.log("--- RESULTADOS DO QUIZ SOBRE ENCHENTES ---");
    console.log(`Sua pontuação final: ${pontuacao} de ${perguntas.length}`);
    console.log("\n--- DETALHES DAS SUAS RESPOSTAS ---");

    respostasUsuario.forEach(r => {
        console.log(`\nQuestão ${r.numero}: ${r.pergunta}`);
        console.log(`Sua resposta: ${r.suaResposta.toUpperCase()}`);
        console.log(`Resposta correta: ${r.respostaCorreta.toUpperCase()}`);
        if (r.acertou) {
            console.log("Status: Correta!");
        } else {
            console.log("Status: Errada!");
            console.log(`Explicação: ${r.explicacao}`);
        }
    });

    console.log("\n--- FIM DO QUIZ ---");
    alert(`Quiz finalizado! Sua pontuação: ${pontuacao} de ${perguntas.length}.\nVerifique o console (F12) para os detalhes.`);
}
