const HomePage = () => {

  const main = document.querySelector('main');
  const form = document.createElement('form');

  main.appendChild( form );

  askAndRenderQuestions();

};

function addSubmitInput() {

  // Just adding a submit input for the form

  const form = document.querySelector('form');

  const submitInput = document.createElement('input');

  submitInput.type = 'submit';
  submitInput.id = 'submit';
  submitInput.value = 'Calculate my score';

  form.appendChild( submitInput );

};

function generateThreeRandomQuestions( questionsArray ) {

  // Questions potentially picked

  const potientalQuestions = [...questionsArray];

  // Questions picked

  const randomQuestions = [];

  // We pick 3 questions

  for ( let i=0; i<3; i+=1 ) {

    // Get a random index of the array "potientalQuestions"
    const randomIndex = Math.floor( Math.random() * potientalQuestions.length );
    // Get a random question with the random index
    const randomQuestion = potientalQuestions[randomIndex];
    
    // Remove the question of the array "potentialQuestions"
    potientalQuestions.slice( randomIndex, 1 );

    // Add the question into the array "randomQuestions"
    randomQuestions.push( randomQuestion );

  };

  return randomQuestions;

};

function askAndRenderQuestions() {

  // Get the questions of the db

  fetch('http://localhost:3000/questions')
    .then((response) => {
      if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
      return response.json();
    })
    .then((questions) => {

      // Getting random questions from "questions" and putting them in the constant "randomQuestions"

      const randomQuestions = generateThreeRandomQuestions( questions );

      // Rendering each question

      randomQuestions.forEach( question => {

        renderRandomQuestion( question.question, question.answers );

      });

      // Adding submit button for the form

      addSubmitInput();

    })
    .catch((err) => {
      console.error('HomePage::error: ', err);
    });

};

// Rendering question with answers and radio inputs

function renderRandomQuestion( questionText, answersArray ) {

  const main = document.querySelector('main');

  const question = document.createElement('h2');
  question.innerText = questionText;

  const form = document.querySelector('form');

  form.appendChild( question );

  answersArray.map( (answer) => {

    const input = document.createElement('input');

    input.type = 'radio';
    input.name = questionText;
    input.id = answer.text;

    const label = document.createElement('label');

    label.innerText = answer.text;
    label.setAttribute('for', answer.text );

    form.appendChild(input);
    form.appendChild(label);

    const br = document.createElement('br');

    form.appendChild(br);

    return true;

  });

  main.appendChild( form ); 

};

export default HomePage;
