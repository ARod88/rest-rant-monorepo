const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')
const jwt = require('json-web-token')

const { User } = db

router.post('/', async (req, res) => {
    console.log('logged in with', req.body)
    let {email, password} = req.body
    let user = await User.findOne({
        where: {
            email
        },
       
    })
  

    if (!user || !await bcrypt.compare(password, user.passwordDigest)){
        res.status(404).json({
            message: 'Could not find user...'
        })
    } else {
        // pass back token stuff 
         const result = await jwt.encode(process.env.JWT_SECRET, { userId: user.userId })
        console.log(result)
        res.status(200).json({user, token: result.value })
    }

    console.log(user)
})

router.get('/profile', async (req, res) => {
    try {
      res.status(200).json(req.currentUser)
        } catch(e) {
        res.status(500).json({ message: 'Server did an oppsie'})
    }
});

module.exports = router