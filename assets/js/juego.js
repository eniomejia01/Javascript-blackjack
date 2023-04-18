/* 
        2C = Two of clubs 
        2D = Two of Diamonds 
        2H = Two of Hearts 
        2S = Two of Spades 
*/


let deck            = []; // arreglo para alamacenar las cartas
const tipos         = ['C', 'D', 'H', 'S']; /* tipos de cartas */
const especiales    = ['A', 'J', 'Q', 'K']; /* cartas con letras */

let puntosJugador = 0,
    puntosComputadora = 0;


// Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const divCartasJugador      = document.querySelector('#jugador-cartas');
const divCartasComputadora  = document.querySelector('#computadora-cartas');

const putnosHTML = document.querySelectorAll('small');

// esta función crea una nueva baraja(deck)
const crearDeck = () => {

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

    // console.log({deck});

    deck = _.shuffle( deck ); // el shufle viene de la biblioteca de Underscore
    console.log( deck );

    return deck;
}

crearDeck();

// esta fucnión me permite tomar una carta

const pedirCarta = () => {

    if ( deck.length === 0) {
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop(); // el pop toma la última carta del array deck, lo almacena en carta, y se elimina del arreglo deck
    return carta;
}

// pedirCarta();

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


// Turno de la computadora
const turnoComputadora = ( puntosMinimos ) => {

    do {
        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta( carta );
        putnosHTML[1].innerText = puntosComputadora;
    
        // <img class="carta" src="assets/cartas/10S.png" alt=""></img>
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append( imgCarta );

        if( puntosMinimos > 21 ){
            break;
        }


    } while( ( puntosComputadora < puntosMinimos) && (puntosMinimos <= 21 ));


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



// Eventos
btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta( carta );
    putnosHTML[0].innerText = puntosJugador;

    // <img class="carta" src="assets/cartas/10S.png" alt=""></img>
    const imgCarta = document.createElement('img'); 
    imgCarta.src = `assets/cartas/${ carta }.png`; // esto elige una carta al azar y lo muestra
    imgCarta.classList.add('carta'); // se agrega la clase 'carta' al elemento imgCarta
    divCartasJugador.append( imgCarta ); // se muestra la carta en el div


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

    turnoComputadora( puntosJugador );

});

btnNuevo.addEventListener('click', () => {

    console.clear();

    deck = [];
    deck = crearDeck();

    puntosJugador       = 0;
    puntosComputadora   = 0;

    putnosHTML[0].innerText = 0;
    putnosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = ''; 
    divCartasJugador.innerHTML = ''; 

    btnPedir.disabled = false;
    btnDetener.disabled = false;

});