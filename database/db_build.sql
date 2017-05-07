BEGIN;

DROP TABLE IF EXISTS posts, tags, posts_tags, markers cascade;

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  image_url TEXT DEFAULT NULL,
  location TEXT NOT NULL,
  size TEXT NOT NULL,
  description TEXT NOT NULL,
  date_published TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tags (
  id INTEGER PRIMARY KEY,
  description TEXT NOT NULL
);

CREATE TABLE posts_tags (
  post_id INTEGER NOT NULL REFERENCES posts (id),
  tag_id INTEGER NOT NULL REFERENCES tags (id)
);

CREATE TABLE markers (
  post_id INTEGER NOT NULL UNIQUE REFERENCES posts(id),
  latitude DECIMAL NOT NULL,
  longitude DECIMAL NOT NULL
);

INSERT INTO posts (location, image_url, size, description) VALUES
(
  '32.701509,35.310147',
  'https://dl.dropboxusercontent.com/u/5038771/tip1.png',
  'Large Van',
  'Mixed household waste spread out on the side of the road including one washing machine and some broken wooden pallets'
),
(
  '32.693757,35.299489',
  'https://dl.dropboxusercontent.com/u/5038771/12litter.jpg',
  'Small Van',
  'Old clothes and other items left on the side of the road at junction 72'
),
(
  '51.528558,-0.241701',
  'https://dl.dropboxusercontent.com/u/5038771/C8Dfd4OX0AEvks7.jpg',
  'Car',
  'Does anybody own this cow? He''s eating all my rubbish'
);

INSERT INTO tags (id, description) VALUES
(1, 'Recyclable'),
(2, 'Electronic'),
(3, 'Dump'),
(4, 'Sharp'),
(5, 'Hazardous Chemicals');

INSERT INTO posts_tags (post_id, tag_id) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 2),
(3, 2);

INSERT INTO markers (post_id, latitude, longitude) VALUES
(1, 32.701509, 35.310147),
(2, 32.693757, 35.299489),
(3, 51.528558, -0.241701);

COMMIT;
