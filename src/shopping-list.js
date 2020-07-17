require('dotenv').config();
const knex = require('knex');
const ShoppingListService = require('../src/shopping-list-service');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
});

// SHOPPING LIST SERVICE OBJECT ASSIGNMENT //////////////////////////////////////
// src: https://courses.thinkful.com/node-postgres-v1/checkpoint/14#assignment



