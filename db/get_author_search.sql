SELECT p.user_id, p.title, u.username, p.img, p.content, u.profile_pic, p.post_id
FROM users u
JOIN posts p
    ON u.user_id = p.user_id
    WHERE NOT u.user_id = $1;