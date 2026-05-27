// ========================================
// ELEMENTOS DO DOM
// ========================================

const inputIP = document.getElementById('inputIP');
const btnPesquisar = document.getElementById('btnPesquisar');
const resultado = document.getElementById('resultado');
const loading = document.getElementById('loading');

// ========================================
// FUNÇÃO PARA FORMATAR DOMÍNIO
// ========================================

function formatarDominio(entrada) {
    const ipRegex = /^\d+\.\d+\.\d+\.\d+$/;
    const dominioRegex = /\.\w{2,}$/;

    if (ipRegex.test(entrada)) return entrada;
    if (dominioRegex.test(entrada)) return entrada;

    return entrada + ".com";
}

// ========================================
// FUNÇÃO PARA VALIDAR IP
// ========================================

function validarIP(ip) {
    const partes = ip.split('.');
    if (partes.length !== 4) return false;
    
    return partes.every(parte => {
        const num = parseInt(parte);
        return num >= 0 && num <= 255 && parte === num.toString();
    });
}

// ========================================
// FUNÇÃO PARA OBTER IP A PARTIR DO DOMÍNIO
// ========================================

async function obterIP(entrada) {
    try {
        entrada = formatarDominio(entrada);
        
        if (!validarIP(entrada)) {
            const response = await fetch(`https://dns.google/resolve?name=${entrada}`);
            const data = await response.json();

            if (!data.Answer || !data.Answer[0]) {
                throw "Domínio inválido!";
            }
            return data.Answer[0].data;
        }
        return entrada;
    } catch (error) {
        throw "Não foi possível resolver o domínio.";
    }
}

// ========================================
// FUNÇÃO PARA EXIBIR CARREGAMENTO
// ========================================

function mostrarCarregamento() {
    loading.classList.remove('hidden');
    resultado.innerHTML = '';
}

function esconderCarregamento() {
    loading.classList.add('hidden');
}

// ========================================
// FUNÇÃO PARA FORMATAR DADOS
// ========================================

function formatarDados(data) {
    return {
        ip: data.ip || 'N/A',
        cidade: data.city || 'N/A',
        regiao: data.region || 'N/A',
        pais: data.country || 'N/A',
        localizacao: data.loc || 'N/A',
        provedor: data.org || 'N/A',
        fuso: data.timezone || 'N/A',
        codigo_postal: data.postal || 'N/A'
    };
}

// ========================================
// FUNÇÃO PARA GERAR HTML DOS RESULTADOS
// ========================================

function gerarHTMLResultados(dados) {
    return `
        <div class="success-message">
            Informações obtidas com sucesso!
        </div>
        <div class="info-grid">
            <div class="info-card">
                <div class="info-card-label">Endereço IP</div>
                <div class="info-card-value">${dados.ip}</div>
            </div>
            <div class="info-card">
                <div class="info-card-label">País</div>
                <div class="info-card-value">${dados.pais}</div>
            </div>
            <div class="info-card">
                <div class="info-card-label">Região</div>
                <div class="info-card-value">${dados.regiao}</div>
            </div>
            <div class="info-card">
                <div class="info-card-label">Cidade</div>
                <div class="info-card-value">${dados.cidade}</div>
            </div>
            <div class="info-card">
                <div class="info-card-label">Código Postal</div>
                <div class="info-card-value">${dados.codigo_postal}</div>
            </div>
            <div class="info-card">
                <div class="info-card-label">Fuso Horário</div>
                <div class="info-card-value">${dados.fuso}</div>
            </div>
            <div class="info-card">
                <div class="info-card-label">Localização</div>
                <div class="info-card-value" style="font-size: 1rem;">${dados.localizacao}</div>
            </div>
            <div class="info-card">
                <div class="info-card-label">Provedor</div>
                <div class="info-card-value" style="font-size: 1rem;">${dados.provedor}</div>
            </div>
        </div>
    `;
}

// ========================================
// FUNÇÃO PARA EXIBIR ERRO
// ========================================

function exibirErro(mensagem) {
    resultado.innerHTML = `<div class="error-message">${mensagem}</div>`;
}

// ========================================
// FUNÇÃO PRINCIPAL DE BUSCA
// ========================================

async function buscarDados() {
    try {
        const entrada = inputIP.value.trim();
        
        if (!entrada) {
            exibirErro('Por favor, digite um IP ou domínio!');
            return;
        }

        mostrarCarregamento();

        const ip = await obterIP(entrada);

        // Buscar informações do IP na API ipinfo
        const response = await fetch(`https://ipinfo.io/${ip}/json?token=1d7566f6442d37`);
        
        if (!response.ok) {
            throw 'Erro ao conectar com a API';
        }

        const data = await response.json();

        if (data.bogon) {
            esconderCarregamento();
            exibirErro('IP inválido ou não encontrado. Tente outro endereço.');
            return;
        }

        const dadosFormatados = formatarDados(data);
        esconderCarregamento();
        resultado.innerHTML = gerarHTMLResultados(dadosFormatados);

    } catch (error) {
        esconderCarregamento();
        exibirErro(error || 'Ocorreu um erro na busca. Tente novamente.');
    }
}

// ========================================
// EVENT LISTENERS
// ========================================

btnPesquisar.addEventListener('click', buscarDados);

inputIP.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        buscarDados();
    }
});

// ========================================
// FOCO INICIAL
// ========================================

inputIP.focus();
