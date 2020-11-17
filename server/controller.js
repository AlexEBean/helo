const bcrypt = require("bcrypt")

module.exports = {
    register: async (req, res) => {
        const db = req.app.get("db")
        const { username, password, profilePic } = req.body
        const existingUser = await db.check_user(username)
        if (existingUser[0]) {
          return res.status(409).send("User Already Exists")
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const [newUser] = await db.add_user([username, hash, profilePic])
        req.session.user = {
          userId: newUser.id,
          username: newUser.username,
          profilePic: newUser.profile_pic,
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
                userId: foundUser.id,
                username: foundUser.username,
                profilePic: foundUser.profile_pic
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
        let filter = await db.get_author_search(userId)
        res.status(200).send(filter)
      } else if (userposts === "false" && search){
        let filter = await db.get_search_by_title_and_not_author([userId, search])
        res.status(200).send(filter)
      } else {
        let filter = await db.get_posts()
        res.status(200).send(filter) 
      }
    }
}