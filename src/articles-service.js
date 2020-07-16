const ArticlesService = {

    // knex db is being injected into this fn as a param
    getAllArticles(knex) { 
        
        return knex.select('*').from('blogful_articles')

        // return Promise.resolve('all the articles!!')
        // The getAllArticles will use asynchronous logic for the SQL query so our test code will assume getAllArticles returns a promise that resolves the articles.
    },
    insertArticle(knex, newArticle) {
        // return Promise.resolve({})
        return knex
            .insert(newArticle)
            .into('blogful_articles')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
            // ^^^ .then to extract the expected object out of the array.
    },
    getById(knex, id) {
        return knex
            .from('blogful_articles')
            .select('*')
            .where('id', id)
            .first()
    },
    deleteArticle(knex, id) {
        console.log('deleteArticle id: ', {id})
        return knex
            .from('blogful_articles')
            .where({ id })
            .delete()
            // .then(
            //     console.log('hello?')
            // )
            // ^^^^ see FOOTNOTES in blogful.js
    },
    updateArticle(knex, id, newArticleFields) {
        return knex
            .from('blogful_articles')
            .where({ id })
            .update(newArticleFields)
    },

}

module.exports = ArticlesService