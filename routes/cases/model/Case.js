const mongoose = require('mongoose')
const { v4: uuid } = require('uuid')

const subSchema = new mongoose.Schema({
    type: String,
    source: String,
    description: String,
    argumentPhase: String
})


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
    defendant: {
        type: String,
        ref: 'user'
        
    },
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
    plaintiffStatements: {
        type: Object,
        default: {
            "opening": "",
            "argument": "",
            "closing": ""
        }
    },
    defendantStatements: {
        type: Object,
        default: {
            "opening": "",
            "argument": "",
            "closing": ""
        }
    },
    plaintiffEvidence: [subSchema],
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