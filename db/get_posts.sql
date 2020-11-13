SELECT p.title, u.username, u.profile_pic
FROM users u
JOIN posts p
    ON u.user_id = p.author_id;