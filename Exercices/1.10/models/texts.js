const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const { v4: uuidv4 } = require('uuid');

const jsonDbPath = path.join(__dirname, '/../data/texts.json');

const defaultTexts = [
  {
    content:
      'Le JavaScript est un langage de programmation très populaire utilisé pour le développement web.',
    level: 'easy',
  },
  {
    content:
      "React est une bibliothèque JavaScript très utilisée pour la construction d'interfaces utilisateur.",
    level: 'medium',
  },
  {
    content:
      "La cryptographie est un domaine complexe de l'informatique qui traite de la sécurité des données.",
    level: 'hard',
  },
  {
    content:
      'Les arbres binaires sont des structures de données couramment utilisées en informatique.',
    level: 'easy',
  },
  {
    content:
      "L'intelligence artificielle et l'apprentissage automatique sont des domaines en pleine expansion.",
    level: 'medium',
  },
  {
    content:
      "La programmation fonctionnelle est un paradigme de programmation qui met l'accent sur les fonctions pures.",
    level: 'hard',
  },
  {
    content: 'HTML est un langage de balisage utilisé pour créer des pages web.',
    level: 'medium',
  },
  {
    content: 'Node.js est une plateforme de développement JavaScript côté serveur.',
    level: 'easy',
  },
  {
    content:
      "Le machine learning permet aux ordinateurs d'apprendre à partir de données et de prendre des décisions.",
    level: 'hard',
  },
  {
    content:
      'Les bases de données SQL sont utilisées pour stocker et gérer des données relationnelles.',
    level: 'medium',
  },
  {
    content:
      'Python est un langage de programmation polyvalent utilisé dans divers domaines, y compris la science des données.',
    level: 'easy',
  },
  {
    content: 'Les réseaux de neurones sont une technique clé en apprentissage profond.',
    level: 'medium',
  },
  {
    content: 'JavaScript peut être utilisé à la fois côté client et côté serveur grâce à Node.js.',
    level: 'easy',
  },
  {
    content: 'La sécurité informatique est essentielle pour protéger les données sensibles.',
    level: 'hard',
  },
  {
    content:
      'Les développeurs web utilisent souvent des frameworks comme Angular, React ou Vue.js.',
    level: 'medium',
  },
];

const readAllTexts = (level) => {
  let texts = parse(jsonDbPath, defaultTexts);

  // Initalize the uuid of all the texts

  if (texts === defaultTexts) {
    for (const text of defaultTexts) {
      text.id = uuidv4();
    }

    serialize(jsonDbPath, defaultTexts);

    texts = parse(jsonDbPath, defaultTexts);
  }

  let alteredList;

  if (level) {
    alteredList = filterByLevel(level);
  }

  return alteredList ?? texts;
};

const filterByLevel = (level) => {
  const results = {};

  if (!isLevelValid(level) || !isStringValid(level)) {
    results.error = 400;

    return results;
  }

  const texts = parse(jsonDbPath, defaultTexts);

  results.results = texts.filter((text) => text.level === level);

  return results;
};

const readOneText = (id) => {
  const result = {};

  const texts = parse(jsonDbPath, defaultTexts);

  const selectedText = texts.find((text) => text.id === id);

  if (!selectedText) {
    result.error = 400;

    return result;
  }

  result.result = selectedText;

  return result;
};

const createOneText = (level, content) => {
  const result = {};

  if (!level || !content) {
    result.error = 400;

    return result;
  }

  if (!isLevelValid(level)) {
    result.error = 400;

    return result;
  }

  const texts = parse(jsonDbPath, defaultTexts);

  const newText = {
    id: uuidv4(),
    level: level,
    content: content,
  };

  texts.push(newText);

  result.result = newText;

  serialize(jsonDbPath, texts);
  return result;
};

const deleteOneText = (id) => {
  const result = {};

  if (!id) {
    result.error = 400;

    return result;
  }

  const texts = parse(jsonDbPath, defaultTexts);

  const textIndex = texts.findIndex((text) => text.id == id);

  if (textIndex < 0) {
    result.error = 409;

    return result;
  }

  const textRemoved = texts[textIndex];

  texts.splice(textIndex, 1);

  serialize(jsonDbPath, texts);

  result.result = textRemoved;

  return result;
};

const updateOneText = (id, level, content) => {
  const result = {};

  if (!id || !isLevelValid(level)) {
    result.error = 400;

    return result;
  }

  const texts = parse(jsonDbPath, defaultTexts);

  const textIndex = texts.findIndex((text) => text.id == id);

  if (textIndex < 0) {
    result.error = 404;

    return result;
  }

  const updatedText = { ...texts[textIndex], ...{ level, content } };

  texts[textIndex] = updatedText;

  serialize(jsonDbPath, texts);

  result.result = updatedText;

  return result;
};

const isLevelValid = (level) => {
  return ['easy', 'medium', 'hard'].includes(level);
};

const isStringValid = (string) => {
  return !string && string.length == 0 && typeof string == 'string';
};

module.exports = {
  readAllTexts,
  readOneText,
  createOneText,
  deleteOneText,
  updateOneText,
};
