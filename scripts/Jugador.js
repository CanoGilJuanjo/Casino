function jugador(){
    var Jugador;
    if(getJSONFromLocalStorage("jugador") != null){
        Jugador = getJSONFromLocalStorage("jugador")
        Jugador.puntos=()=>{
            let puntos = 0;
            let numeroAces = 0;

            for(let carta of Jugador.cartas){
                if(carta.valor == 1){
                    puntos += 11;
                    numeroAces++;
                } else {
                    puntos += carta.valor;
                }
            }

            while(puntos > 21 && numeroAces > 0){
                puntos -= 10;
                numeroAces--;
            }

            return puntos;
        }
    }else{
        Jugador={
            cartas:[],
            deuda:0,
            dados:[],
            puntos:()=>{
                let puntos = 0;
                let numeroAces = 0;
    
                for(let carta of Jugador.cartas){
                    if(carta.valor == 1){
                        puntos += 11;
                        numeroAces++;
                    } else {
                        puntos += carta.valor;
                    }
                }
    
                while(puntos > 21 && numeroAces > 0){
                    puntos -= 10;
                    numeroAces--;
                }
                
                return puntos;
            },
            fichas:100
        }
        saveJSONToLocalStorage("jugador",Jugador)
    }
    return Jugador;
}