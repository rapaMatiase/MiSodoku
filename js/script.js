
        

        /* CONSTANTES  */
        const VALOR_VACIO = 0
        const VALOR_INICIAL = 1
        const VALOR_MAXIMO = 3
        /* VARIABLES GLOBALES */
        let tableroSodoku = [
            [VALOR_VACIO,1,3],
            [2,VALOR_VACIO,1],
            [3,1,VALOR_VACIO]
        ]
        //GameOver por defualt es false porque el jeugo no puede terminar antes de comenzar.
        let gameOver = false 

        function llegoAlValorLimiteDeUnaCasilla(i,j){
            return tableroSodoku[i][j] < VALOR_MAXIMO
        }

        function volverAlValorIncial(i,j){
            tableroSodoku[i][j] = VALOR_INICIAL
        }

        function addNumber(i, j){
            if(llegoAlValorLimiteDeUnaCasilla(i,j) == true){
                tableroSodoku[i][j]++
            }else{
                volverAlValorIncial(i,j)
            }
        }
        
        function hayRepetidosEnLaFila(fila){
            //Controlo solo un array, entonces solo tengo una dimension.
            return fila[0] == fila[1] || fila[0] == fila[2] || fila[1] == fila[2] || fila[0] == VALOR_VACIO || fila[1] == VALOR_VACIO || fila[2] == VALOR_VACIO 
        }

        function noHayRepetidosEnLaFila(fila){
            return !hayRepetidosEnLaFila(fila)
        }

        function hayRepetidosEnAlgunaFila(){
            let banderaSinRepetidosEnLasFilas = true
            for (let i = 0; i < tableroSodoku.length; i++) {
                    banderaSinRepetidosEnLasFilas = noHayRepetidosEnLaFila(tableroSodoku[i])
            }
            return banderaSinRepetidosEnLasFilas
        }

        function hayRepetidoEnLaColumna(j){
            return tableroSodoku[0][j] == tableroSodoku[1][j] || tableroSodoku[0][j] == tableroSodoku[2][j] || tableroSodoku[1][j] == tableroSodoku[2][j] || tableroSodoku[0][j] == VALOR_VACIO || tableroSodoku[1][j] == VALOR_VACIO || tableroSodoku[2][j] == VALOR_VACIO
        }

        function noHayRepetidosEnLaColumna(j){
            return !hayRepetidoEnLaColumna(j)
        }

        function hayRepetidosEnAlgunaColumna(){
            let banderaSinRepetidosEnLasColumnas = true
            for (let j = 0; j < tableroSodoku.length; j++) {
                banderaSinRepetidosEnLasColumnas = noHayRepetidosEnLaColumna(j)
            }
            return banderaSinRepetidosEnLasColumnas
        }

        function isGameOver(){
            //Controlamos los repetidos en filas
            let banderaSinRepetidosEnLasFilas = hayRepetidosEnAlgunaFila()

            //Controlamos los repetidos en columnas
            let banderaSinRepetidosEnLasColumnas = hayRepetidosEnAlgunaColumna()
            return banderaSinRepetidosEnLasFilas && banderaSinRepetidosEnLasColumnas
        }
    
        function play(i, j){
            //Juego
            addNumber(i, j)
            
            //Muestro el tablero
            console.table(tableroSodoku)
            //Controlo el resultado
            let resultado = isGameOver()
            console.log(resultado)
            if(resultado == true){
                document.getElementById("desboard").innerHTML = "GANASTE"
            }
        
            //Devulvo el estado de la casilla donde se jugo
            return tableroSodoku[i][j]
        }
    
    function onload(){
        let desboardGame = document.getElementById("desboardGame")

        for(let i = 0 ; i < tableroSodoku.length; i++){
            for(let j = 0; j < tableroSodoku.length; j++){
                //Creo el elemento input
                let elInput = document.createElement("input")
                elInput.type = "number"
                //Seteo la poscion que representa
                elInput.setAttribute("data-i", i)
                elInput.setAttribute("data-j", j)
                //Reflejar el valor por default
                elInput.value = tableroSodoku[i][j]
                //Agrego el evento click
                elInput.addEventListener("click", function(event){
                    let element = event.target
                    //Utilizo getAttribute para cuando quiero obtener datos de un atributo que yo creo.
                    let i = element.getAttribute("data-i")
                    let j = element.getAttribute("data-j")
    
                    let resutlado = play(i, j)
                    //Esto significa que el valor del input en el HTML sea igual al valor de la variable resultado.
                    element.value = resutlado
                })
                //ULTIMO PASO SIEMPRE, DEBO SOLICITAR INSERTAR EL ELEMENTO EN EL DOM, porque solo exite dentro de una variable en la logica.
                desboardGame.appendChild(elInput)
            }
        } 
    }