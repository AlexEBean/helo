SELECT p.title, u.username, p.img
FROM users u
JOIN posts p
    ON u.id = p.author_id
    WHERE title LIKE ('%' || $1 || '%');