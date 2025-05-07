addEventListener("DOMContentLoaded", ()=>{
    var Jugador = jugador();

    var tituloJugador = document.querySelector("#jugador")
    tituloJugador.innerHTML = "Jugador : "+Jugador.fichas+"F"
    var devolver = document.querySelector("#devolver")
    var cantidad = document.querySelector("#cantidad")
    var pedir = document.querySelector("#pedir")
    pedir.disabled = true
    let deuda;
    var pagarDeuda = document.querySelector("#pagarDeuda")
    var tituloDeuda = document.querySelector("#tituloDeuda")
    tituloDeuda.innerHTML = "Deuda: "+Jugador.deuda+"F"

    if(Jugador.deuda == 0){
        pagarDeuda.disabled = true
    }

    cantidad.addEventListener("keyup",()=>{
        if(cantidad.value != null && cantidad.value != "" && parseInt(cantidad.value) <= 1000){
            deuda = (parseInt(cantidad.value)+parseInt(cantidad.value)*0.1);
            devolver.innerHTML = "Tendra que devolver: "+deuda+"F"
            pedir.disabled = false
        }else if(parseInt(cantidad.value) > 1000){
            document.querySelector("#resultado").innerHTML = "La cantidad de fichas supera el maximo de 1000F"
            pedir.disabled = true
        }else{
            pedir.disabled = true
            document.querySelector("#resultado").innerHTML = ""
            devolver.innerHTML = "Tendra que devolver: "+0+"F"
        }
    })

    pedir.addEventListener("click",()=>{
        if(Jugador.deuda == 0){
            Jugador.deuda = deuda;
            Jugador.fichas += parseInt(cantidad.value);
            saveJSONToLocalStorage("jugador",Jugador)
            document.querySelector("#resultado").innerHTML = "Se han añadido: "+parseInt(cantidad.value)+"F a su cuenta. No podra pedir más fichas hasta devolver la deuda."
            tituloJugador.innerHTML = "Jugador : "+Jugador.fichas+"F"
            tituloDeuda.innerHTML = "Deuda: "+Jugador.deuda+"F"
            pagarDeuda.disabled = false
        }else{
            document.querySelector("#resultado").innerHTML = "Tiene una deuda pendiente, pagela para recibir más fichas"
        }
    })


    pagarDeuda.addEventListener("click",()=>{
        if(Jugador.fichas < Jugador.deuda){
            document.querySelector("#resultado").innerHTML = "No tiene suficientes fichas para pagar la deuda"
        }else{
            Jugador.fichas -= Jugador.deuda;
            Jugador.deuda = 0;
            saveJSONToLocalStorage("jugador",Jugador)
            document.querySelector("#resultado").innerHTML = "Deuda pagada, ahora puede pedir más fichas"
            tituloJugador.innerHTML = "Jugador : "+Jugador.fichas+"F"
            tituloDeuda.innerHTML = "Deuda: "+Jugador.deuda+"F"
            pagarDeuda.disabled = true
        }
    })

    document.querySelector("#volver").addEventListener("click",()=>{this.location.href = "../index.html"})
})