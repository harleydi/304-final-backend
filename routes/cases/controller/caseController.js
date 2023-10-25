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

        let userBiD = req.body.defendant
        let userB = await User.findById({ _id: userBiD })
        if (!userB) {
            res.status(500).json({ success: false, message: 'UserB not found!'})
        }

        let caseData = {
            caseName,
            plaintiff: user,
            defendant: userB,
            summary
        }
        let newCase = await new Case(caseData)
        const savedCase = await newCase.save()

        let saveToUser = await User.findOneAndUpdate({ _id: user }, { $push : { cases: newCase._id }})
        await saveToUser.save()

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

const updateCase = async (req, res) => {
    try {
        const { id } = req.params
        const foundCase = await Case.findOneAndUpdate({ _id: id}, req.body)
        if (!foundCase) {
            res.status(500).json({ message: 'Cannot find Case', error: error})
        }

        const updatedCase = await foundCase.save()

        res.status(200).json({ success: true, data: updatedCase })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}



module.exports = { createCase, getAll, updateCase }