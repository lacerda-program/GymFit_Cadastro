// Navegação entre passos
function nextStep(step) {
    if (step === 1) {
        const name = document.getElementById('name').value;
        if (!name) return alert("Por favor, preencha seu nome.");
        document.getElementById('finalName').innerText = name;
    }

    document.getElementById(`step${step}`).classList.remove('active');
    document.getElementById(`img-step${step}`).classList.remove('active');

    const next = step + 1;
    document.getElementById(`step${next}`).classList.add('active');
    document.getElementById(`img-step${next}`).classList.add('active');

    // Barra de progresso (calculada para 5 passos)
    const progress = (step / 4) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
}

function prevStep(step) {
    document.getElementById(`step${step}`).classList.remove('active');
    document.getElementById(`img-step${step}`).classList.remove('active');

    document.getElementById(`step${step - 1}`).classList.add('active');
    document.getElementById(`img-step${step - 1}`).classList.add('active');

    const progress = ((step - 2) / 4) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
}

// Seleção de cards (Objetivo, Experiência, Frequência, Horário)
function selectOption(id, value, element) {
    // Remove seleção dos irmãos
    const parent = element.parentElement;
    parent.querySelectorAll('.option-card').forEach(card => card.classList.remove('selected'));
    
    // Ativa o atual e salva no input hidden
    element.classList.add('selected');
    document.getElementById(id).value = value;
}

// Seleção de Planos
function selectPlan(name, price, element) {
    document.querySelectorAll('.plan-row').forEach(row => row.classList.remove('selected'));
    element.classList.add('selected');

    document.getElementById('selectedPlanName').value = name;
    document.getElementById('selectedPlanPrice').value = price;
    
    // Atualiza o ticket final preventivamente
    document.getElementById('finalPlan').innerText = name;
    document.getElementById('finalPrice').innerText = `R$ ${price.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
}

// Monitor de Pagamento (Dinheiro)
document.addEventListener('change', (e) => {
    if (e.target.name === 'pay_method') {
        const alertBox = document.getElementById('cash-alert');
        alertBox.style.display = e.target.value === 'cash' ? 'block' : 'none';
    }
});
// Lógica para monitorar o método de pagamento e mudar o botão
document.addEventListener('change', (e) => {
    if (e.target.name === 'pay_method') {
        const alertBox = document.getElementById('cash-alert');
        const btnFinalizar = document.querySelector('button[onclick="finishRegistration()"]');
        
        if (e.target.value === 'cash') {
            // Se for dinheiro
            alertBox.style.display = 'block';
            btnFinalizar.innerHTML = 'Reservar Matrícula <i class="fas fa-calendar-check"></i>';
            btnFinalizar.style.backgroundColor = '#28a745'; // Opcional: muda para um verde de "reserva"
        } else {
            // Se for Pix ou Cartão
            alertBox.style.display = 'none';
            btnFinalizar.innerHTML = 'Finalizar Pagamento <i class="fas fa-credit-card"></i>';
            btnFinalizar.style.backgroundColor = ''; // Volta para a cor padrão (Azul)
        }
    }
});
// Finalização
function finishRegistration() {
    const plan = document.getElementById('selectedPlanName').value;
    if (!plan) {
        document.getElementById('error-msg').style.color = 'red';
        return;
    }
    nextStep(4);
}