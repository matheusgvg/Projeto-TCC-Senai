<?php
// Configurações de cabeçalho para resposta JSON
header("Content-Type: application/json");

// 1. Conexão com o Banco de Dados SQLite
// O SQLite armazena os dados em um único arquivo local, garantindo baixo custo [2, 5].
try {
    $db = new PDO('sqlite:../database/mapa.db');
    // configura o php para mostrar erros de conexão, sempre que houver erros de conexão
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["sucesso" => false, "mensagem" => "Erro ao conectar ao banco: " . $e->getMessage()]);
    exit;
}

// 2. Captura dos dados brutos enviados pelo Frontend (JSON)
$input = file_get_contents('php://input');
$dados = json_decode($input, true);

if (!$dados) {
// Se os dados não forem válidos ou estiverem vazios, retorna um erro, facilitar o debbuging.
    echo json_encode(["sucesso" => false, "mensagem" => "Dados inválidos ou vazios."]);
    exit;
}

$acao = $dados['acao'] ?? '';

// 3. Roteamento de Ações
switch ($acao) {
    case 'login':
        // Lógica para autenticação de Colaborador e RH [6]
        processarLogin($db, $dados);
        break;

    case 'salvar_quiz':
        // Lógica para salvar o progresso parcial do questionário [5, 7]
        break;

    case 'finalizar_mapeamento':
        // Aciona o processamento do algoritmo de mapeamento [4, 8]
        require_once 'processar_perfil.php';
        break;

    default:
        echo json_encode(["sucesso" => false, "mensagem" => "Ação não reconhecida."]);
        break;
}
