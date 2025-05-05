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

    document.getElementById("Ruleta").addEventListener("click", () => {
        location.href = "juegos/ruleta.html"
    })

    var Jugador = jugador();
    document.getElementById("balance").innerHTML = Jugador.fichas
})