SELECT u.id, p.title, u.username, p.img
FROM users u
JOIN posts p
    ON u.id = p.author_id
    WHERE NOT u.id = $1;