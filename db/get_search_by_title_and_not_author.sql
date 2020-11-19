SELECT p.user_id, p.title, u.username, p.img, p.content, u.profile_pic, p.post_id
FROM users u
JOIN posts p
    ON u.user_id = p.user_id
    WHERE NOT p.user_id = $1
    AND LOWER(p.title) LIKE ('%' || LOWER($2) || '%');