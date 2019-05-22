'use strict';
const mongoose = require('mongoose');

var dateTimeSub = new mongoose.Schema({
    date: String,
    subject: String
}, { _id: false });

var internalExamTimeTables = new mongoose.Schema({
    semester: String,
    dateTimeSub: [dateTimeSub]
}, { _id: false });

module.exports = mongoose.model('InternalExamTimeTables', internalExamTimeTables);