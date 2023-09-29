const compteur = document.querySelector('#compteur');
const texte = document.querySelector('#texte');

window.addEventListener('click', () => {

    let nombreDeClicks = parseInt( compteur.textContent );

    nombreDeClicks++;
    
    if ( nombreDeClicks >= 5 && nombreDeClicks <= 9 ) {

        texte.textContent = "Bravo, bel échauffement !";

    } else if (nombreDeClicks >= 10 ) {

        texte.textContent = "Vous êtes passé maître en l'art du clic !";

    };

    compteur.textContent = nombreDeClicks;

});