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
            // ^^^ .then to extract expected object out of an array.
            // Alternatively, in the spec.js could have put expected object 
            // *into* an array, e.g.
            // expect(actual).to.eql([{ }]), instead of
            // expect(actual).to.eql([   ])
    },

}

module.exports = ArticlesService