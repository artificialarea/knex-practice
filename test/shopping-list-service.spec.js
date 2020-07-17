const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');
const { expect } = require('chai');


describe('Shopping List service object', () => {

    let db;

    // FIXTURE
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

    // MOCHA LIFECYCLE HOOKS

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        });
    });

    // reset table every time 
    // before running test suite and
    // after each test 
    // to protect against 'test leakage'
    before(() => db('shopping_list').truncate());
    afterEach(() => db('shopping_list').truncate());

    after('destroy db connection', () => db.destroy())


    context(`Given 'shopping_list' has data`, () => {

        beforeEach(() => {
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

        it(`getById() resolves an item by id from 'shopping_list' table`, () => {
            const theId = 2;
            const theTestItem = testList[theId - 1];
            return ShoppingListService.getById(db, theId)
                .then(actual => {
                    console.log(actual);
                    expect(actual).to.eql({
                        id: theId,
                        name: theTestItem.name,
                        price: theTestItem.price,
                        date_added: theTestItem.date_added,
                        checked: theTestItem.checked,
                        category: theTestItem.category,
                    });
                })
        });

        it(`deleteItem() removes an item by id from 'shopping_list' table`, () => {
            const theId = 2;
            return ShoppingListService.deleteItem(db, theId)
                .then(() => ShoppingListService.getAllItems(db))
                .then(actual => {
                    const expected = testList.filter(item => item.id !== theId)
                    expect(actual).to.eql(expected);
                })
        });

        it(`updateItem() updates an item from 'shopping_list' table`, () => {
            const idOfItemToUpdate = 1;
            const updatedItemData = {
                name: 'Updated Test Item',
                price: '2.50',
                date_added: new Date('2020-01-01T00:00:00.000Z'),
                checked: true,
                category: 'Breakfast',

            };
            return ShoppingListService.updateItem(db, idOfItemToUpdate, updatedItemData)
                .then(() => ShoppingListService.getById(db, idOfItemToUpdate))
                .then(actual => {
                    expect(actual).to.eql({
                        id: idOfItemToUpdate,
                        ...updatedItemData,
                    })
                })
        })

    });

    context(`Given 'shopping_list' has no data`, () => {

        it(`getAllItems() resolves an empty array`, () => {
            return ShoppingListService.getAllItems(db)
                .then(actual => {
                    expect(actual).to.eql([]);
                })
        });

        it(`insertItem() inserts a new item and resolves the new item with an 'id'`, () => {
            const newItem = {
                name: 'Test new title insert',
                price: '100.00',
                date_added: new Date('2020-01-01T00:00:00.000Z'),
                checked: false,
                category: 'Breakfast',
            };

            return ShoppingListService.insertItem(db, newItem)
                .then(actual => {
                    expect(actual).to.eql({
                        id: 1,
                        name: newItem.name,
                        price: newItem.price,
                        date_added: newItem.date_added,
                        checked: newItem.checked,
                        category: newItem.category,
                    });
                })
        });
    })
});