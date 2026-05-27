# Gym-Fit: Sistema de Matrícula Digital e Gestão de Conversão
## 📬 Contato & Networking
Estou disponível para entrevistas e discussões sobre arquitetura de software.

[![GitHub](https://img.shields.io/badge/GitHub-Ver_Portfólios-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/lacerda-program)
[![Email](https://img.shields.io/badge/Email-Enviar_Proposta-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:samuellacerda1018@gmail.com)
[![Portfolio](https://img.shields.io/badge/Projeto-Acessar_GymFit-success?style=for-the-badge&logo=googlechrome&logoColor=white)](https://lacerda-program.github.io/GymFit_Cadastro/)

[![Deploy Status](https://img.shields.io/badge/Status-Production-success?style=for-the-badge&logo=vercel)](https://lacerda-program.github.io/GymFit_Cadastro/)
[![Tech Stack](https://img.shields.io/badge/Stack-Vanilla_JS-yellow?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---


 [GymFit-site](https://lacerda-program.github.io/site_banda/)  
---


## 🏛️ Conceito e Arquitetura
Este projeto consiste em uma Single Page Application (SPA) focada na **otimização da taxa de conversão (CRO)** para a academia Gym-Fit. Ao invés de um formulário monolítico, desenvolvi uma arquitetura de **"Wizard" (Passo-a-Passo)**, onde a interface atua como um gerenciador de estados, guiando o usuário através de um funil de vendas linear e intuitivo.

A engenharia do projeto foca em **Feedback Visual Imediato** e **Validação de Regras de Negócio** no client-side.

---

## 🛠️ Stack Tecnológica & Decisões de Engenharia

Minha escolha por não utilizar frameworks (como React ou Vue) foi deliberada para garantir **Zero-Overhead** e máximo controle sobre o DOM.

| Tecnologia | Aplicação no Projeto |
| :--- | :--- |
| **HTML5 Semântico** | Estruturação de dados focada em acessibilidade (A11y) e SEO. Uso de tags de formulário apropriadas para validação nativa. |
| **CSS3 (Grid & Flex)** | Layout responsivo com foco em *Mobile-First*. Utilização de transições CSS para suavizar a troca de etapas, melhorando a UX. |
| **Vanilla JavaScript** | **Core do Sistema.** Responsável pela máquina de estados, manipulação dinâmica de assets (imagens/textos) e lógica de pagamento. |

---

## ⚙️ Detalhamento do Fluxo e Lógica de Negócio

O sistema opera baseando-se em um índice de etapas (`currentStep`), onde cada incremento dispara uma série de eventos no DOM. Abaixo, detalho a engenharia de cada fase:

###  Etapa 1: Captura de Dados (Lead Generation)
* **Funcionalidade:** Coleta de dados primários (Nome, CPF, E-mail).
* **Lógica Técnica:** Implementei *EventListeners* que monitoram os inputs. O sistema valida se os campos obrigatórios estão preenchidos antes de permitir a transição de estado, prevenindo o envio de dados nulos.

###  Etapa 2: Perfil & Sincronização Visual
* **Funcionalidade:** O usuário define seu objetivo (ex: Hipertrofia, Emagrecimento).
* **Dinâmica de Interface:** Aqui, a engenharia de UI brilha. Ao entrar nesta etapa, o script detecta o índice e **injeta dinamicamente** uma nova imagem de fundo e frases motivacionais correspondentes ao contexto de "superação", criando uma conexão emocional imediata.

###  Etapa 3: Apresentação de Infraestrutura
* **Funcionalidade:** Tour virtual estático.
* **UX Strategy:** O formulário deixa de ser apenas "entrada de dados" e passa a ser informativo. As imagens laterais e os textos são alterados via JavaScript para destacar equipamentos e climatização, reforçando o valor do serviço antes da cobrança.

###  Etapa 4: Motor de Planos e Lógica Condicional de Pagamento
Esta é a parte mais complexa da aplicação, onde apliquei **Regras de Negócio Condicionais**:

1.  **Seleção de Plano:** O usuário escolhe entre planos (Simples vs Completo com Lutas).
2.  **Bifurcação de Fluxo (Branching Logic):**
    * **Cenário A (Cartão):** Se o usuário seleciona Pagamento Online, o sistema prepara o payload para uma transação imediata (simulação de gateway).
    * **Cenário B (Dinheiro):** Se a opção for "Dinheiro", o sistema intercepta a lógica de finalização e altera o status para **"Reserva de Matrícula"**. O botão de ação muda de "Pagar" para "Reservar", instruindo o usuário a comparecer ao balcão.

###  Etapa 5: Feedback e Agregação de Dados (Summary View)
* **Funcionalidade:** Tela de sucesso e confirmação.
* **Processamento de Dados:** Antes de renderizar esta tela, uma função percorre todos os inputs anteriores, captura os valores armazenados no estado da aplicação e monta um **Relatório Resumo**.
* **Resultado:** O usuário vê seu Nome, o Plano escolhido e a instrução final baseada na forma de pagamento selecionada na etapa anterior.

---

##  Instalação e Execução Local

Para analisar o código-fonte e testar as lógicas condicionais:

```bash
# 1. Clone este repositório
git clone [https://github.com/lacerda-program/GymFit_Cadastro.git](https://github.com/lacerda-program/GymFit_Cadastro.git)

# 2. Acesse o diretório do projeto
cd GymFit_Cadastro

# 3. Abra o arquivo index.html no seu navegador preferido
# (Não é necessário instalação de node_modules, pois o projeto é Vanilla puro)
