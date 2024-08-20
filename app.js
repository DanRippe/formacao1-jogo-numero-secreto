let listaNumerosSorteados = [];
let quantidadeNumerosPossiveis = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

exibirMsgInicial();

function alterarTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMsgInicial () {
    alterarTextoNaTela('h1', 'Jogo do número Secreto');
    alterarTextoNaTela('p', `Escolha um número de 1 a ${quantidadeNumerosPossiveis}`);
}

function inverterBotoes() {
    document.getElementById('chutar').toggleAttribute('disabled');
    document.getElementById('reiniciar').toggleAttribute('disabled');
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let msgTentativas = `Você descobriu o número secreto em ${tentativas} ${palavraTentativas}.`;
        alterarTextoNaTela('h1', 'Acertou!');
        alterarTextoNaTela('p', msgTentativas);
        inverterBotoes();
    } else {
        if (chute > numeroSecreto) {
            alterarTextoNaTela('p', `O número secreto é menor que ${chute}`);
        } else {
            alterarTextoNaTela('p', `O número secreto é maior que ${chute}`);
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * quantidadeNumerosPossiveis + 1);
    let quantidadeElementosNaLista = listaNumerosSorteados.length;

    if (quantidadeElementosNaLista == quantidadeNumerosPossiveis) {
        listaNumerosSorteados = [];
    }

    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        //console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    exibirMsgInicial();
    limparCampo();
    inverterBotoes();
    tentativas = 1;
    numeroSecreto = gerarNumeroAleatorio();
}