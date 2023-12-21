const User = require('../../users/model/User')
const Case = require('../model/Case')


const createCase = async (req, res) => {
    try {
        const { caseName, defendant, plaintiffEvidence, summary } = req.body
        let id = res.locals.decodedToken.id
        console.log(id)
        let user = await User.findById({ _id: id })
        if (!user) {
            res.status(500).json({ success: false, message: 'User not found!'})
        }

        
        let userB = await User.findById({ _id: defendant })
        if (!userB) {
            res.status(500).json({ success: false, message: 'UserB not found!'})
        }

        // let caseData = {
        //     caseName,
        //     plaintiff: user,
        //     defendant: userB,
        //     plaintiffEvidence,
        //     summary
        // }
        // console.log(caseData)
        let newCase = await new Case(req.body)
        const savedCase = await newCase.save()
        console.log(savedCase)

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