SELECT p.user_id, p.title, p.img, p.content, u.username, u.profile_pic, p.post_id
FROM users u
JOIN posts p
    ON u.user_id = p.user_id
    WHERE p.user_id = $1;