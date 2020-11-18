SELECT p.id, p.title, u.username, p.img, p.content, u.profile_pic
FROM users u
JOIN posts p
    ON u.id = p.author_id
    WHERE NOT u.id = $1;