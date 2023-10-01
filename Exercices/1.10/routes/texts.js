const express = require('express');
const router = express.Router();

const {
  readAllTexts,
  readOneText,
  createOneText,
  deleteOneText,
  updateOneText,
} = require('../models/texts.js');

// Read all the texts from the list
router.get('/', (req, res) => {
  const level = req?.query?.level ? req.query.level : undefined;

  const texts = readAllTexts(level);

  if (texts.error) {
    return res.sendStatus(texts.error);
  }

  return res.json(texts);
});

// Read the text identified by an id in the list
router.get('/:id', (req, res) => {
  const id = req?.params?.id ? req.params.id : undefined;

  const text = readOneText(id);

  if (text.error) {
    return res.sendStatus(text.error);
  }

  return res.json(text.result);
});

// Create a text to be added to the list.
router.post('/', (req, res) => {
  const level = req?.body?.level ? req.body.level : undefined;
  const content = req?.body?.content ? req.body.content : undefined;

  const newText = createOneText(level, content);

  if (newText.error) {
    return res.sendStatus(newText.error);
  }

  return res.json(newText);
});

// Delete a text from the menu based on its id
router.delete('/:id', (req, res) => {
  const id = req?.params?.id ? req.params.id : undefined;

  const textRemoved = deleteOneText(id);

  if (textRemoved.error) {
    return res.sendStatus(textRemoved.error);
  }

  return res.json(textRemoved);
});

// Update a text based on its id and new values for its parameters
router.put('/:id', (req, res) => {
  const id = req?.params?.id ? req.params.id : undefined;
  const level = req?.body?.level ? req.body.level : undefined;
  const content = req?.body?.content ? req.body.content : undefined;

  if (!level || !content) {
    return res.sendStatus(400);
  }

  const updatedText = updateOneText(id, level, content);

  if (updatedText.error) {
    return res.sendStatus(updatedText.error);
  }

  return res.json(updatedText);
});

module.exports = router;
