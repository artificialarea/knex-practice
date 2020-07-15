CREATE TABLE blogful_articles (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    date_published TIMESTAMPTZ DEFAULT now() NOT NULL,  -- TIMESTAMPTZ = TIMESTAMP WITH TIME ZONE (in UTC time)
    content TEXT
)

-- $ psql -U dunder_mifflin -d knex-practice -f ./blogful-scripts/create.blogful.sql
