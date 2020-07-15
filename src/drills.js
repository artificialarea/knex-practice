require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
});

// DRILLS ////////////////////////////////////////////////////

// 1. Get all items that contain text  ///////////////////////

/* in SQL
SELECT * 
FROM shopping_list
WHERE name ILIKE '%dog%';
*/

function searchItemsByName(searchTerm) {
    knexInstance
        .select('*')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then((result) => {
            console.log(`SEARCH TERM: "${searchTerm}"`)
            console.log(result);
        });
}
searchItemsByName('dog')



// 2. Get all items paginated  //////////////////////////////

/* in SQL
SELECT * 
FROM shopping_list
LIMIT 6
    OFFSET 18; // for 'page 4'
*/

function paginate(page) {
    const limit = 6;
    const offset = limit * (page - 1);

    knexInstance
        .select('*')
        .from('shopping_list')
        .limit(limit)
        .offset(offset)
        .then((results) => {
            console.log(`PAGINATE ITEMS`, page)
            console.log(results)
        });
}
paginate(2)



// 3. Get all items added after date ////////////////////////

/* in SQL 
SELECT * 
FROM shopping_list
WHERE date_added > (now() - '10 days'::INTERVAL)
*/

function productsAddedDaysAgo(daysAgo) {
    knexInstance
        .select('*')
        .from('shopping_list')
        .where(
            'date_added',
            '>',
            knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
        )
        .then((result) => {
            console.log(`PRODUCTS ADDED ${daysAgo} DAYS AGO`)
            console.log(result);
        });
}
productsAddedDaysAgo(2);



// 4. Get total cost for each category  //////////////////////

/* in SQL 
SELECT category, COUNT(category) AS total_items, SUM(price) AS total_cost 
FROM shopping_list
GROUP BY category
ORDER BY total_items DESC, total_cost;
*/

function totalCostPerCategory() {
    knexInstance
        .select('category')
        .from('shopping_list')
        .groupBy('category')
        .count('category AS total_items')
        .sum('price AS total_cost')
        .orderBy([
            { column: 'total_items', order: 'DESC' },
            { column: 'total_cost' }
        ])
        .then(results => {
            console.log(`COST PER CATEGORY`)
            console.log(results)
        })
}
totalCostPerCategory()