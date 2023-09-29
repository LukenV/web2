const button = document.querySelector('button#clickMe');
const currentClicks = document.querySelector('p#currentClicks');
const delayInSeconds = 5;
const delayInMilliseconds = delayInSeconds * 1000;

let interval;

const startClock = () => {

    if ( !interval ) {

        console.log( "TimeOut set" );

        interval = setTimeout(() => {

            currentClicks.innerHTML = 0;
            alert( "Game over, you did not click 10 times within 5s !" );

            console.log( "TimeOut ended" );

            interval = undefined;

        }, delayInMilliseconds);

    };

};

const clearClock = () => {
    
    console.log( "TimeOut cleared" );

    clearTimeout( interval );

    interval = undefined;

};

button.addEventListener('mouseover', startClock );

button.addEventListener('click', () => {

    let numberClicks = parseInt( currentClicks.innerHTML );

    currentClicks.innerHTML = ++numberClicks;

    if ( numberClicks == 10 ) {

        alert( `You win ! You clicked 10 times within ${interval} ms` );

        currentClicks.innerHTML = 0;

        clearClock();

    };

});