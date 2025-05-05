addEventListener("DOMContentLoaded",function(){
    var Jugador = jugador();
    var Crupier={
        cartas:[],
        puntos:()=>{
            let puntos = 0;
            let numeroAces = 0;

            for(let carta of Crupier.cartas){
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
    }

    let textoCrupier = document.querySelector("#crupier")
    let textoJugador = document.querySelector("#jugador")
    let pedir = document.querySelector("#pedir")
    pedir.disabled  =  true
    let pasar = document.querySelector("#pasar")
    pasar.disabled  =  true
    let jugar = document.querySelector("#jugar")
    let fichas = document.querySelector("#fichas")
    let apuesta = document.querySelector("#apuesta")
    let tituloJugador = document.querySelector("#tituloJugador")
    tituloJugador.innerHTML = "Jugador: "+Jugador.fichas+"F"
    let cartaCrupier = document.querySelector(".cartaCrupier")
    let cartaJugador = document.querySelector(".cartaJugador")

    var aPrimera = false;

    jugar.addEventListener("click",()=>{
        //Reiniciamos las cartas para la siguiente ronda
        Jugador.cartas = []
        Crupier.cartas = []
        cartaCrupier.innerHTML = ""
        cartaJugador.innerHTML = ""
        Baraja.generarCartas()
        Baraja.mezclarCartas()

        if(Jugador.fichas < fichas.value){
            apuesta.innerHTML = "No tiene tanto dinero, baje la apuesta"
        }else
        if(fichas.value != null && fichas.value != undefined && fichas.value>0){
            jugar.disabled = true
            fichas.disabled = true
            pasar.disabled = false
            pedir.disabled = false

            //Quitamos las fichas al jugador
            Jugador.fichas -= fichas.value
            tituloJugador.innerHTML = Jugador.fichas+"F"
            saveJSONToLocalStorage("jugador",Jugador)

            //Repartimos las primeras cartas
            Jugador.cartas.push(Baraja.repartirCarta())
            Crupier.cartas.push(Baraja.repartirCarta())
            for(let carta of Crupier.cartas){
                if(carta.valor == 1){
                    cartaCrupier.innerHTML +="<p>A"+carta.palo+"</p>"
                }else{
                    cartaCrupier.innerHTML +="<p>"+carta.valor+carta.palo+"</p>"
                }               
            }
            Jugador.cartas.push(Baraja.repartirCarta())
            Crupier.cartas.push(Baraja.repartirCarta())

            for(let carta of Jugador.cartas){
                if(carta.valor == 1){
                    cartaJugador.innerHTML +="<p>A"+carta.palo+"</p>"
                }else{
                    cartaJugador.innerHTML +="<p>"+carta.valor+carta.palo+"</p>"
                }               
            }
            
            //Mostramos los resultados de repartir las cartas
            if(Crupier.cartas[0].valor == 1){
                textoCrupier.innerHTML = "A+? puntos"//Una de las cartas del Crupier es secreta
            }else{
                textoCrupier.innerHTML = Crupier.cartas[0].valor+"+? puntos"//Una de las cartas del Crupier es secreta
            }
            textoJugador.innerHTML = Jugador.puntos()+" puntos"
            apuesta.innerHTML = "Apuesta: "+fichas.value

            if(Jugador.puntos() == 21){
                aPrimera = true
                pasarEvent()
            }

            if(Crupier.puntos() == 21){
                aPrimera = true
                pasarEvent()
            }

        }else if(Jugador.fichas == 0){
            jugar.disabled = true
            fichas.disabled = true
            apuesta.innerHTML = "No tiene dinero, vuelva cuando tenga dinero para apostar"
        }else{
            alert("Tiene que apostar alguna ficha para poder jugar")
        }
    })

    
    
    pedir.addEventListener("click",()=>{
        if(Jugador.puntos() <= 21){
            Jugador.cartas.push(Baraja.repartirCarta())
            if(Jugador.puntos()>21){
                textoJugador.innerHTML = Jugador.puntos()+" puntos"
                textoCrupier.innerHTML = Crupier.puntos()+" puntos"
                apuesta.innerHTML = "Pierdes "+fichas.value+" fichas"
                pedir.disabled  =  true
                pasar.disabled  =  true
                jugar.disabled =   false
                fichas.disabled = false;
                cartaCrupier.innerHTML = ""
                for(let carta of Crupier.cartas){
                    if(carta.valor == 1){
                        cartaCrupier.innerHTML +="<p>A"+carta.palo+"</p>"
                    }else{
                        cartaCrupier.innerHTML +="<p>"+carta.valor+carta.palo+"</p>"
                    }               
                }
            }else{
                textoJugador.innerHTML = Jugador.puntos()+" puntos"
            } 
        }

        cartaJugador.innerHTML = ""
        for(let carta of Jugador.cartas){
            if(carta.valor == 1){
                cartaJugador.innerHTML +="<p>A"+carta.palo+"</p>"
            }else{
                cartaJugador.innerHTML +="<p>"+carta.valor+carta.palo+"</p>"
            }               
        }
    })

    pasar.addEventListener("click",pasarEvent)

    function pasarEvent(){
        pasar.disabled = true
        fichas.disabled = false;
        pedir.disabled = true
        jugar.disabled = false

        while(Crupier.puntos()<=Jugador.puntos() && Crupier.puntos()<17 && !aPrimera){
            Crupier.cartas.push(Baraja.repartirCarta())
        }

        cartaCrupier.innerHTML = ""
        for(let carta of Crupier.cartas){
            if(carta.valor == 1){
                cartaCrupier.innerHTML +="<p>A"+carta.palo+"</p>"
            }else{
                cartaCrupier.innerHTML +="<p>"+carta.valor+carta.palo+"</p>"
            }               
        }

        textoCrupier.innerHTML = Crupier.puntos()+" puntos"

        if((Jugador.puntos() > Crupier.puntos() && Jugador.puntos()<= 21 && Crupier.puntos() < 21)||
        (Crupier.puntos()>21 && Jugador.puntos()<=21)){
            apuesta.innerHTML = "Ganas "+fichas.value*2+" fichas"
            Jugador.fichas += fichas.value*2
        }else if((Crupier.puntos()>Jugador.puntos() && Crupier.puntos()<= 21 && Jugador.puntos()<21)||
        (Jugador.puntos()>21 && Crupier.puntos()<=21)){
            apuesta.innerHTML = "Pierdes "+fichas.value+" fichas"
        }else if(Crupier.puntos() == Jugador.puntos()){
            apuesta.innerHTML = "Empate "+fichas.value+" fichas"
            Jugador.fichas += fichas.value*1
        }else{
            apuesta.innerHTML = "ERROR"
            Jugador.fichas += fichas.value*1
        }
        textoJugador.innerHTML = Jugador.puntos()+" puntos"
        tituloJugador.innerHTML = "Jugador: "+Jugador.fichas+"F"
        saveJSONToLocalStorage("jugador",Jugador)
    }
    document.querySelector("#volver").addEventListener("click",()=>{this.location.href = "../index.html"})
})