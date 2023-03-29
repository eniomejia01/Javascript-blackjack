
/* 

        2C = Two of clubs 
        2D = Two of Diamonds 
        2H = Two of Hearts 
        2S = Two of Spades 



*/


let deck            = []; // arreglo para alamacenar las cartas
const tipos         = ['C', 'D', 'H', 'S']; /* tipos de cartas */
const especiales    = ['A', 'J', 'Q', 'K']; /* cartas con letras */


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


    console.log(deck);
    console.log(carta);

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

    // console.log(puntos);

}

const valor = valorCarta( pedirCarta() );
console.log( {valor} );