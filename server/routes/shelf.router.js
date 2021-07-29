const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  const query = `SELECT * FROM item ORDER BY "id" ASC;`;
  pool.query(query)
  .then( result => {
    res.send(result.rows);
  })
  .catch(err => {
    console.log('Error : getting items', err);
    res.sendStatus(200); // For testing only, can be removed
  })
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
  console.log(req.body);
  //RETURNING "id" will give back the id to the item created
  const insertItem = `
  INSERT INTO "item" ("description", "image_url")
  VALUES ($1, $2)
  RETURNING "id";`;
  //For making the new item
  pool.query(insertItem, [req.body.description, req.body.image_url])
  .then( results => {
    console.log('New Item id:', result.rows[0].id);

    const createItemId = results.rows[0].id
//This id the handle the user_id reference
    const insertItemUserQuery = `
    INSERT INTO "item" ("item_id", "user_id")
    VALUES ($1, $2);`
    //Second query handles the user_id that goes with the new item
    pool.query(insertItemUserQuery, [createItemId, req.body.user_id])
    .then( results => {
      res.sendStatus(201);
    })//Second query catch
    .catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
  })
    //First query catch
    .catch(err => {
      console.log(err);
      res.sendStatus(500)
  })
  // endpoint functionality
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id',rejectUnauthenticated, (req, res) => {
 const queryText = `DELETE FROM "item" 
 WHERE "user_id" = $1 AND "id" = $2;`;
 pool.query(queryText, [req.user.id, req.params.id])
 .then(result => {
   console.log('item deleted');
   res.sendStatus(201)
 })
 .catch(error => {
   log('Error DELETE', error);
   res.sendStatus(500)
 })
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  const queryText = `
    UPDATE "item"
    SET "description" = $1, "image_url" = $2
    WHERE "user_id" = $4 AND "id" = $3;
  `;
  pool.query(queryText, [req.body.description, req.body.image_url, req.user.id, req.params.id])
  .then(result => {
    console.log('item updated');
    res.sendStatus(201)
  })
  .catch(error => {
    log('Error update', error);
    res.sendStatus(500)
  })
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
  const queryText = `
    SELECT "user"."username", COUNT("item"."user_id") AS "item_count"
    FROM "user"
    JOIN "item" ON "user"."id" = "item"."user_id"
    GROUP BY "item"."user_id", "user"."username";
  `;
  pool.query(queryText)
  .then(result => {
    console.log('get item counts by user SUCCESSFULL');
    res.sendStatus(201)
  })
  .catch(error => {
    log('Error getting item counts', error);
    res.sendStatus(500)
  })
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
  const queryText = `
    SELECT * FROM "item"
    WHERE "item"."id" = $1;
  `;
  pool.query(queryText, [req.params.id])
  .then(result => {
    console.log('get by id');
    res.sendStatus(201)
  })
  .catch(error => {
    log('Error get by id', error);
    res.sendStatus(500)
  })
});

module.exports = router;


