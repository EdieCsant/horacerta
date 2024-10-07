// Função para buscar a hora correta da API de tempo
async function buscarTempo() {
    try {
        // Fazendo a requisição para a API pública (substituir pelo backend com NTP.br se necessário)
        const response = await fetch('https://worldtimeapi.org/api/timezone/America/Sao_Paulo');
        const data = await response.json();
        
        // Obtendo a hora UTC da resposta
        const dateTime = new Date(data.datetime);
        
        // Formatando a hora
        const horas = String(dateTime.getHours()).padStart(2, '0');
        const minutos = String(dateTime.getMinutes()).padStart(2, '0');
        const segundos = String(dateTime.getSeconds()).padStart(2, '0');
        
        // Atualizando o DOM com a hora correta
        document.getElementById('horacerta').innerText = `${horas}:${minutos}:${segundos}`;
    } catch (error) {
        console.error("Erro ao buscar a hora: ", error);
        document.getElementById('horacerta').innerText = "Erro ao obter a hora";
    }
}

// Função para atualizar a hora local a cada segundo
function atualizarHora() {
    const elemento = document.getElementById('horacerta');
    const [horas, minutos, segundos] = elemento.innerText.split(':').map(Number);
    const novaHora = new Date();
    novaHora.setHours(horas);
    novaHora.setMinutes(minutos);
    novaHora.setSeconds(segundos + 1);
    
    const horasStr = String(novaHora.getHours()).padStart(2, '0');
    const minutosStr = String(novaHora.getMinutes()).padStart(2, '0');
    const segundosStr = String(novaHora.getSeconds()).padStart(2, '0');
    
    elemento.innerText = `${horasStr}:${minutosStr}:${segundosStr}`;
}

document.addEventListener("DOMContentLoaded", function() {
    buscarTempo(); // Busca a hora correta da API
    setInterval(atualizarHora, 1000); // Atualiza a hora local a cada segundo
});