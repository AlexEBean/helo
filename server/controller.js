const bcrypt = require("bcrypt")

module.exports = {
    register: async (req, res) => {
        const db = req.app.get("db")
        const { username, password, profile_pic} = req.body
        const existingUser = await db.check_user(username)
        if (existingUser[0]) {
          return res.status(409).send("User Already Exists")
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const [newUser] = await db.add_user([username, hash, profile_pic])
        req.session.user = {
          userId: newUser.user_id,
          username: newUser.username,
          profile_pic: `https://robohash.org/${newUser.username}`
        }
        res.status(200).send(req.session.user)
      },

      login: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
        const [foundUser] = await db.check_user(username)
        if(!foundUser){
            return res.status(401).send("Incorrect login information")
        }
        const authenticated = bcrypt.compareSync(password, foundUser.password)
        if( authenticated ){
            req.session.user = {
                userId: foundUser.user_id,
                username: foundUser.username,
                profile_pic: `https://robohash.org/${foundUser.username}`
            }
            res.status(200).send(req.session.user)
        } else {
            res.status(401).send('Incorrect login information')
        }
    },

    getPosts: async (req, res) => {
      const db = req.app.get('db')
      const {userposts, search} = req.query
      const {userId} = req.params

      if (userposts === "true" && search) {
        let filter = await db.get_search_by_title(search)
        res.status(200).send(filter)
      } else if (userposts === "false" && !search){
        let filter = await db.get_author_search(+userId)
        res.status(200).send(filter)
      } else if (userposts === "false" && search){
        let filter = await db.get_search_by_title_and_not_author([+userId, search])
        res.status(200).send(filter)
      } else {
        let filter = await db.get_posts()
        res.status(200).send(filter) 
      }
    },

    getPost: async (req, res) => {
      const db = req.app.get('db')
      const {postId} = req.params
      let post = await db.get_post(+postId)
        res.status(200).send(post)
    },

    addPost: async (req, res) => {
      const db = req.app.get('db')
      const {title, img, content} = req.body
      const {userId} = req.params

      await db.add_post([title, img, content, +userId])
      res.sendStatus(200)
  }
}