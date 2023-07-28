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
        }
    })

    if (!user || !await bcrypt.compare(password, user.passwordDigest)){
        res.status(404).json({
            message: 'Could not find user...'
        })
    } else {
        // pass back token stuff 

        const { value } = await jwt.encode(process.env.JW_SECRET, { userId: user.userId })
        
        res.status(200).json({user, token: value })
    }

    console.log(user)
})

router.get('/profule', async (req, res) => {
    try {
        let userId = ''
        let user = await User.findOne({
            where: {
                userId
            }
        })
    }
})
module.exports = router