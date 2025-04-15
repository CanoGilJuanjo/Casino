addEventListener("DOMContentLoaded", () => {
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
    var caballoApuesta1 = document.querySelector("#caballoApuesta1")
    var caballoApuesta2 = document.querySelector("#caballoApuesta2")
    var caballoApuesta3 = document.querySelector("#caballoApuesta3")
    var caballo1 = document.querySelector(".caballo1")
    var caballo2 = document.querySelector(".caballo2")
    var caballo3 = document.querySelector(".caballo3")
    var apuesta = document.querySelector("#bet-button")
    var fichas = document.querySelector("#bet-amount")
    var jugar = document.querySelector("#start-race")
    var textoApuesta = document.querySelector("#textoApuesta")
    var tituloJugador = document.querySelector("#jugador")
    tituloJugador.innerHTML = "Jugador : "+Jugador.fichas+"F"

    jugar.disabled = true
    caballoApuesta1.disabled = false
    caballoApuesta2.disabled = false
    caballoApuesta3.disabled = false

    var caballoApostado;

    caballoApuesta1.addEventListener("click",()=>{
        caballoApuesta1.disabled = false
        caballoApuesta2.disabled = true
        caballoApuesta3.disabled = true
        caballoApostado = caballoApuesta1
    })

    caballoApuesta2.addEventListener("click",()=>{
        caballoApuesta2.disabled = false
        caballoApuesta1.disabled = true
        caballoApuesta3.disabled = true
        caballoApostado = caballoApuesta2
    })

    caballoApuesta3.addEventListener("click",()=>{
        caballoApuesta3.disabled = false
        caballoApuesta2.disabled = true
        caballoApuesta1.disabled = true
        caballoApostado = caballoApuesta3
    })


    apuesta.addEventListener("click",()=>{
        if(fichas.value != null && fichas.value != undefined && caballoApuesta1.disabled||caballoApuesta2.disabled||caballoApuesta3.disabled){
            jugar.disabled = false
            fichas.disabled = true
            apuesta.disabled = true
            textoApuesta.innerHTML = "Apuesta: "+fichas.value+" fichas al caballo "+caballoApostado.childNodes[3].innerHTML
            Jugador.fichas -= parseInt(fichas.value)
            tituloJugador.innerHTML = "Jugador : "+Jugador.fichas+"F"
        }else if(fichas.value == null || fichas.value == undefined){
            alert("Introduce una cantidad de fichas")
        }else if(!caballoApuesta1.disabled&&!caballoApuesta2.disabled&&!caballoApuesta3.disabled){
            alert("Selecciona un caballo")
        }
    })
    var intervalCaballo1,intervalCaballo2,intervalCaballo3;
    jugar.addEventListener("click",()=>{
        jugar.disabled = true
        caballo1.style.marginLeft = 0+"px"
        caballo2.style.marginLeft = 0+"px"
        caballo3.style.marginLeft = 0+"px"
        
        intervalCaballo1 = setInterval(()=>{
            caballo1.style.marginLeft = (parseInt(caballo1.style.marginLeft)+Math.floor(Math.random()*100))+"px"
            if((parseInt(caballo1.style.marginLeft)+parseInt(caballo1.clientWidth)) >= parseInt(document.querySelector(".carrera").clientWidth)){
                clearInterval(intervalCaballo3)
                clearInterval(intervalCaballo2)
                clearInterval(intervalCaballo1)
                if(caballoApostado.childNodes[3].innerHTML == "🐴"){
                    Jugador.fichas += parseInt(fichas.value)*2  
                    textoApuesta.innerHTML = "Ganas "+fichas.value*2+" fichas";
                }else{
                    textoApuesta.innerHTML = "Pierdes "+fichas.value+" fichas";
                }
                actualizarDatos()
            }
        },300)
        intervalCaballo2 = setInterval(()=>{
            caballo2.style.marginLeft = (parseInt(caballo2.style.marginLeft)+Math.floor(Math.random()*100))+"px"
            if((parseInt(caballo2.style.marginLeft)+parseInt(caballo2.clientWidth)) >= parseInt(document.querySelector(".carrera").clientWidth)){
                clearInterval(intervalCaballo3)
                clearInterval(intervalCaballo2)
                clearInterval(intervalCaballo1)
                if(caballoApostado.childNodes[3].innerHTML == "🦄"){
                    Jugador.fichas += parseInt(fichas.value)*2  
                    textoApuesta.innerHTML = "Ganas "+fichas.value*2+" fichas";
                }else{
                    textoApuesta.innerHTML = "Pierdes "+fichas.value+" fichas";
                }
                actualizarDatos()
            }
        },300)
        intervalCaballo3 = setInterval(()=>{
            caballo3.style.marginLeft = (parseInt(caballo3.style.marginLeft)+Math.floor(Math.random()*100))+"px"
            if((parseInt(caballo3.style.marginLeft)+parseInt(caballo3.clientWidth)) >= (parseInt(document.querySelector(".carrera").clientWidth))){
                clearInterval(intervalCaballo3)
                clearInterval(intervalCaballo2)
                clearInterval(intervalCaballo1)
                if(caballoApostado.childNodes[3].innerHTML == "🦓"){
                    Jugador.fichas += parseInt(fichas.value)*2  
                    textoApuesta.innerHTML = "Ganas "+fichas.value*2+" fichas";
                }else{
                    textoApuesta.innerHTML = "Pierdes "+fichas.value+" fichas";
                }
                actualizarDatos()
            }
        },300)
    })
    
    function actualizarDatos(){
        tituloJugador.innerHTML = "Jugador : "+Jugador.fichas+"F"
        saveJSONToLocalStorage("jugador",Jugador)
        setTimeout(()=>{
            caballo1.style.marginLeft = 0+"px"
            caballo2.style.marginLeft = 0+"px"
            caballo3.style.marginLeft = 0+"px"
            apuesta.disabled = false
            fichas.disabled = false
            caballoApuesta1.disabled = false
            caballoApuesta2.disabled = false
            caballoApuesta3.disabled = false
        },3000)
    }
    document.querySelector("#volver").addEventListener("click",()=>{this.location.href = "../index.html"})
})