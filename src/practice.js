const knex = require('knex')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
})

console.log('knex and driver installed correctly')

// Knex query syntax variants
// equivalent to SQL SELECT query
// const q1 = knexInstance('amazong_products').select('*').toQuery()
// const q2 = knexInstance.from('amazong_products').select('*').toQuery()
// console.log('q1: ', q1)
// console.log('q2: ', q2)

// Note: this is the first point in time that our Node script attempts to connect to the database. You may see errors if the connection string is incorrect, if the database doesn't exist, or if the table doesn't exist.
knexInstance('amazong_products').select('*')
    .then(result => {
        console.log(result)
    })