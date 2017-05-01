BEGIN;

DROP TABLE IF EXISTS posts, tags, posts-tags cascade;

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  location POINT NOT NULL,
  image_url TEXT DEFAULT NULL,
  size TEXT NOT NULL,
  description TEXT NOT NULL,
  date_published TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tags (
  id INTEGER PRIMARY KEY,
  description TEXT NOT NULL,
);

CREATE TABLE posts-tags (
  post_id INTEGER NOT NULL REFERENCES posts (id),
  tag_id INTEGER NOT NULL REFERENCES tags (id)
);

INSERT INTO posts (location, image_url, size, description) VALUES
(
  (32.728394, 35.277644),
  'https://dl.dropboxusercontent.com/u/5038771/tip1.png',
  'Large Van',
  'Mixed household waste spread out on the side of the road including one washing machine and some broken wooden pallets'
),
(
  (32.689187, 35.300687),
  'https://dl.dropboxusercontent.com/u/5038771/12litter.jpg',
  'Small Van'
  'Old clothes and other items left on the side of the road at junction 72'
),
(
  (32.701639, 35.297084),
  'https://dl.dropboxusercontent.com/u/5038771/C8Dfd4OX0AEvks7.jpg',
  'Car',
  'Does anybody own this cow? He''s eating all my rubbish',
);

INSERT INTO tags (id, description) VALUES
(1, Recyclable),
(2, Landfill),
(3, Electronic),
(4, Hazardous Chemicals),
(5, Sharp);

INSERT INTO posts-tags (post_id, tag_id) VALUES
(1, 2),
(1, 1),
(1, 3),
(2, 2),
(3, 2);

COMMIT;
