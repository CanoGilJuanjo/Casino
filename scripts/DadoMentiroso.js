addEventListener("DOMContentLoaded", function () {
    var Jugador = jugador();

    var Crupier = {
        dados:[]
    }

    //Obtenemos todos los elementos necesarios del DOM
    var tituloJugador = document.querySelector("#jugador")
    tituloJugador.innerHTML = "Jugador : "+Jugador.fichas+"F"
    var apostar = document.querySelector("#bet-button")
    var fichas = document.querySelector("#bet-amount")
    var tirarDados = document.querySelector("#tirarDados")
    tirarDados.disabled = true
    var apuestaTexto = document.querySelector("#apuestaTexto")
    var jugadorContainer = document.querySelector("#jugador-container")
    var crupierContainer = document.querySelector("#crupier-container")
    var mensaje;

    var datosAnteriores = false
    let numeroAnterior = 0
    let caraAnterior = 0



    document.querySelector("#volver").addEventListener("click",()=>{this.location.href = "../index.html"})

    apostar.addEventListener("click",()=>{
        if(fichas.value <= 0 || fichas.value == "" || fichas.value == null || isNaN(fichas.value) || fichas.value == undefined){
            alert("Debes apostar al menos 1 ficha")
        }else if(fichas.value > Jugador.fichas){
            alert("No tienes suficientes fichas")
        }else{
            Jugador.fichas -= parseInt(fichas.value)
            tituloJugador.innerHTML = "Jugador : "+Jugador.fichas+"F"
            tirarDados.disabled = false
            fichas.disabled = true
            apostar.disabled = true
        }
    })

    var turnoJugador = false

    var victoria = false

    let cara = caraAnterior
    let numeroDados = numeroAnterior
    tirarDados.addEventListener("click",()=>{
        if(!datosAnteriores){
            tirarDados.disabled = true
        
            //Generamos los dados del jugador y del crupier
            generarDados(Jugador)
            generarDados(Crupier)

            jugadorContainer.innerHTML = ""
            Jugador.dados.forEach(dado => {
                jugadorContainer.innerHTML += "<div class='dice'>"+dado+"</div>"
            });
            crupierContainer.innerHTML = ""
            Crupier.dados.forEach(dado => {
                crupierContainer.innerHTML += "<div class='dice'>?</div>"
            });
            
            //Guardamos los dados en el local storage para evitar que se pueda hacer trampa
            saveJSONToLocalStorage("jugador",Jugador)
        }
        
        if(!turnoJugador){
            turnoJugador = true
            //Empieza el Crupier haciendo su apuesta
            let apuestaCrupier = caraAnterior
            let numeroApuestaCrupier = numeroAnterior
            if(!datosAnteriores){
                apuestaCrupier = Math.floor(Math.random() * 6) + 1 //Genera un número aleatorio entre 1 y 6 para saber la cara del dado que el crupier va a apostar
                numeroApuestaCrupier = Math.floor(Math.random() * (Crupier.dados.length+Jugador.dados.length)) + 1 //Numero de dados que el crupier cree que hay de la cara que ha apostado
            }else{
                datosAnteriores = false
            }


            apuestaTexto.innerHTML = "El Crupier cree que hay "+ numeroApuestaCrupier+" dados de la cara "+apuestaCrupier
            apuestaTexto.innerHTML+= "<br><br><button id='mentira' class='btn btn-danger'>Miente</button>\t"
            apuestaTexto.innerHTML+= "<button id='verdad' class='btn btn-success'>Dice la verdad</button>"
            let miente = document.querySelector("#mentira")
            let verdad = document.querySelector("#verdad")
            miente.addEventListener("click",()=>{
                //Mostramos los dados del crupier
                crupierContainer.innerHTML = ""
                
                Crupier.dados.forEach(dado => {
                    crupierContainer.innerHTML += "<div class='dice'>"+dado+"</div>"
                });
    
                if(getNumeroDados(apuestaCrupier,Crupier.dados,Jugador.dados) != numeroApuestaCrupier){
                    //El crupier ha mentido y el jugador ha ganado
                    apuestaTexto.innerHTML = "El Crupier ha mentido, el jugador gana la ronda"
                    if(Crupier.dados.length == 1 || Jugador.dados.length == 1){
                        victoria = true
                    }
                    //Con esta funcion se reinicia la partida manteniendo los datos
                    resetearPartida(mensaje,Crupier,victoria)
                }else{
                    //El crupier dice la verdad y el jugador pierde
                    apuestaTexto.innerHTML = "El Crupier dice la verdad, el jugador pierde la ronda"
                    if(Crupier.dados.length == 1 || Jugador.dados.length == 1){
                        victoria = true
                    }
                    resetearPartida(mensaje,Jugador,victoria)
                }
            })

            verdad.addEventListener("click",()=>{
                datosAnteriores = true
                numeroAnterior = numeroApuestaCrupier
                caraAnterior = apuestaCrupier
                //Creamos un evento CLICK para que se vuelva a ejecutar el codigo de tirarDados
                var eventoTirarDados = new MouseEvent("click")
                tirarDados.dispatchEvent(eventoTirarDados)
            })
        }else if(turnoJugador){
            turnoJugador = false
            cara = caraAnterior
            numeroDados = numeroAnterior
            if(!datosAnteriores){
                apuestaTexto.innerHTML = "Turno del jugador:<br><input type='number' placeholder='Cara'>\t <input type='number' placeholder='Numero de dados'>\t <button id='jugar' class='btn btn-primary'>Jugar</button>"
                cara = document.querySelectorAll("input[type='number']")[1]
                numeroDados = document.querySelectorAll("input[type='number']")[2]
            }else{
                apuestaTexto.innerHTML = "Turno del jugador:<br>"+caraAnterior+"\t <input type='number' placeholder='Numero de dados' value='"+numeroAnterior+"' min='"+numeroAnterior+"'>\t <button id='jugar' class='btn btn-primary'>Jugar</button>"
                numeroDados = document.querySelectorAll("input[type='number']")[1]
            }
            
            let botonJugar = document.querySelector("#jugar")
            botonJugar.addEventListener("click",()=>{
                if(typeof cara == "object"){
                    cara = cara.value
                }
                if(typeof numeroDados == "object"){
                    numeroDados = numeroDados.value
                }
                
                if((cara <= 0 && cara > 6) || cara == "" || cara == null || isNaN(cara) || cara == undefined){
                    alert("La cara del dado debe ser un número entre 1 y 6")
                }else if((numeroDados <= 0 && numeroDados > (Jugador.dados.length+Crupier.dados.length)) || numeroDados == "" || numeroDados == null || isNaN(numeroDados) || numeroDados == undefined){
                    alert("El número de dados debe ser un número entre 1 y "+(Jugador.dados.length+Crupier.dados.length))
                }else{
                    //Tenemos que comprobar si el jugador dice o no la verdad
                    let verdad = true
                    if(getNumeroDados(parseInt(cara),Crupier.dados,Jugador.dados) != parseInt(numeroDados)){
                        verdad = false
                    }
                    //El crupier se creera el 50% de las apuestas que haga el jugador
                    if(((cara != Crupier.dados[0] && Jugador.dados.length <= 3 && Crupier.dados.length == 1)||(numeroDados > Jugador.dados.length && cara != Crupier.dados[0])) && Crupier.dados.length == 1){
                        //El crupier no cree la apuesta del jugador
                        //Mostramos los dados del crupier
                        crupierContainer.innerHTML = ""
                        
                        Crupier.dados.forEach(dado => {
                            crupierContainer.innerHTML += "<div class='dice'>"+dado+"</div>"
                        });
                        if(verdad){
                            //El jugador ha ganado
                            apuestaTexto.innerHTML = "El jugador ha ganado, el crupier no cree que haya "+ numeroDados+" dados de la cara "+cara
                            Jugador.fichas += parseInt(fichas.value)*2
                            tituloJugador.innerHTML = "Jugador : "+Jugador.fichas+"F"
                            //Guardamos los dados en el local storage para evitar que se pueda hacer trampa
                            saveJSONToLocalStorage("jugador",Jugador)
                        }else{
                            apuestaTexto.innerHTML = "El jugador ha perdido, el crupier cree que hay "+ numeroDados+" dados de la cara "+cara
                            apostar.disabled = false
                            fichas.disabled = false
                            tirarDados.disabled = true
                            //Guardamos los dados en el local storage para evitar que se pueda hacer trampa
                            saveJSONToLocalStorage("jugador",Jugador)
                        }
                    }else if(Math.floor(Math.random()*3) == 0){ // 1/3 de las veces el crupier cree al jugador
                        //El crupier cree la apuesta del jugador
                        caraAnterior = parseInt(cara) 
                        numeroAnterior = Math.floor(Math.random() * ((Crupier.dados.length+Jugador.dados.length)-parseInt(numeroDados)+1)) + parseInt(numeroDados) //Numero de dados que el crupier cree que hay de la cara que ha apostado
                        datosAnteriores = true

                        //Creamos un evento CLICK para que se vuelva a ejecutar el codigo de tirarDados
                        var eventoTirarDados = new MouseEvent("click")
                        tirarDados.dispatchEvent(eventoTirarDados)
                    }else{
                        //El crupier no cree la apuesta del jugador
                        //Mostramos los dados del crupier
                        crupierContainer.innerHTML = ""
                        
                        Crupier.dados.forEach(dado => {
                            crupierContainer.innerHTML += "<div class='dice'>"+dado+"</div>"
                        });
                        if(verdad){
                            //El jugador ha ganado
                            apuestaTexto.innerHTML = "El jugador ha ganado, el crupier no cree que haya "+ numeroDados+" dados de la cara "+cara
                            if(Crupier.dados.length == 1 || Jugador.dados.length == 1){
                                victoria = true
                            }
                            resetearPartida(mensaje,Crupier,victoria)
                        }else{
                            apuestaTexto.innerHTML = "El jugador ha perdido, el crupier no cree que haya "+ numeroDados+" dados de la cara "+cara
                            if(Crupier.dados.length == 1 || Jugador.dados.length == 1){
                                victoria = true
                            }
                            resetearPartida(mensaje,Jugador,victoria)
                        }
                    }
                    
                }
            })
        }
        
    })

    function resetearPartida(mensaje,Persona,victoria){
        if(!victoria){
            setTimeout(()=>{
                let contador = 5;
                mensaje = setInterval(()=>{
                    apuestaTexto.innerHTML = "Se reinicia la partida en "+ contador+" segundos"
                    contador--;
                },1000)
            },2000)
            //Le quitamos un dado al crupier
            Persona.dados.pop()
                                
            //Reseteamos los dados visibles
            setTimeout(()=>{
                tirarDados.disabled = false
                jugadorContainer.innerHTML = ""
                crupierContainer.innerHTML = ""
                Jugador.dados.forEach(dado => {
                    jugadorContainer.innerHTML += "<div class='dice'>?</div>"
                });
                Crupier.dados.forEach(dado => {
                    crupierContainer.innerHTML += "<div class='dice'>?</div>"
                });
                clearInterval(mensaje)
                apuestaTexto.innerHTML = ""
            },8000)
        }else{
            //Reseteamos todos los datos
            victoria = false
            datosAnteriores = false
            numeroAnterior = 0
            caraAnterior = 0
            tirarDados.disabled = true
            fichas.disabled = false
            apostar.disabled = false
            Jugador.dados = []
            Crupier.dados = []
            jugadorContainer.innerHTML = ""
            crupierContainer.innerHTML = ""
            for(let i = 0; i < 5; i++){
                jugadorContainer.innerHTML += "<div class='dice'>?</div>"
                crupierContainer.innerHTML += "<div class='dice'>?</div>"
            }
            if(Persona == Jugador){
                apuestaTexto.innerHTML = "Has perdido la partida"
            }else{
                Jugador.fichas += parseInt(fichas.value)*2
                tituloJugador.innerHTML = "Jugador : "+Jugador.fichas+"F"
                savejSONToLocalStorage("jugador",Jugador)
                apuestaTexto.innerHTML = "Has ganado la partida"
            }
            
        } 
    }

    function generarDados(Persona){
        if(Persona.dados.length == 0){
            for(let i = 0; i < 5; i++){
                Persona.dados.push(Math.floor(Math.random() * 6) + 1) //Genera un número aleatorio entre 1 y 6
            }
        }else{
            for(let i = 0; i < Persona.dados.length; i++){
                Persona.dados[i] = Math.floor(Math.random() * 6) + 1 //Genera un número aleatorio entre 1 y 6
            }
        }
    }

    function getNumeroDados(numero,dadosCrupier,dadosJugador){
        let contador = 0;
        dadosCrupier.forEach(dado => {
            if(dado == numero){
                contador++;
            }
        });
        dadosJugador.forEach(dado => {
            if(dado == numero){
                contador++;
            }
        });
        return contador;
    }
})