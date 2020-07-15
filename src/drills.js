require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
})

// DRILLS /////////////////////////////////

// 1. Get all items that contain text
/* in SQL
SELECT * FROM shopping_list
WHERE name ILIKE '%dog%';
*/
function searchItemsByName(searchTerm) {
    knexInstance
        .select('*')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result)
        })

}

// searchItemsByName('dog')

//2.

function paginate(page) {

    const itemsPerPage = 6
    const offset = itemsPerPage * ( page - 1 )

    knexInstance
    .select('*')
    .from('shopping_list')
    .limit(itemsPerPage)
    .offset(offset)
    .then(results => console.log(results))
}

paginate(2)