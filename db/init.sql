CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  username VARCHAR(20),
  password VARCHAR(20),
  profile_pic TEXT
);

INSERT INTO users 
(username, password, profile_pic)
VALUES
('user1', 'u1', 'https://static.wikia.nocookie.net/pixar/images/a/a8/Rex_%28Toy_Story%29.png/revision/latest/scale-to-width-down/940?cb=20181209010107');

CREATE TABLE posts
(
  id SERIAL PRIMARY KEY,
  title VARCHAR(45),
  img TEXT,
  content TEXT,
  author_id INT REFERENCES users(id)
);

INSERT INTO posts (title, img, content, author_id)
VALUES
('Hello World','https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg', 
'Welcome to Jurassic Park', 1);

ALTER TABLE users
ALTER password
TYPE TEXT;