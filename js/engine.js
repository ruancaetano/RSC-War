//Script Engine responsável por fornecer todas as funções do jogo
var RSC = (function () {
    "use strict";

    //Variaveis do jogo
    var canvas, ctx, ALTURA, LARGURA, frames = 0, pontuacao = 0, loopId = undefined, vidas = 3;
    return {

        main: function () {

            RSC.setDimensao();

            //Criando elemento canvas
            canvas = document.getElementById("canvas");
            canvas.width = LARGURA;
            canvas.height = ALTURA;
            //Configurando contexto
            ctx = canvas.getContext("2d");
            //Adicionando canvas ao html
            document.body.appendChild(canvas);
            //Adicionado evento teclado ao document
            document.addEventListener("keydown", RSC.acaoTeclado);
            document.addEventListener("keyup", RSC.acaoTeclado);
            //Inicia o loop
            RSC.loop();
        },
        setDimensao: function () {
            //Configurando altura e largura do campo de jogo (canvas)
            ALTURA = window.innerHeight;
            LARGURA = window.innerWidth;
            if (ALTURA > 600){
                ALTURA = 600;
            }
            if (LARGURA > 400){
                LARGURA = 400;
            }
            
            
        },
        getDimensao: function () {
            RSC.setDimensao();
            return {
                altura: ALTURA,
                largura: LARGURA
            }
        },

        acaoTeclado: function (event) {
            var code = event.keyCode;
            switch (code) {
                case 37:
                    NAVE.left();
                    break;
                case 39:
                    NAVE.right();
                    break;
                case 38:
                    NAVE.up();
                    break;
                case 40:
                    NAVE.down();
                    break;
                case 32:
                    ARMA.atirar();
            }
        },

        loop: function () {
            RSC.atualizar();
            RSC.desenhar();

            loopId = window.requestAnimationFrame(RSC.loop);
        },
        stopLoop: function () {
            if (loopId) {
                window.cancelAnimationFrame(loopId);
                loopId = undefined;
            }
        },
        atualizar: function () {
            //Atualizando tiros, caso arma estiver carregada
            if (ARMA) {
                ARMA.atualizarTiros();
            }
            //Atualizando meteoros
            if (METEORO) {
                METEORO.atualizarMeteoros();
            }
            //Atualizando pontuação (conferindo colisão entre bala e meteoro)
            RSC.atualizaPontuacao();

            //Atualizando vidas (conferindo colisão da nave com os meteoros)
            RSC.atualizaVida();



        },
        desenhar: function () {
            
            ctx.clearRect(0, 0, LARGURA, ALTURA);

            //Desenha nave
            if (NAVE) {
                NAVE.desenhar(ctx);
            }

            //Desenha tiros
            if (ARMA) {
                ARMA.desenharTiros(ctx);
            }

            //Desenhando meteoros
            if (METEORO) {
                METEORO.desenharMeteoros(ctx);
            }

        },
        //Método para verificar colisão entre dois sprites
        // obj = { y, altura}
        verificarColisao: function (obj1, obj2) {

            //Pegando centros em X
            var centroX1 = obj1.x + obj1.x / 2;
            var centroX2 = obj2.x + obj2.x / 2;
            //Pegando centros em Y
            var centroY1 = obj1.y + obj1.y / 2;
            var centroY2 = obj2.y + obj2.y / 2;
            //Distancia do centro em x
            var dx = Math.abs(centroX2 - centroX1);
            //Distancia do centro em y
            var dy = Math.abs(centroY2 - centroY1);

            var metadeAltura1 = obj1.altura / 2;
            var metadeAltura2 = obj2.altura / 2;

            var metadeLargura1 = obj1.largura / 2;
            var metadeLargura2 = obj2.largura / 2;

            var somaMetadeAltura = metadeAltura1 + metadeAltura2;
            var somaMetadeLargura = metadeLargura1 + metadeLargura2;

            if (dx < somaMetadeLargura && dy < somaMetadeAltura) {
                return true;
            }
            return false;
        },
        atualizaPontuacao: function () {
            if (ARMA) {
                var tiros = ARMA.getTiros();
                var dimensoesBala = ARMA.getDimensoes();
            }

            if (METEORO) {
                var meteoros = METEORO.getMeteoros();
                var dimensoesMeteoro = METEORO.getDimensoes();
            }



            for (var i = 0; i < tiros.length; i++) {
                for (var j = 0; j < meteoros.length; j++) {
                    if (tiros[i]) {
                        var objTiro = {
                            x: tiros[i].x,
                            y: tiros[i].y,
                            altura: dimensoesBala.altura,
                            largura: dimensoesBala.largura
                        }
                    }

                    if (meteoros[j]) {
                        var objMeteoro = {
                            x: meteoros[j].x,
                            y: meteoros[j].y,
                            altura: dimensoesMeteoro.altura,
                            largura: dimensoesMeteoro.largura
                        }
                    }


                    //Se acontecer colisão
                    if (RSC.verificarColisao(objTiro, objMeteoro)) {

                        //Remove tiro 
                        tiros.splice(i, 1);
                        if (i > 0) {
                            i--;
                        }
                        //remove meteoro
                        meteoros.splice(j, 1);
                        if (j > 0) {
                            j--;
                        }
                        //Atualiza pontuacao
                        document.getElementById('pontuacao').innerHTML = "Pontuação: " + ++pontuacao;
                    }
                }
            }
        },
        atualizaVida: function () {
            if (NAVE) {
                var nave = NAVE.getNave();
                var dimensoesNave = NAVE.getDimensoes();
                var objNave = {
                    x: nave.x,
                    y: nave.y,
                    altura: dimensoesNave.altura,
                    largura: dimensoesNave.largura
                }
            }
            if (METEORO) {
                var meteoros = METEORO.getMeteoros();
                var dimensoesMeteoro = METEORO.getDimensoes();
            }

            for (var i = 0; i < meteoros.length; i++) {
                if (meteoros[i]) {
                    var objMeteoro = {
                        x: meteoros[i].x,
                        y: meteoros[i].y,
                        altura: dimensoesMeteoro.altura,
                        largura: dimensoesMeteoro.largura
                    }
                }

                //Se acontecer colisão
                if (RSC.verificarColisao(objNave, objMeteoro)) {
                    //remove meteoro
                    meteoros.splice(i, 1);
                    if (i > 0) {
                        i--;
                    }
                    //Atualiza vidas
                    if (--vidas > 0){
                        document.getElementById('vidas').innerHTML = "Vidas: " + vidas;
                    }else{
                        RSC.stopLoop();
                        alert("Sua pontuação foi "+pontuacao);
                        window.location = "index.html";
                    }
                    
                }
            }

        }
    }


})();