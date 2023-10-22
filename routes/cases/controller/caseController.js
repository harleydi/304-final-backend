const User = require('../../users/model/User')
const Case = require('../model/Case')


const createCase = async (req, res) => {
    try {
        const { caseName, defendant, summary } = req.body
        let id = res.locals.decodedToken.id
        console.log(id)
        let user = await User.findById({ _id: id })
        if (!user) {
            res.status(500).json({ success: false, message: 'User not found!'})
        }

        let caseData = {
            caseName,
            plaintiff: user,
            defendant,
            summary
        }
        let newCase = await new Case(caseData)
        const savedCase = await newCase.save()

        await savedCase.populate('plaintiff')

        res.status(200).json({ success: true, data: savedCase})
    } catch (error) {
        res.status(500).json({ success: true, error: error.message })
    }
}

const getAll = async (req, res) => {
    try {
        const cases = await Case.find({})

        res.status(200).json({ success: true, data: cases })
    } catch (error) {
        res.status(500).json({ success: false, error: error})
    }
}



module.exports = { createCase, getAll }