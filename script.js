// ============================================================
// 1. CONFIGURAÇÃO E ESTADO GLOBAL
// ============================================================
const frasesPorPasso = {
    1: { title: "SEJA BEM-VINDO!", desc: "O primeiro passo para a sua melhor versão começa aqui." },
    2: { title: "FOCO TOTAL", desc: "Ajuste sua rotina e domine seus horários." },
    3: { title: "EXPERIÊNCIA DE ELITE", desc: "Sinta o poder da tecnologia a favor do seu corpo." },
    4: { title: "ESCOLHA SEU DESTINO", desc: "Selecione o plano que combina com seu estilo de vida." },
    5: { title: "VOCÊ CONSEGUIU!", desc: "Sua jornada de alto padrão está apenas começando." }
};

let currentStep = 1;

// ============================================================
// 2. NAVEGAÇÃO E INTERFACE
// ============================================================

function validateStep(step) {
    if (step === 1) {
        const name = document.getElementById('name')?.value.trim() || "";
        const email = document.getElementById('email')?.value.trim() || "";

        if (!name || !email) {
            alert("Por favor, preencha seu nome e e-mail antes de prosseguir.");
            return false;
        }
    }

    if (step === 2) {
        const goal = document.getElementById('goal')?.value.trim() || "";
        const level = document.getElementById('level')?.value.trim() || "";
        const frequency = document.getElementById('frequency')?.value.trim() || "";
        const time = document.getElementById('time')?.value.trim() || "";

        if (!goal || !level || !frequency || !time) {
            alert("Preencha seu perfil completo antes de continuar.");
            return false;
        }
    }

    if (step === 4) {
        const selectedPlan = document.getElementById('selectedPlanName')?.value.trim() || "";
        if (!selectedPlan) {
            const errorMsg = document.getElementById('error-msg');
            if (errorMsg) {
                errorMsg.style.display = 'block';
            }
            alert("Você precisa selecionar um plano para finalizar.");
            return false;
        }
    }

    return true;
}
function prevStep() {
    if (currentStep > 1) {
        // Se estamos no 2, voltamos para o 1, e assim por diante
        updateUI(currentStep - 1);
    }
}

function nextStep(step) {
    if (!validateStep(currentStep)) {
        return;
    }

    updateUI(step);
}
function updateUI(step) {
    currentStep = step;

    // A. Troca de Steps (Formulário)
    document.querySelectorAll('.step').forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none';
    });

    const targetStep = document.getElementById(`step${step}`);
    if (targetStep) {
        targetStep.classList.add('active');
        targetStep.style.display = 'block';
    }

    // B. Troca de Imagens
    document.querySelectorAll('.bg-image').forEach(img => img.classList.remove('active'));
    const targetImg = document.getElementById(`img-step${step}`);
    if (targetImg) targetImg.classList.add('active');

    // C. Troca de Textos Laterais
    atualizarTextoLateral(step);

    // D. Atualiza Progresso
    const bar = document.querySelector('.progress-bar');
    if (bar) bar.style.width = `${(step / 5) * 100}%`;
}

function atualizarTextoLateral(step) {
    const titleElem = document.getElementById('side-title');
    const descElem = document.getElementById('side-desc');

    if (frasesPorPasso[step] && titleElem && descElem) {
        titleElem.innerText = frasesPorPasso[step].title;
        descElem.innerText = frasesPorPasso[step].desc;
    }
}

// ============================================================
// 3. SELEÇÕES E PLANOS
// ============================================================

function selectOption(category, value, element) {
    element.dataset.value = value;
    const multiSelectCategories = ['goal', 'frequency', 'time'];
    const parent = element.parentElement;
    const siblings = parent.getElementsByClassName('option-card');

    if (multiSelectCategories.includes(category)) {
        element.classList.toggle('selected');
        const selectedValues = Array.from(siblings)
            .filter(sib => sib.classList.contains('selected'))
            .map(sib => sib.dataset.value);

        document.getElementById(category).value = selectedValues.join(',');
        return;
    }

    document.getElementById(category).value = value;
    for (let sib of siblings) sib.classList.remove('selected');
    element.classList.add('selected');
}

function selectPlan(planName, price, element) {
    
    // Sincronizando com os IDs que o seu Step 5 vai ler
    const inputName = document.getElementById('selectedPlanName');
    const inputPrice = document.getElementById('selectedPlanPrice');

    if (inputName) inputName.value = planName;
    if (inputPrice) inputPrice.value = price;

    document.getElementById('selectedPlanName').value = planName;
    document.getElementById('selectedPlanPrice').value = price;


    const allPlans = document.querySelectorAll('.plan-row');
    allPlans.forEach(plan => plan.classList.remove('selected'));
    element.classList.add('selected');

    const errorMsg = document.getElementById('error-msg');
    if (errorMsg) errorMsg.style.display = 'none';
}

// ============================================================
// 4. FINALIZAÇÃO (TICKET)
// ============================================================

function finishRegistration() {
    if (!validateStep(4)) {
        return;
    }
    // 1. CAPTURA DOS DADOS
    const planName = document.getElementById('selectedPlanName')?.value || "";
    const planPrice = document.getElementById('selectedPlanPrice')?.value || "0";
    const userName = document.getElementById('name')?.value || "Atleta";

    // Captura o método de pagamento
    const selectedRadio = document.querySelector('input[name="pay_method"]:checked');
    const paymentMethods = {
        'cartao': 'Cartão de Crédito/Débito',
        'pix': 'PIX (Confirmação Imediata)',
        'cash': 'Pagamento na Recepção'
    };
    const paymentText = selectedRadio ? (paymentMethods[selectedRadio.value] || "A definir") : "Não selecionado";


    // 2. REFERÊNCIA DOS ELEMENTOS (IDs do seu HTML)
    const finalNameElem = document.getElementById('finalName');
    const finalPlanElem = document.getElementById('finalPlan');
    const finalMethodElem = document.getElementById('finalMethod');
    if (finalMethodElem) {
        finalMethodElem.innerText = paymentText;
    }
    const finalPriceElem = document.getElementById('finalPrice');
    const ticketDiv = document.querySelector('.ticket'); // Seleciona o seu quadrado pelo nome da classe

    // 3. INSERÇÃO DOS DADOS
    if (finalNameElem) finalNameElem.innerText = userName;
    if (finalPlanElem) finalPlanElem.innerText = planName;
    if (finalMethodElem) finalMethodElem.innerText = paymentText;
    if (finalPriceElem) {
        finalPriceElem.innerText = parseFloat(planPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // 4. APLICAÇÃO DO TEMA DOURADO
    const elementsToGold = [finalNameElem, finalPlanElem, finalMethodElem, finalPriceElem];

    if (planName.includes("Diamond")) {
        // Aplica dourado no texto
        elementsToGold.forEach(el => el?.classList.add('gold-status'));
        // Aplica borda dourada no seu quadrado .ticket
        ticketDiv?.classList.add('gold-theme');
    } else {
        // Remove se o plano for outro
        elementsToGold.forEach(el => el?.classList.remove('gold-status'));
        ticketDiv?.classList.remove('gold-theme');
    }



    updateUI(5);
}
// ============================================================
// 5. EVENT LISTENERS E INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Listener para o método de pagamento (Dinheiro/Pix)
    document.querySelectorAll('input[name="pay_method"]').forEach((input) => {
        input.addEventListener('change', function () {
            const cashAlert = document.getElementById('cash-alert');
            const submitBtn = document.querySelector('#step4 .btn-primary');

            if (this.value === 'cash') {
                if (cashAlert) cashAlert.classList.add('active');
                if (submitBtn) {
                    submitBtn.innerHTML = 'Reservar Matrícula <i class="fas fa-money-bill-wave"></i>';
                    submitBtn.style.backgroundColor = '#28a745';
                }
            } else {
                if (cashAlert) cashAlert.classList.remove('active');
                if (submitBtn) {
                    submitBtn.innerHTML = 'Finalizar Cadastro <i class="fas fa-credit-card"></i>';
                    submitBtn.style.backgroundColor = '';
                }
            }
        });
    });

    atualizarTextoLateral(1);
});

