'use strict';
const mongoose = require('mongoose');

var externalexamdetails = new mongoose.Schema({
    date: String,
    subject: String
}, { _id: false });

var externalExamTimeTable = new mongoose.Schema({
    semester: String,
    externalexamdetails: [externalexamdetails]
}, { _id: false });

module.exports = mongoose.model('ExternalExamTimeTable', externalExamTimeTable);