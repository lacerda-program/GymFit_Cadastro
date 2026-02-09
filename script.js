// ============================================================
// 1. CONFIGURAÇÃO DAS FRASES LATERAIS (COPYWRITING)
// ============================================================
const frasesPorPasso = {
    1: {
        titulo: "SEJA BEM-VINDO",
        texto: "O primeiro passo para a sua melhor versão começa com um cadastro simples."
    },
    2: {
        titulo: "FOCO NO RESULTADO",
        texto: "Personalize seu perfil para que possamos entender exatamente onde você quer chegar."
    },
    3: {
        titulo: "INFRAESTRUTURA ELITE",
        texto: "Treine no que há de melhor em Vitória da Conquista. Você merece essa experiência."
    },
    4: {
        titulo: "INVESTIMENTO NO FUTURO",
        texto: "Sua saúde é o seu maior patrimônio. Escolha o plano que vai transformar sua rotina."
    },
    5: {
        titulo: "BEM VINDO!",
        texto: "Esperamos você em breve, agora de fato como parte da família."
    }
};

// ============================================================
// 2. FUNÇÃO DE ATUALIZAÇÃO DO TEXTO LATERAL
// ============================================================
function atualizarTextoLateral(step) {
    const overlay = document.querySelector('.overlay-text');
    const titulo = document.getElementById('side-title');
    const texto = document.getElementById('side-desc');

    if (overlay && titulo && texto && frasesPorPasso[step]) {
        // Efeito de saída
        overlay.style.opacity = '0';
        overlay.style.transform = 'translateY(10px)';

        setTimeout(() => {
            // Troca o texto
            titulo.innerText = frasesPorPasso[step].titulo;
            texto.innerText = frasesPorPasso[step].texto;

            // Efeito de entrada
            overlay.style.opacity = '1';
            overlay.style.transform = 'translateY(0)';
        }, 300);
    }
}

// ============================================================
// 3. NAVEGAÇÃO ENTRE PASSOS (NEXT / PREV)
// ============================================================
function nextStep(currentStep) {
    // Validação básica (Opcional: impedir avanço se campos vazios)
    if (currentStep === 1) {
        const nome = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        if (!nome || !email) {
            alert("Por favor, preencha seu Nome e E-mail para continuar.");
            return;
        }
    }

    // Lógica de troca de tela
    document.getElementById(`step${currentStep}`).classList.remove('active');
    document.getElementById(`step${currentStep + 1}`).classList.add('active');

    // Troca de Imagem de Fundo
    const currentImg = document.getElementById(`img-step${currentStep}`);
    const nextImg = document.getElementById(`img-step${currentStep + 1}`);
    if (currentImg) currentImg.classList.remove('active');
    if (nextImg) nextImg.classList.add('active');

    // Atualiza Barra de Progresso
    const progressBar = document.getElementById('progressBar');
    const progress = ((currentStep) / 4) * 100; // 4 passos totais antes do fim
    progressBar.style.width = `${progress + 25}%`;

    // Atualiza Texto Lateral
    atualizarTextoLateral(currentStep + 1);
}

function prevStep(currentStep) {
    document.getElementById(`step${currentStep}`).classList.remove('active');
    document.getElementById(`step${currentStep - 1}`).classList.add('active');

    const currentImg = document.getElementById(`img-step${currentStep}`);
    const prevImg = document.getElementById(`img-step${currentStep - 1}`);
    if (currentImg) currentImg.classList.remove('active');
    if (prevImg) prevImg.classList.add('active');

    const progressBar = document.getElementById('progressBar');
    const progress = ((currentStep - 2) / 4) * 100;
    progressBar.style.width = `${progress + 25}%`;

    atualizarTextoLateral(currentStep - 1);
}

// ============================================================
// 4. INTERATIVIDADE DO FORMULÁRIO (SELEÇÕES)
// ============================================================

// Seleção de Cards (Objetivos, Experiência, etc)
function selectOption(category, value, element) {
    // Salva no input hidden
    document.getElementById(category).value = value;

    // Remove classe 'selected' dos irmãos
    const parent = element.parentElement;
    const siblings = parent.getElementsByClassName('option-card');
    for (let sib of siblings) {
        sib.classList.remove('selected');
    }

    // Adiciona classe ao clicado
    element.classList.add('selected');
}

// Seleção de Planos (A parte crítica do Step 4)
function selectPlan(planName, price, element) {
    // Atualiza inputs hidden
    document.getElementById('selectedPlanName').value = planName;
    document.getElementById('selectedPlanPrice').value = price;

    // Remove visual de seleção anterior
    const allPlans = document.querySelectorAll('.plan-row');
    allPlans.forEach(plan => plan.classList.remove('selected'));

    // Adiciona visual ao novo
    element.classList.add('selected');

    // Esconde mensagem de erro se houver
    document.getElementById('error-msg').style.display = 'none';
}

// ============================================================
// 5. FINALIZAÇÃO E GERAÇÃO DO TICKET
// ============================================================
function finishRegistration() {
    const planName = document.getElementById('selectedPlanName').value;
    const planPrice = document.getElementById('selectedPlanPrice').value;
    const userName = document.getElementById('name').value;

    // Validação: Obrigatório escolher um plano
    if (!planName) {
        const errorMsg = document.getElementById('error-msg');
        errorMsg.style.display = 'block';
        errorMsg.style.color = 'red';
        errorMsg.innerText = "⚠️ Por favor, selecione um plano para continuar.";
        return;
    }

    // Preenche o Ticket Final (Step 5)
    document.getElementById('finalName').innerText = userName || "Visitante";
    document.getElementById('finalPlan').innerText = planName;
    
    // Formata o preço para R$
    const priceFormatted = parseFloat(planPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('finalPrice').innerText = priceFormatted;

    // Avança para o passo final
    nextStep(4);
}

// Inicialização (Garante que começa certo)
document.addEventListener('DOMContentLoaded', () => {
    atualizarTextoLateral(1);
});