require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
})

// Knex query syntax equivalent to a SQL SELECT query
// NOTE: this is asynchronous now, you will need to ctrl-c to close the script.

// 1.
// console.log(knexInstance.from('amazong_products').select('*').toQuery())
// knexInstance
//     .from('amazong_products')
//     .select('*')
//     .then(result => {
//         console.log(result)
//     })

// 2.
// knexInstance
//     .select('product_id', 'name', 'price', 'category')
//     .from('amazong_products')
//     .where({ name: 'Point of view gun' })
//     .first() // will select the first item found and return only the object (no longer within an array)
//     .then(result => {
//         console.log(result)
//     })
    
// 3.
const qry = knexInstance
    .select('product_id', 'name', 'price', 'category')
    .from('amazong_products')
    .where({ name: 'Point of view gun' })
    .first()
    .toQuery()

console.log(qry)
