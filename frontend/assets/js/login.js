/**
 * MAPA - Sistema de Mapeamento de Competências & Aptidões
 * Lógica do Portal de Acesso (Login e Recuperação)
 */

document.addEventListener('DOMContentLoaded', () => {
    // Seleção de elementos do DOM
    const formLogin = document.getElementById('formLogin');
    const btnEsqueceu = document.getElementById('btnEsqueceu');
    const modalRecuperacao = document.getElementById('modalRecuperacao');
    const btnFecharModal = document.querySelector('.close-modal');
    const formRecuperacao = document.getElementById('formRecuperacao');

    // --- 1. Lógica de Autenticação ---
    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Captura os dados brutos conforme definido na metodologia [2]
        const dados = {
            perfil: document.getElementById('perfil').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        try {
            // Realiza a requisição POST para o Backend PHP [1, 4]
            const response = await fetch('backend/index.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ acao: 'login', ...dados })
            });

            const resultado = await response.json();

            if (resultado.sucesso) {
                // Redireciona conforme o perfil (Colaborador ou RH) [3]
                window.location.href = dados.perfil === 'gestor' 
                    ? 'frontend/dashboard/dashboard.html' 
                    : 'frontend/quiz/formulario.html';
            } else {
                alert('Erro de autenticação: ' + resultado.mensagem);
            }
        } catch (error) {
            console.error('Erro ao conectar com o servidor:', error);
            // Simulação para fins de desenvolvimento (remover em produção)
            alert('Simulação: Login efetuado como ' + dados.perfil);
            window.location.href = dados.perfil === 'gestor' ? 'dashboard/dashboard.html' : 'quiz/formulario.html';
        }
    });

//eventos

    // --- 2. Gestão do Modal de Recuperação ---
    // Abre o modal de recuperação de acesso [3, 5]
    btnEsqueceu.addEventListener('click', (e) => {
        e.preventDefault();
        modalRecuperacao.classList.remove('hidden');
    });

    // Fecha o modal
    btnFecharModal.addEventListener('click', () => {
        modalRecuperacao.classList.add('hidden');
    });

    // Fecha o modal ao clicar fora dele
    window.addEventListener('click', (e) => {
        if (e.target === modalRecuperacao) {
            modalRecuperacao.classList.add('hidden');
        }
    });

    // --- 3. Lógica de Envio de Recuperação ---
    formRecuperacao.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('emailRecupera').value;

        // Integração com o "Sistema de Email Serviço" [6]
        console.log('Solicitando recuperação para:', email);
        alert('Instruções enviadas para o e-mail: ' + email);
        modalRecuperacao.classList.add('hidden');
    });
});