document.addEventListener('DOMContentLoaded', () => {
            const avancarBtn = document.getElementById('avancarBtn');
            const finalizarBtn = document.getElementById('finalizarBtn');
            const voltarBtn = document.getElementById('voltarBtn');
            const formContainer = document.getElementById('formContainer');
            const paymentContainer = document.getElementById('paymentContainer');
            const welcomeContainer = document.getElementById('welcomeContainer');
            const nomeInput = document.getElementById('nome');
            const dataNascimentoInput = document.getElementById('data_nascimento');
            const cpfInput = document.getElementById('cpf');
            const telefoneInput = document.getElementById('telefone');
            const valorInput = document.getElementById('valor');
            const valorInfo = document.getElementById('valorInfo');
            const planCards = document.querySelectorAll('.plan-card');
            const userNameSpan = document.getElementById('userName');

            let nomeUsuario = '';
            let planoSelecionado = null;

            // Validação idade
            dataNascimentoInput.addEventListener('change', () => {
                const data = new Date(dataNascimentoInput.value);
                const hoje = new Date();
                let idade = hoje.getFullYear() - data.getFullYear();
                if (hoje.getMonth() < data.getMonth() || (hoje.getMonth() === data.getMonth() && hoje.getDate() < data.getDate())) idade--;
                if (idade < 16) { alert('Você deve ter pelo menos 16 anos!'); dataNascimentoInput.value = ''; }
            });

            // Validação CPF (somente números)
            cpfInput.addEventListener('input', () => {
                let cpf = cpfInput.value.replace(/\D/g, '');
                if (cpf.length > 11) cpf = cpf.slice(0, 11);
                cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                cpfInput.value = cpf;
            });

            // Validação telefone (11 dígitos)
            telefoneInput.addEventListener('input', () => {
                let tel = telefoneInput.value.replace(/\D/g, '');
                if (tel.length > 11) tel = tel.slice(0, 11);
                if (tel.length >= 2) tel = `(${tel.slice(0, 2)}) ${tel.slice(2, 7)}-${tel.slice(7, 11)}`;
                telefoneInput.value = tel;
            });

            // Avançar para pagamento
            avancarBtn.addEventListener('click', () => {
                const inputs = document.querySelectorAll('#inscricaoForm input');
                for (let i of inputs) if (i.value.trim() === '') { alert('Preencha todos os campos!'); return; }
                nomeUsuario = nomeInput.value.trim();
                formContainer.classList.remove('active');
                paymentContainer.classList.add('active');
            });

            // Seleção de planos
            planCards.forEach(card => {
                card.addEventListener('click', () => {
                    // remove seleção anterior
                    planCards.forEach(c => c.classList.remove('plan-selected'));
                    card.classList.add('plan-selected');

                    // pegar valores
                    planoSelecionado = card.dataset.plano;
                    const valorFull = Number(card.dataset.valorFull);
                    const valorDesconto = Number(card.dataset.valorDesconto);

                    // atualizar campo valor e resumo
                    valorInput.value = valorDesconto.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
                    valorInfo.innerHTML = `Plano: <strong>${planoSelecionado}</strong><br>
                               Valor cheio: R$ ${valorFull.toLocaleString('pt-BR')}<br>
                               Valor com desconto: <strong>R$ ${valorDesconto.toLocaleString('pt-BR')}</strong>`;
                });
            });


            // Finalizar inscrição
            finalizarBtn.addEventListener('click', () => {
                if (!planoSelecionado) { alert('Selecione um plano!'); return; }
                userNameSpan.textContent = nomeUsuario;
                paymentContainer.classList.remove('active');
                welcomeContainer.classList.add('active');
            });

            // Voltar ao formulário
            voltarBtn.addEventListener('click', () => {
                document.getElementById('inscricaoForm').reset();
                valorInput.value = ''; valorInfo.textContent = ''; planoSelecionado = null;
                planCards.forEach(c => c.classList.remove('plan-selected'));
                welcomeContainer.classList.remove('active');
                formContainer.classList.add('active');
            });
        });