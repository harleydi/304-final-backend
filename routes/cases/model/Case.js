const mongoose = require('mongoose')
const { v4: uuid } = require('uuid')


const caseSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuid
    },
    caseName: {
        type: String
    },
    plaintiff: {
        type: String,
        ref: 'User'
    },
    defendant: String,
    summary: String,
    caseStatus: {
        type: String,
        enum: ['open', 'closed', 'pending'],
        default: 'open'
    },
    category: {
        type: String,
        default: 'general'
    },
    statements: {
        type: Object,
        default: {}
    },
    plaintiffEvidence: {
        type: Array,
        default: []
    },
    defendantEvidence: {
        type: Array,
        default: []
    },
    jurors: {
        type: Array,
        default: []
    },
    verdict: {
        type: String,
        default: 'null'
    },
    comments: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model("Case", caseSchema)