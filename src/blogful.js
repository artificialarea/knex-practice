require('dotenv').config()
const knex = require('knex')
const ArticlesService = require('./articles-service')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
})

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
        console.log('insertArticle: ', newArticle)
        return ArticlesService.updateArticle(
            knexInstance,
            newArticle.id,
            { title: 'Updated title' }
        ).then(() => {
            console.log('updateArticle: ', newArticle)
            return ArticlesService.getById(
                knexInstance,
                newArticle.id
            )
        })
    })
    .then(article => {
        console.log(article)
        return ArticlesService.deleteArticle(
            knexInstance,
            article.id
        )
    })


// Individual attempts to: 

// DELETE ARTICLE
// ArticlesService.deleteArticle(knexInstance, 21)

// INSERT ARTICLE
// ArticlesService.insertArticle(knexInstance, {
//     title: 'New title again',
//     content: 'New content',
//     date_published: new Date()
// })