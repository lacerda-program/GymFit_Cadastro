// Configuração
const totalSteps = 5;

// Atualiza a barra de progresso
function updateProgress(step) {
    const progressBar = document.getElementById('progressBar');
    const percentage = (step / totalSteps) * 100;
    progressBar.style.width = percentage + '%';
}

// Lógica de Seleção de Opções (Botões)
function selectOption(category, value, element) {
    // 1. Identifica o container pai (para limpar a seleção visual apenas desse grupo)
    const containerId = 'opt-' + (category === 'frequency' ? 'freq' : category); // Ajuste para mapear IDs
    const container = element.parentElement;
    
    // 2. Remove a classe 'selected' de todos os irmãos
    const siblings = container.getElementsByClassName('option-card');
    for (let card of siblings) {
        card.classList.remove('selected');
    }

    // 3. Adiciona 'selected' ao clicado
    element.classList.add('selected');

    // 4. Salva o valor no input hidden
    document.getElementById(category).value = value;
}

// Navegação Próximo
function nextStep(currentStep) {
    // --- VALIDAÇÕES ---
    
    // Passo 1: Nome Obrigatório
    if(currentStep === 1) {
        const name = document.getElementById('name').value;
        if(!name || name.length < 3) { 
            alert("Por favor, digite seu nome completo."); 
            return; 
        }
    }

    // Passo 2: Validar Perguntas do Perfil
    if(currentStep === 2) {
        const goal = document.getElementById('goal').value;
        const level = document.getElementById('level').value;
        const frequency = document.getElementById('frequency').value;
        const time = document.getElementById('time').value;

        if(!goal || !level || !frequency || !time) {
            alert("Por favor, responda todas as perguntas do perfil para montarmos seu treino.");
            return;
        }
    }

    // Passo 4: Validar Plano
    if(currentStep === 4) {
        const plan = document.getElementById('selectedPlanName').value;
        if(!plan) {
            document.getElementById('error-msg').style.display = 'block';
            return;
        }
    }

    // --- TRANSIÇÃO ---

    // 1. Oculta passo atual
    document.getElementById(`step${currentStep}`).classList.remove('active');
    
    // 2. Mostra próximo passo
    document.getElementById(`step${currentStep + 1}`).classList.add('active');
    
    // 3. Imagens (Slide Show)
    document.querySelectorAll('.bg-image').forEach(img => img.classList.remove('active'));
    const nextImg = document.getElementById(`img-step${currentStep + 1}`);
    if(nextImg) nextImg.classList.add('active');

    // 4. Atualiza Barra
    updateProgress(currentStep + 1);

    // 5. Scroll para o topo do form (UX)
    document.querySelector('.form-section').scrollTop = 0;
}

// Navegação Voltar
function prevStep(currentStep) {
    document.getElementById(`step${currentStep}`).classList.remove('active');
    document.getElementById(`step${currentStep - 1}`).classList.add('active');
    
    // Imagens
    document.querySelectorAll('.bg-image').forEach(img => img.classList.remove('active'));
    document.getElementById(`img-step${currentStep - 1}`).classList.add('active');

    updateProgress(currentStep - 1);
}

// Seleção de Planos (Passo 4)
function selectPlan(name, price, element) {
    document.querySelectorAll('.plan-row').forEach(row => row.classList.remove('selected'));
    element.classList.add('selected');

    document.getElementById('selectedPlanName').value = name;
    document.getElementById('selectedPlanPrice').value = price;
    document.getElementById('error-msg').style.display = 'none';
}

// Finalização
function finishRegistration() {
    nextStep(4); // Vai para o passo 5 (Sucesso)
    
    const name = document.getElementById('name').value;
    const plan = document.getElementById('selectedPlanName').value;
    const price = document.getElementById('selectedPlanPrice').value;

    document.getElementById('finalName').innerText = name;
    document.getElementById('finalPlan').innerText = plan;
    document.getElementById('finalPrice').innerText = parseFloat(price).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    
}

// Inicializa barra
updateProgress(1);