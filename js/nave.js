//Script com controles da nave
var NAVE = (function () {
     "use strict";

    //Dimensoes do canvas
    var dimensoes = RSC.getDimensao();
    var VELOCIDADE = 15;
    //Configuração inicial da nave
    var ALTURA_NAVE = 80;
    var LARGURA_NAVE = 80;

    var nave = {
        src: "img/nave.png",
        x: (dimensoes.largura / 2) - 50,
        y: (dimensoes.altura) - 150
    }

    return {
        //Função para desenhar nave no canvas
        desenhar: function (ctx) {
            var img = new Image();
            img.src = nave.src;
            //Ao carregar imagem imprimir
            ctx.drawImage(img, nave.x, nave.y);

        },
        //Funções para movimentar nave
        up: function () {
            nave.y -= VELOCIDADE;
            if (nave.y <= 0) {
                nave.y = 0;
            }
        },
        down: function () {
            nave.y += VELOCIDADE;
            if (nave.y >= dimensoes.altura - 80) {
                nave.y = dimensoes.altura - 80;
            }
        },
        left: function () {
            nave.x -= VELOCIDADE;
            if (nave.x <= 0) {
                nave.x = 0;
            }
        },
        right: function (){
            nave.x += VELOCIDADE;
            if (nave.x >= dimensoes.largura - 80){
                nave.x = dimensoes.largura - 80;
            }
        },
        getNave : function (){
            return nave;
        },
        getDimensoes : function (){
            return {altura : ALTURA_NAVE , largura : LARGURA_NAVE}
        }

    }
})();