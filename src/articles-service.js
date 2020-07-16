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
            // Alternatively, in the spec.js we could have put the 
            // expected object *into* an array, e.g.
            // expect(actual).to.eql([{ }]), instead of
            // expect(actual).to.eql([   ])
    },
    getById(knex, id) {
        return knex
            .from('blogful_articles')
            .select('*')
            .where('id', id)
            .first()
    }

}

module.exports = ArticlesService