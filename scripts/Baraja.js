var Baraja = {
    cartas:[],
    generarCartas:generarCartas=>{
        //Limpiamos lo que haya en un inicio en el array de cartas, para luego rellenar
        Baraja.cartas = [];
        //Tenemos 52 cartas A (1,11),2,3,4,5,6,7,8,9,10,J(10),Q(10),K(10)
        /**
         * PALOS
         * CORAZON
         * PICA
         * TREBOL
         * ROMBO
         * 
         * Cartas del 1 al 13
         */
        for(let i = 1; i<=52 ; i++){
            let valor,palo;
            if(i<=13){ 
                palo="♥️"
                valor=i
                if(valor > 10){
                    valor = 10
                }
            }else if(i<=26){
                palo="♠️"
                valor=i-13
                if(valor > 10){
                    valor = 10
                }
            }else if(i<=39){
                palo="♣️"
                valor=i-26
                if(valor > 10){
                    valor = 10
                }
            }else if(i<=52){
                palo="♦️"
                valor=i-39
                if(valor > 10){
                    valor = 10
                }
            }
            Baraja.cartas.push(Carta={valor:valor,palo:palo})
        }
    },
    mezclarCartas:mezclarCartas=>{
        let contador  = 0;
        while(contador<52){//Contador 52 veces
            let indexTemp =  Math.floor(Math.random()*Baraja.cartas.length);
            let indexTemp2 = Math.floor(Math.random()*Baraja.cartas.length);
           
            let cartaTemp = Baraja.cartas[indexTemp]
            Baraja.cartas[indexTemp] = Baraja.cartas[indexTemp2]
            Baraja.cartas[indexTemp2] = cartaTemp
            contador++  
        }
    },
    repartirCarta:repartirCarta=>{
        return Baraja.cartas.splice(0,1)[0]
    }
}