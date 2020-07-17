require('dotenv').config()
const knex = require('knex')
const ArticlesService = require('./articles-service')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
})


// ARTICLES SERVICE OBJECT EXERCISE ////////////////////////////////////////////
// src: https://courses.thinkful.com/node-postgres-v1/checkpoint/14

// console.log(ArticlesService.getAllArticles(knexInstance))

// Use all of the ArticlesService methods:
// first .getAllArticles() 
// then .insertArticle() 
// then .updateArticle()
// then .getById() 
// then .deleteArticle()

ArticlesService.getAllArticles(knexInstance)
    .then(articles => console.log('getAllArticles: ', articles))
    .then(() => {
        return ArticlesService.insertArticle(knexInstance, {
            title: 'New title',
            content: 'New content',
            date_published: new Date()
        })
    })
    .then(newArticle => {
        return ArticlesService.updateArticle(
            knexInstance,
            newArticle.id,
            { title: 'Updated title' }
        ).then(() => {
            return ArticlesService.getById(
                knexInstance,
                newArticle.id
            )
        })
    })
    .then(article => {
        return ArticlesService.deleteArticle(
            knexInstance,
            article.id
        )
    })


//////////////////////////////////////////////////
// FOOTNOTES /////////////////////////////////////
//////////////////////////////////////////////////

// RE: PROMISES UNFULLFILLED

// Individual attempt to: 
// DELETE ARTICLE doesn't work (unless I append with .then)

// ArticlesService
//     .deleteArticle(knexInstance, 27)
//     .then(
//         console.log('This .then() is required in order for the function deleteArticle() to execute properly. Dunno why, tho =/')
//     ) 

// ^^^^^^^^ WHY WON'T THIS DELETE ITEM?!??!?!?
// ThinkChat says...

// "My hypothesis is that the function call is finishing 
// before delete call to the database is 
// and the delete operation just is happening as a result."

// "Ultimately, the call to delete() is a promise; 
// so, the call to deleteArticle() returns a promise. 
// Since that call is not embedded in the middle of another promise chain, 
// the main flow of code execution 
// calls deleteArticle(), 
// gets the promise, 
// and then just exits the file. 

// Because the code flow exits so quickly, 
// the memory space that the promise for the delete operation it's executing in 
// gets dumped before the delete actually executes.

// The code in Promise chains gets executed outside the main flow code execution

// That's my hypothesis about what is happening anyways." 

// SOLUTION!!! (???) 
// Append a .then() to either the invoking of the function 
// or the function itself and it works. Dunno why, but it works.

// ThinkChat says...
// "deleteArticle returned a promise that we did something with 
// instead of just discarding and letting its memory be collected when the code flow exited the file."
//


// Btw, INSERT ARTICLE (works fine)
// ArticlesService.insertArticle(knexInstance, {
//     title: 'New title again',
//     content: 'New content',
//     date_published: new Date()
// })