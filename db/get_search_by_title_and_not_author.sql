SELECT p.id, p.title, u.username, p.img, p.content, u.profile_pic
FROM users u
JOIN posts p
    ON u.id = p.author_id
    WHERE NOT p.author_id = $1
    AND LOWER(p.title) LIKE ('%' || LOWER($2) || '%');