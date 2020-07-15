require("dotenv").config();
const knex = require("knex");

const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL,
});

// DRILLS /////////////////////////////////

// 1. Get all items that contain text
/* in SQL
SELECT * FROM shopping_list
WHERE name ILIKE '%dog%';
*/
function searchItemsByName(searchTerm) {
  knexInstance
    .select("*")
    .from("shopping_list")
    .where("name", "ILIKE", `%${searchTerm}%`)
    .then((result) => {
      console.log(result);
    });
}

// searchItemsByName('dog')

//2. Get all items paginated
function paginate(page) {
  const itemsPerPage = 6;
  const offset = itemsPerPage * (page - 1);

  knexInstance
    .select("*")
    .from("shopping_list")
    .limit(itemsPerPage)
    .offset(offset)
    .then((results) => console.log(results));
}

// paginate(2)

// 3. Get all items added after date
/* in SQL 
SELECT * 
FROM shopping_list
WHERE date_added > now() - `${daysAgo} days`::INTERVAL)
*/
function searchItemsAfterDate(daysAgo) {
  knexInstance
    .select("*")
    .from("shopping_list")
    .where(
      "date_added",
      ">",
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    )
    .then((result) => {
      console.log(result);
    });
}

// searchItemsAfterDate(2);

//4. Get total cost for each category

function totalCostPerCategory() {
  knexInstance
    .select("category")
    .count("price AS total")
    .from("shopping_list")
    .sum('price')
    .groupBy("category")
    .orderBy([
        { column: "category", order: "ASC" }, 
        { column: 'total items', order: 'DESC'}
    ])
    .then(results => console.log(results))
}
totalCostPerCategory()