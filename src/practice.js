require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
})

// Knex query syntax equivalent to a SQL SELECT query
// NOTE: this is asynchronous now, you will need to ctrl-c to close the script.

// // 1.
// console.log(knexInstance.from('amazong_products').select('*').toQuery())
// knexInstance
//     .from('amazong_products')
//     .select('*')
//     .then(result => {
//         console.log(result)
//     })

// // 2.
// knexInstance
//     .select('product_id', 'name', 'price', 'category')
//     .from('amazong_products')
//     .where({ name: 'Point of view gun' })
//     .first() // will select the first item found and return only the object (no longer within an array)
//     .then(result => {
//         console.log(result)
//     })
    
// // 3.
// const qry = knexInstance
//     .select('product_id', 'name', 'price', 'category')
//     .from('amazong_products')
//     .where({ name: 'Point of view gun' })
//     .first()
//     .toQuery()

// console.log(qry)


// // 4. Search case insensitive
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


// // 5. Pagination
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


// // 6. Filter.whereNotNull 
// function getProductsWithImages() {
//     knexInstance
//         .select('*')
//         .from('amazong_products')
//         .whereNotNull('image')
//         .then(result => {
//             console.log(result)
//         })
// }

// getProductsWithImages()


// 7. Find most popular videos within a timespan
/* in SQL 
SELECT video_name, region, count(date_viewed) AS views
FROM whopipe_video_views
	WHERE date_viewed > (now() - '30 days'::INTERVAL)
GROUP BY video_name, region 
ORDER BY region ASC, views DESC; 
*/
function mostPopularVideosForDays(days) {
    knexInstance
        .select('video_name', 'region')
        .count('date_viewed AS views')  // note seperate function, not part of .select()
        .from('whopipe_video_views')
        .where(
            'date_viewed',
            '>',
            knexInstance.raw(`now() - '?? days'::INTERVAL`, days)   // feed SQL directly
            // using a prepared statement with '??' signifying tainted user input
            // other methods protect against SQL intection automatically
            // but .raw() needs us to specifcy user input with ?? and using a separate argument
        )
        .groupBy('video_name', 'region')
        .orderBy([                              // multi-column sort
            { column: 'region', order: 'ASC'},
            { column: 'views', order: 'DESC'},
        ])
        .then(result => {
            console.log(result)
        })
}

mostPopularVideosForDays(30)
