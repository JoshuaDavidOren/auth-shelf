
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "item" (
    "id" SERIAL PRIMARY KEY,
    "description" VARCHAR (80) NOT NULL,
    "image_url" VARCHAR (2083),
    "user_id" INT REFERENCES "user"
);

/**
 * Delete an item if it's something the logged in user added
 */
-- router.delete('/:id'...
DELETE FROM "item" 
WHERE "user_id" = $1 AND "id" = $2;

/**
 * Update an item if it's something the logged in user added
 */
-- router.put('/:id'...
UPDATE "item"
SET "description" = $1, "image_url" = $2
WHERE "id" = $3 AND "user_id" = $4;

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
-- router.get('/count'...
SELECT "user"."username", COUNT("item"."user_id") AS "item_count"
FROM "user"
JOIN "item" ON "user"."id" = "item"."user_id"
GROUP BY "item"."user_id", "user"."username";

/**
 * Return a specific item by id
 */
-- router.get('/:id'...
SELECT * FROM "item"
WHERE "item"."id" = $1;