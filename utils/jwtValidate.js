const jwt = require('jsonwebtoken')

const jwtValidate = async (req, res, next) => {
    try {
        if (req.headers && req.headers.authorization) {
            console.log(req.headers.authorization)
            let token = req.headers.authorization
            let slicedToken = token.split(' ')[1]
            let decodedToken = await jwt.verify(slicedToken, process.env.SUPER_SECERT_KEY)

            if (decodedToken) {
                res.locals.decodedToken = decodedToken
                next()
                return 
            } else {
                return res.status(401).json({ success: false, message: "error", error: { user: "Not Authorized"}})
            }
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message})
    }
}

module.exports = { jwtValidate }