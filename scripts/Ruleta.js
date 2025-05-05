addEventListener('DOMContentLoaded', function() {
    var Jugador = jugador();

    var ruleta = document.getElementById("girar");
    ruleta.disabled = true;

    var resetear = document.getElementById("resetear");
    resetear.disabled = true;

    var cantidadApuesta = document.getElementById("bet-amount");
    var botonApuesta = document.getElementById("bet-button");
    var tituloJugador = document.getElementById("tituloJugador");
    tituloJugador.innerHTML = "Jugador: "+Jugador.fichas + "F";
    var cuadradoRojo, cuadradoVerde, cuadradoAzul, cuadradoAmarillo;
    cuadradoRojo = document.getElementById("red");
    cuadradoVerde = document.getElementById("green");
    cuadradoAzul = document.getElementById("blue");
    cuadradoAmarillo = document.getElementById("yellow");

    cuadradoRojo.style.backgroundColor = "red"
    cuadradoVerde.style.backgroundColor = "green"
    cuadradoAzul.style.backgroundColor = "blue"
    cuadradoAmarillo.style.backgroundColor = "yellow"

    var botonSeleccionado = null;
    var result = document.getElementById('result');

    //Si seleccionamos un cuadrado, el resto se tienen que quitar
    cuadradoRojo.addEventListener("click", ()=>{
        if(botonSeleccionado == null){
            cuadradoVerde.style.backgroundColor = "rgb(35, 34, 34)"
            cuadradoAzul.style.backgroundColor = "rgb(35, 34, 34)"
            cuadradoAmarillo.style.backgroundColor = "rgb(35, 34, 34)"
            botonSeleccionado = cuadradoRojo;
            resetear.disabled = false;
        }
    })
    cuadradoVerde.addEventListener("click", ()=>{
        if(botonSeleccionado == null){
            cuadradoRojo.style.backgroundColor = "rgb(35, 34, 34)"
            cuadradoAzul.style.backgroundColor = "rgb(35, 34, 34)"
            cuadradoAmarillo.style.backgroundColor = "rgb(35, 34, 34)"
            botonSeleccionado = cuadradoVerde;
            resetear.disabled = false;
        }
    })
    cuadradoAzul.addEventListener("click", ()=>{
        if(botonSeleccionado == null){
            cuadradoVerde.style.backgroundColor = "rgb(35, 34, 34)"
            cuadradoRojo.style.backgroundColor = "rgb(35, 34, 34)"
            cuadradoAmarillo.style.backgroundColor = "rgb(35, 34, 34)"
            botonSeleccionado = cuadradoAzul;
            resetear.disabled = false;
        }
    })
    cuadradoAmarillo.addEventListener("click", ()=>{
        if(botonSeleccionado == null){
            cuadradoRojo.style.backgroundColor = "rgb(35, 34, 34)"
            cuadradoAzul.style.backgroundColor = "rgb(35, 34, 34)"
            cuadradoVerde.style.backgroundColor = "rgb(35, 34, 34)"
            botonSeleccionado = cuadradoAmarillo;
            resetear.disabled = false;
        }
    })
    
    botonApuesta.addEventListener("click", ()=>{
        if(botonSeleccionado == null){
            alert("Selecciona un color para apostar")
        }else if(cantidadApuesta.value == "" || cantidadApuesta.value <= 0 || cantidadApuesta.value > Jugador.fichas){
            alert("Introduce una cantidad de fichas válida")
        }else{
            Jugador.fichas -= cantidadApuesta.value;
            tituloJugador.innerHTML = "Jugador: "+Jugador.fichas + "F";
            ruleta.disabled = false;
            botonApuesta.disabled = true;
            resetear.disabled = true;
            result.innerHTML = "Has apostado " + cantidadApuesta.value + "F en el color ";
            switch (botonSeleccionado) {
                case cuadradoRojo:
                    result.innerHTML += "Rojo";
                    break;
                case cuadradoVerde:
                    result.innerHTML += "Verde";
                    break;
                case cuadradoAzul:
                    result.innerHTML += "Azul";
                    break;
                case cuadradoAmarillo:
                    result.innerHTML += "Amarillo";
                    break;
            }
            cantidadApuesta.disabled = true
            saveJSONToLocalStorage("jugador", Jugador);
        }
    })

    resetear.addEventListener("click", ()=>{
        cuadradoRojo.style.backgroundColor = "red"
        cuadradoVerde.style.backgroundColor = "green"
        cuadradoAzul.style.backgroundColor = "blue"
        cuadradoAmarillo.style.backgroundColor = "yellow"
        botonSeleccionado = null;
        resetear.disabled = true;
    })

    ruleta.addEventListener("click",()=>{
        const wheel = document.getElementById('wheel');
        const randomDegree = Math.floor(Math.random() * 360);
        const sectors = ['Rojo', 'Verde', 'Azul', 'Amarillo'];
        var sectores = ['red', 'green', 'blue', 'yellow'];
        const adjustedDegree = (randomDegree + 90) % 360;
        var sectorIndex = Math.floor(adjustedDegree / 90);

        if(sectorIndex == 1){
            sectorIndex = 3
        }else if(sectorIndex == 3){
            sectorIndex = 1
        }
    
        wheel.style.transition = 'transform 3s ease-out';
        wheel.style.transform = `rotate(${3600+randomDegree}deg)`;
    
        setTimeout(() => {
            result.textContent = `¡Cayó en ${sectors[sectorIndex]}!`;
            if(botonSeleccionado.style.backgroundColor == sectores[sectorIndex]){
                result.textContent += " has ganado "+cantidadApuesta.value * 2+"F"
                Jugador.fichas += cantidadApuesta.value * 2;
                saveJSONToLocalStorage("jugador", Jugador);
            }else{
                result.textContent += " has perdido"
            }
            wheel.style.transition = 'none';
            wheel.style.transform = `rotate(${randomDegree}deg)`;
            tituloJugador.innerHTML = "Jugador: "+Jugador.fichas + "F";
            ruleta.disabled = true
            var eventoClick = new MouseEvent("click")
            resetear.dispatchEvent(eventoClick);
            cantidadApuesta.disabled = false
            botonApuesta.disabled = false
        }, 3000);
    })



    document.querySelector("#volver").addEventListener("click",()=>{this.location.href = "../index.html"})
})