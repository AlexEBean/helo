SELECT p.title, u.username, u.profile_pic
FROM users u
JOIN posts p
    ON u.user_id = p.author_id
    WHERE NOT author_id = $1
    AND title = $2;