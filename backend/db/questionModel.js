
const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    questions: {
        type: Object,
    },

    


})

module.exports = mongoose.model.questions || mongoose.model("questions", QuestionSchema);
