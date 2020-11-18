SELECT p.id, p.title, p.img, p.content, u.username, u.profile_pic
FROM users u
JOIN posts p
    ON u.id = p.author_id
    WHERE p.id = $1;