require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
})

// Knex query syntax equivalent to a SQL SELECT query
// NOTE: this is asynchronous now, you will need to ctrl-c to close the script.

// 1.
console.log(knexInstance.from('amazong_products').select('*').toQuery())
knexInstance
    .from('amazong_products')
    .select('*')
    .then(result => {
        console.log(result)
    })

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
// const qry = knexInstance
//     .select('product_id', 'name', 'price', 'category')
//     .from('amazong_products')
//     .where({ name: 'Point of view gun' })
//     .first()
//     .toQuery()

// console.log(qry)


// 4. Search case insensitive
// function searchByProduceName(searchTerm) {
//     knexInstance
//     .select('product_id', 'name', 'price', 'category')
//     .from('amazong_products')
//     .where('name', 'ILIKE', `%${searchTerm}%`)  // unlike LIKE, ILIKE is case insensitive... an insensitive like, as it were
//     .then(result => {
//         console.log(result)
//     })
// }

// searchByProduceName('holo')


// 5. Pagination
// function paginateProducts(page) {
//     const productsPerPage = 10
//     const offset = productsPerPage * (page - 1)
//     knexInstance
//         .select('product_id', 'name', 'price', 'category')
//         .from('amazong_products')
//         .limit(productsPerPage)
//         .offset(offset  )
//         .then(result => {
//             console.log(result)
//         })
// }

// paginateProducts(2)


// 6. Filter.whereNotNull 
function getProductsWithImages() {
    knexInstance
        .select('*')
        .from('amazong_products')
        .whereNotNull('image')
        .then(result => {
            console.log(result)
        })
}

getProductsWithImages()