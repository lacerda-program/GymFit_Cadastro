// CONFIGURAÇÃO DAS FRASES DINÂMICAS (Copy de Vendas)
const frasesPorPasso = {
    1: { titulo: "BEM-VINDO", texto: "O primeiro passo para o topo começa aqui." },
    2: { titulo: "TRANSFORMAÇÃO", texto: "Transforme seu corpo, mude sua vida." },
    3: { titulo: "EXCELÊNCIA", texto: "A melhor estrutura de Vitória da Conquista." },
    4: { titulo: "INVESTIMENTO", texto: "Invista em si mesmo. O seu futuro eu agradece." },
    5: { titulo: "PARABÉNS!", texto: "A jornada começou. Nos vemos no treino!" }
};

// FUNÇÃO DE NAVEGAÇÃO: PRÓXIMO
function nextStep(step) {
    // Validação e Coleta de Nome no Passo 1
    if (step === 1) {
        const nameInput = document.getElementById('name');
        if (!nameInput || !nameInput.value) {
            alert("Por favor, preencha seu nome para continuar.");
            return;
        }
        // Tenta preencher o ticket final com segurança
        const elFinalName = document.getElementById('finalName');
        if (elFinalName) elFinalName.innerText = nameInput.value;
    }

    // Troca de Telas (Segurança contra erro de ID)
    const current = document.getElementById(`step${step}`);
    const next = document.getElementById(`step${step + 1}`);
    const imgCurrent = document.getElementById(`img-step${step}`);
    const imgNext = document.getElementById(`img-step${step + 1}`);

    if (current && next) {
        current.classList.remove('active');
        next.classList.add('active');
        
        if (imgCurrent && imgNext) {
            imgCurrent.classList.remove('active');
            imgNext.classList.add('active');
        }

        // Atualiza o texto motivacional
        atualizarTextoLateral(step + 1);

        // Barra de Progresso
        const progressBar = document.getElementById('progressBar');
        if (progressBar) progressBar.style.width = (step / 4) * 100 + '%';
    }
}

// FUNÇÃO DE NAVEGAÇÃO: VOLTAR
function prevStep(step) {
    const current = document.getElementById(`step${step}`);
    const prev = document.getElementById(`step${step - 1}`);
    const imgCurrent = document.getElementById(`img-step${step}`);
    const imgPrev = document.getElementById(`img-step${step - 1}`);

    if (current && prev) {
        current.classList.remove('active');
        prev.classList.add('active');

        if (imgCurrent && imgPrev) {
            imgCurrent.classList.remove('active');
            imgPrev.classList.add('active');
        }

        atualizarTextoLateral(step - 1);

        const progressBar = document.getElementById('progressBar');
        if (progressBar) progressBar.style.width = ((step - 2) / 4) * 100 + '%';
    }
}

// ATUALIZAR TEXTO LATERAL COM FADE
function atualizarTextoLateral(step) {
    const overlay = document.querySelector('.overlay-text');
    if (overlay && frasesPorPasso[step]) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.querySelector('h3').innerText = frasesPorPasso[step].titulo;
            overlay.querySelector('p').innerText = frasesPorPasso[step].texto;
            overlay.style.opacity = '1';
        }, 300);
    }
}

// SELEÇÃO DE BOTÕES ÚNICOS (OBJETIVO/NÍVEL)
function selectBtn(el, inputId) {
    const parent = el.parentElement;
    parent.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('selected'));
    el.classList.add('selected');
    
    const hiddenInput = document.getElementById(inputId);
    if (hiddenInput) hiddenInput.value = el.innerText;
}

// SELEÇÃO DE MÚLTIPLA ESCOLHA (HORÁRIOS)
function toggleMultiBtn(el) {
    el.classList.toggle('selected');
}

// SELEÇÃO DE PLANOS
function selectPlan(name, price, el) {
    document.querySelectorAll('.plan-row').forEach(r => r.classList.remove('selected'));
    el.classList.add('selected');
    
    // Alimenta inputs invisíveis para envio posterior
    const inputPlan = document.getElementById('selectedPlanName');
    const inputPrice = document.getElementById('selectedPlanPrice');
    if (inputPlan) inputPlan.value = name;
    if (inputPrice) inputPrice.value = price;
    
    // Alimenta o Ticket Final (Step 5)
    const elPlan = document.getElementById('finalPlan');
    const elPrice = document.getElementById('finalPrice');
    if (elPlan) elPlan.innerText = name;
    if (elPrice) elPrice.innerText = `R$ ${price},00`;
}

// FINALIZAR INSCRIÇÃO
function finishRegistration() {
    const planSelected = document.getElementById('selectedPlanName') ? document.getElementById('selectedPlanName').value : '';
    if (!planSelected) {
        alert("Por favor, selecione um plano para continuar.");
        return;
    }
    nextStep(4);
}

// LOGICA DE PAGAMENTO (DINHEIRO VS DIGITAL)
document.addEventListener('change', (e) => {
    if (e.target.name === 'pay_method') {
        const cashAlert = document.getElementById('cash-alert');
        const btnFinal = document.getElementById('btn-final');
        
        if (e.target.value === 'cash') {
            if (cashAlert) cashAlert.style.display = 'block';
            if (btnFinal) btnFinal.innerText = "Reservar Matrícula Presencial";
        } else {
            if (cashAlert) cashAlert.style.display = 'none';
            if (btnFinal) btnFinal.innerText = "Finalizar Matrícula";
        }
    }
});
document.addEventListener('change', (e) => {
    if (e.target.name === 'pay_method') {
        const cashAlert = document.getElementById('cash-alert');
        const btnFinal = document.getElementById('btn-final');
        
        if (e.target.value === 'cash') {
            // Se for dinheiro: Mostra box, muda texto e fica VERDE
            if (cashAlert) cashAlert.style.display = 'flex';
            if (btnFinal) {
                btnFinal.innerText = "Reservar Matrícula";
                btnFinal.classList.add('btn-reserve');
            }
        } else {
            // Se for digital: Esconde box, muda texto e volta ao AZUL
            if (cashAlert) cashAlert.style.display = 'none';
            if (btnFinal) {
                btnFinal.innerText = "Finalizar Matrícula";
                btnFinal.classList.remove('btn-reserve');
            }
        }
    }
});