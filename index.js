addEventListener("DOMContentLoaded", () => {
    document.getElementById("BlackJack").addEventListener("click", () => {
        location.href = "juegos/blackjack.html"
    })
    document.getElementById("Caballos").addEventListener("click", () => {
        location.href = "juegos/caballos.html"
    })
    document.getElementById("Dado mentiroso").addEventListener("click", () => {
        location.href = "juegos/dadomentiroso.html"
    })
    document.getElementById("Banco").addEventListener("click", () => {
        location.href = "juegos/banco.html"
    })

    var Jugador;
    if(getJSONFromLocalStorage("jugador") != null){
        Jugador = getJSONFromLocalStorage("jugador")
    }else{
        Jugador = {
            cartas:[],
            deuda:0,
            dados:[],
            nombre:"J1",
            fichas:100
        }
        saveJSONToLocalStorage("jugador",Jugador)
    }
    document.getElementById("balance").innerHTML = Jugador.fichas
})