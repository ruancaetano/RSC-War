//Script com funcionalidades da arma da nave
var ARMA = (function(){
    "use strict";

    var tiros = [];
    var nave = NAVE.getNave();
    var ALTURA_BALA = 60;
    var LARGURA_BALA = 30;
    return {

        atirar : function (){
            tiros.push({x : nave.x + 25 , y : nave.y - 20})
        },
        atualizarTiros : function (){
            for (var i = 0 ; i < tiros.length ; i++){
                if (tiros[i].y <= 0){
                    tiros.shift();
                    if (i > 0){
                        i--;
                    }                    
                }else{
                    tiros[i].y -=10;
                }
            }   
        },
        desenharTiros : function (ctx){
           
            
            for (var i = 0 ; i < tiros.length ; i++){
                var img = new Image();
                img.src = "img/bala.png";
                ctx.drawImage(img,tiros[i].x,tiros[i].y);              
            }
        },
        getTiros : function (){
            return tiros;
        },
        getDimensoes : function (){
            return {altura : ALTURA_BALA, largura : LARGURA_BALA};
        }
    }

})();