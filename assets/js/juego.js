
// Función anónima
const miModulo = (() => {

    'use strict'

        
    let deck            = []; // arreglo para alamacenar las cartas
    const tipos         = ['C', 'D', 'H', 'S'], /* tipos de cartas */
          especiales    = ['A', 'J', 'Q', 'K']; /* cartas con letras */

    // let puntosJugador = 0,
    //     puntosComputadora = 0;

    let puntosJugadores = [];


    // Referencias del HTML
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          putnosHTML = document.querySelectorAll('small');

    // esta función inicializar el juego
    const inicializarJuego = (numJugadores = 2 ) => {
        deck = crearDeck();

        puntosJugadores = [];
        for(let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);
        }

        putnosHTML.forEach( elem => elem.innerText = 0);
        divCartasJugadores.forEach( elem => elem.innerHTML = '' );

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    // esta función crea una nueva baraja(deck)
    const crearDeck = () => {
        deck = [];
        for( let i = 2; i <= 10; i++) {

            for( let tipo of tipos) {
                deck.push( i + tipo); // se agrega un elemento al final del arreglo deck
            }
        }

        for(let tipo of tipos) { 

            for (let esp of especiales ) {
                deck.push( esp + tipo);
            }
        }

        // el shufle viene de la biblioteca de Underscore
        return _.shuffle( deck ); 
    }

    // esta fucnión me permite tomar una carta
    const pedirCarta = () => {

        if ( deck.length === 0) {
            throw 'No hay cartas en el deck';
        }

         // el pop toma la última carta del array deck, lo almacena en carta, y se elimina del arreglo deck
        return deck.pop();
    }

    const valorCarta = ( carta ) => {

        const valor = carta.substring(0, carta.length - 1); //se utiliza para extraer una porción de una cadena de texto
        return ( isNaN( valor) ) ? // esto es lo mismo que el bloque de código desde 76 - 82
            ( valor === 'A' ) ? 11 : 10
            : valor * 1;
            

        // if ( isNaN( valor )) { // isNaN evalua lo que hay entre parentesis y dime si es un numero o no

        //     puntos = ( valor ===  'A') ? 11 : 10;

        // } else {
        //     console.log('Es un numero');
        //     puntos = valor * 1; // se multiplica * 1 porque el valor que se almacena en puntos es string, al mutliplicarlo * 1 se convierte en un número entero

        // }

        
        
    }


    //Truno: 0 = primer jugador y el último será la computadora
    const acumularPuntos = ( carta, turno ) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        putnosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];


    }


    const crearCarta = ( carta , turno) => {

        const imgCarta = document.createElement('img'); 
        imgCarta.src = `assets/cartas/${ carta }.png`; // esto elige una carta al azar y lo muestra
        imgCarta.classList.add('carta'); // se agrega la clase 'carta' al elemento imgCarta
        divCartasJugadores[turno].append(imgCarta);// se muestra la carta en el div

    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;


        setTimeout(()=> {

            if( puntosComputadora === puntosMinimos ) {
                alert('Nadie gana :(');
            } else if( puntosMinimos > 21) {
                alert('Computadora gana');
            } else if( puntosComputadora > 21){
                alert('Jugador Gana');
            } else {
                alert('Computadora gana');
            }
        }, 100 );
    }


    // Turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {

        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos( carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);


        } while( ( puntosComputadora < puntosMinimos) && (puntosMinimos <= 21 ));

        determinarGanador();
    }



    // Eventos
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador =  acumularPuntos( carta, 0);

        crearCarta( carta, 0 );

        if ( puntosJugador > 21 ){
            console.warn('Perdisteeeee animal! ');
            btnPedir.disabled = true; // bloquea la funcionalidad del boton Pedir cuando se cumpla la acondición if
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
        } else if ( puntosJugador === 21){
            console.warn('ganasteee!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
            
        }


    });


    btnDetener.addEventListener('click', () => {

        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora( puntosJugadores[0] );

    });

    btnNuevo.addEventListener('click', () => {

        inicializarJuego();
    });

    return {
        nuevoJuego: inicializarJuego
    };

})();



