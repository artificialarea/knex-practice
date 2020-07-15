BEGIN;

INSERT INTO blogful_articles (title, content, date_published)
VALUES
    ('seed title 1',        'seed content 1',   now() - '20 days'::INTERVAL),
    ('seed title 2',        'seed content 2',   now() - '20 days'::INTERVAL),
    ('seed title 3',        'seed content 3',   now() - '20 days'::INTERVAL),
    ('seed title 4',        'seed content 4',   now() - '20 days'::INTERVAL),
    ('seed title 5',        'seed content 5',   now() - '16 days'::INTERVAL),
    ('seed title 6',        'seed content 6',   now() - '15 days'::INTERVAL),
    ('seed title 7',        'seed content 7',   now() - '14 days'::INTERVAL),
    ('seed title 8',        'seed content 8',   now() - '12 days'::INTERVAL),
    ('seed title 9',        'seed content 9',   now() - '10 days'::INTERVAL),
    ('seed title 10',       'seed content 10',   now() - '10 days'::INTERVAL),
    ('seed title 11',       'seed content 11',   now() - '4 days'::INTERVAL),
    ('seed title 12',       'seed content 12',   now() - '2 days'::INTERVAL),
    ('seed title 13',       'seed content 13',   now() - '12 hours'::INTERVAL),
    ('seed title 14',       'seed content 14',   now() - '6 hours'::INTERVAL),
    ('seed title 15',       'seed content 15',   now() - '4 hours'::INTERVAL),
    ('seed title 16',       'seed content 16',   now() - '2 hours'::INTERVAL),
    ('seed title 17',       'seed content 17',   now() - '1 hour'::INTERVAL),
    ('seed title 18',       'seed content 18',   now() - '30 minutes'::INTERVAL),
    ('seed title 19',       'seed content 19',   now()),
    ('seed title 20',       'seed content 20',   now())
;


COMMIT;