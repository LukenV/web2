import anime from 'animejs';
import { clearPage } from '../../utils/render';
import { 
  createCard, 
  createTitle
} from '../../utils/functions';
import deadReckoning from '../../img/dead-reckoning.jpg';
import noWayHome from '../../img/no-way-home.jpg';

const HomePage = () => {
  clearPage();
  renderCards();
  animateCards();
};

function renderCards () {

  const main = document.querySelector('main');
  const container = document.createElement('div');
  container.className = 'container';

  main.appendChild(container);

  const spiderManText =
    "It's another movie of mission impossible,\neven if we had enough movies about it. But the revolution of this movie is that\nit is talking about A.I.";
  const spiderManTitle = 'Spider Man - No Way Home';

  const missionImpossibleText =
    "It's another movie of mission impossible,\neven if we had enough movies about it. But the revolution of this movie is that\nit is talking about A.I.";
  const missionImpossibleTitle = 'Mission Impossible - Dead Reckoning';

  createTitle('myMovies', container);

  createCard(noWayHome, spiderManTitle, spiderManText, container);
  createCard(deadReckoning, missionImpossibleTitle, missionImpossibleText, container);

}

function animateCards() {

  setInterval(() => {

    setTimeout(() => {

      anime({
        targets: '.card-text',
        translateY: -10,
        delay: anime.stagger(300, {easing: 'easeOutQuad'})
      });
  
    }, 500 );
  
    setTimeout(() => {
  
      anime({
        targets: '.card-text',
        translateY: 0,
        delay: anime.stagger(300, {easing: 'easeOutQuad'})
      });
  
    }, 1500 );

    setTimeout(() => {
  
      anime({
        targets: '.card-text',
        translateY: 10,
        delay: anime.stagger(300, {easing: 'easeOutQuad'})
      });
  
    }, 2500 );

    setTimeout(() => {
  
      anime({
        targets: '.card-text',
        translateY: 0,
        delay: anime.stagger(300, {easing: 'easeOutQuad'})
      });
  
    }, 3500 );

  }, 4500 );

  setInterval(() => {

    setTimeout(() => {

      anime({
        targets: '.card-title',
        translateX: 10,
        delay: anime.stagger(300, {easing: 'easeOutQuad'})
      });
  
    }, 500 );
  
    setTimeout(() => {
  
      anime({
        targets: '.card-title',
        translateX: 20,
        delay: anime.stagger(300, {easing: 'easeOutQuad'})
      });
  
    }, 1500 );

    setTimeout(() => {
  
      anime({
        targets: '.card-title',
        translateX: 30,
        delay: anime.stagger(300, {easing: 'easeOutQuad'})
      });
  
    }, 2500 );

    setTimeout(() => {
  
      anime({
        targets: '.card-title',
        translateX: 40,
        delay: anime.stagger(300, {easing: 'easeOutQuad'})
      });
  
    }, 3500 );

    setTimeout(() => {
  
      anime({
        targets: '.card-title',
        translateX: 30,
        delay: anime.stagger(300, {easing: 'easeOutQuad'})
      });
  
    }, 4500 );

    setTimeout(() => {
  
      anime({
        targets: '.card-title',
        translateX: 20,
        delay: anime.stagger(300, {easing: 'easeOutQuad'})
      });
  
    }, 5500 );

    setTimeout(() => {
  
      anime({
        targets: '.card-title',
        translateX: 10,
        delay: anime.stagger(300, {easing: 'easeOutQuad'})
      });
  
    }, 6500 );

    setTimeout(() => {
  
      anime({
        targets: '.card-title',
        translateX: 0,
        delay: anime.stagger(300, {easing: 'easeOutQuad'})
      });
  
    }, 7500 );

  }, 8000 );

}

export default HomePage;
