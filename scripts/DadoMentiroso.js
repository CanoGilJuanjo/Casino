addEventListener("DOMContentLoaded", function () {
    var Jugador;
    if(getJSONFromLocalStorage("jugador") != null){
        Jugador = getJSONFromLocalStorage("jugador")
        Jugador.puntos = ()=>{
            let puntos = 0;
            for(let carta of Jugador.cartas){
                puntos += carta.valor
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
                for(let carta of Jugador.cartas){
                    puntos += carta.valor
                }
                return puntos;
            },
            nombre:"J1",
            fichas:100
        }
    }

    //Obtenemos todos los elementos necesarios del DOM
    var tituloJugador = document.querySelector("#jugador")
    tituloJugador.innerHTML = "Jugador : "+Jugador.fichas+"F"
    var apostar = document.querySelector("#bet-button")
    var fichas = document.querySelector("#bet-amount")
    var tirarDados = document.querySelector("#tirarDados")
    tirarDados.disabled = true

    document.querySelector("#volver").addEventListener("click",()=>{this.location.href = "../index.html"})
})