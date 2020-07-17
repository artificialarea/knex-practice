require('dotenv').config();
const knex = require('knex');
const ShoppingListService = require('../src/shopping-list-service');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
});

// SHOPPING LIST SERVICE OBJECT ASSIGNMENT //////////////////////////////////////
// src: https://courses.thinkful.com/node-postgres-v1/checkpoint/14#assignment

// cycle through service object CRUD methods
ShoppingListService.getAllItems(knexInstance)
    .then(articles => console.log('getAllItems: ', articles))
    .then(() => {
        return ShoppingListService.insertItem(knexInstance, {
            name: 'Yum-Ums',
            price: '1.00',
            date_added: new Date('2020-01-01T00:00:00.000Z'),
            checked: false,
            category: 'Snack',
        })
    })
    .then(newArticle => {
        return ShoppingListService.updateArticle(
            knexInstance,
            newArticle.id,
            { title: 'Updated title' }
        ).then(() => {
            return ShoppingListService.getById(
                knexInstance,
                newArticle.id
            )
        })
    })
    .then(article => {
        return ShoppingListService.deleteArticle(
            knexInstance,
            article.id
        )
    })

