const ArticlesService = {

    // knex db is being injected into this fn as a param
    getAllArticles(knex) { 
        
        return knex.select('*').from('blogful_articles')

        // return Promise.resolve('all the articles!!')
        // The getAllArticles will use asynchronous logic for the SQL query so our test code will assume getAllArticles returns a promise that resolves the articles.
    }

}

module.exports = ArticlesService