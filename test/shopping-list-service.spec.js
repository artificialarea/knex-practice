const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');
const { expect } = require('chai');


describe('Shopping List service object', () => {

    let db;

    // Fixture
    let testList = [
        {
            id: 1,
            name: 'Tofurky Test',
            price: '2.50',
            date_added: new Date('2029-01-22T16:28:32.615Z'),
            checked: true,
            category: 'Breakfast',
        },
        {
            id: 2,
            name: 'Not Dogs Test',
            price: '4.99',
            date_added: new Date('2100-01-22T16:28:32.615Z'),
            checked: false,
            category: 'Snack',
        },
        {
            id: 3,
            name: 'Pretenderloins Test',
            price: '9.99',
            date_added: new Date('1929-01-22T16:28:32.615Z'),
            checked: true,
            category: 'Main',
        },
    ];

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        });
    });

    
    // reset table every time before running test suite 
    // and after every test to protect against 'test leakage'.
    before(() => db('shopping_list').truncate());
    afterEach(() => db('shopping_list').truncate());


    after(('destroy db connection'), () => db.destroy())


    context(`Given 'shopping_list' has data`, () => {

        before(() => {
            return db
                .into('shopping_list')
                .insert(testList)
        })
        
        it(`getAllItems() resolves all items from 'shopping_list' table`, () => {
            return ShoppingListService.getAllItems(db)
                .then(actual => {
                    expect(actual).to.eql(testList);
                })
        });

    });
});