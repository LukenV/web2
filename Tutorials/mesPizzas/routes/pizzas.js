const express = require('express');
const router = express.Router();

const MENU = [
  {
    id: 1,
    title: '4 fromages',
    content: 'Gruyère, Sérac, Appenzel, Gorgonzola, Tomates',
  },
  {
    id: 2,
    title: 'Vegan',
    content: 'Tomates, Courgettes, Oignons, Aubergines, Poivrons',
  },
  {
    id: 3,
    title: 'Vegetarian',
    content: 'Mozarella, Tomates, Oignons, Poivrons, Champignons, Olives',
  },
  {
    id: 4,
    title: 'Alpage',
    content: 'Gruyère, Mozarella, Lardons, Tomates',
  },
  {
    id: 5,
    title: 'Diable',
    content: 'Tomates, Mozarella, Chorizo piquant, Jalapenos',
  },
];

/* Read all the pizzas from the menu
   GET /pizzas?order=title : ascending order by title
   GET /pizzas?order=-title : descending order by title
*/

router.get('/', (req, res, next) => {

  const orderByTitle =
    req?.query?.order?.includes('title')
      ? req.query.order
      : undefined;

  let orderedMenu;

  console.log(`order by ${orderByTitle ?? 'not requested'}`);

  if (orderByTitle)
    orderedMenu = [...MENU].sort((a, b) => a.title.localeCompare(b.title));

  if (orderByTitle === '-title') orderedMenu = orderedMenu.reverse();

  res.json(orderedMenu ?? MENU);

});

// Create a pizza to be added to the menu.
router.post('/', (req, res) => {

  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const content = req?.body?.content?.length !== 0 ? req.body.content : undefined;

  console.log('POST /pizzas');

  if (!title || !content) return res.sendStatus(400); // error code '400 Bad request'

  const lastItemIndex = MENU?.length !== 0 ? MENU.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? MENU[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newPizza = {
    id: nextId,
    title: title,
    content: content,
  };

  MENU.push(newPizza);

  res.json(newPizza);

});

// Read the pizza identified by an id in the menu
router.get('/:id', (req, res) => {
  console.log(`GET /pizzas/${req.params.id}`);

  const indexOfPizzaFound = MENU.findIndex( (pizza) => pizza.id == req.params.id );

  if (indexOfPizzaFound < 0) return res.sendStatus( 404 );

  res.json(MENU[indexOfPizzaFound]);

});

module.exports = router;