var METEORO = (function () {

    "use strict";
    //Dimensoes do meteoros
    var LARGURA_MET = 100;
    var ALTURA_METE = 100;
    //Dimensoes do canvas
    var dimensoes = RSC.getDimensao();
    var INTERVALO_IMPRESSAO = 1.5;
    var INTERVALO_VELOCIDADE = 10;
    //Tempo de atualização da velocidade
    var tempoInicialV = new Date().getTime();
    //Tempo para impressão dos meteoros
    var tempoInicialD = new Date().getTime();
    //Array de meteoros
    var meteoros = [];
    //velocidade
    var velocidade = 3;
    //src de cada alvo 
    var imagens = ["alvo1.png","alvo2.png","alvo3.png","alvo4.png","alvo5.png"]
    return {

        atualizarMeteoros: function () {
            //Atualizando posição dos meteoros
            for (var i = 0; i < meteoros.length; i++) {
                //Verificando se meteoro já saiu da tela
                if (meteoros[i].y > dimensoes.altura) {
                    meteoros.shift();
                    if (i > 0) {
                        i--;
                    }
                } else {
                    meteoros[i].y += velocidade;
                }
            }


            //Atualizando velocidade
            var tempoAtual = new Date().getTime();
            var diferenca = tempoAtual - tempoInicialV;
            if (diferenca / 1000 >= INTERVALO_VELOCIDADE) {
                tempoInicialV = tempoAtual;
                velocidade += .5;
            }

            //Verifica se já passou o intervalo de impressão
            var tempoAtual = new Date().getTime();
            var diferenca = tempoAtual - tempoInicialD;
            if (diferenca / 1000 >= INTERVALO_IMPRESSAO) {
                tempoInicialD = tempoAtual;
                //Valor randomico
                var rx = Math.floor(Math.random() * 4) * 90;
                var imagemAleatorio = Math.floor(Math.random() * 5);
                meteoros.push({ x: rx, y: 0 , status : 0 , src : "img/"+ imagens[imagemAleatorio]});


            }

        },
        desenharMeteoros: function (ctx) {
            for (var i = 0; i < meteoros.length; i++) {
                var img = new Image();
                img.src = meteoros[i].src;
                //Ao carregar imagem imprimir
                ctx.drawImage(img, meteoros[i].x, meteoros[i].y);
                if (meteoros[i].status == 1){
                    meteoros[i].status = 2;
                }
            }

        },
        getMeteoros: function () {
            return meteoros;
        },
        getDimensoes: function () {
            return { largura: LARGURA_MET, altura: ALTURA_METE }
        }
    }

})();