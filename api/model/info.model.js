'use strict';
const mongoose = require('mongoose');

// student marks details
var tenthmarks = new mongoose.Schema({
    yop: Number,
    aggregate: Number,
    board: String
}, { _id: false });

var pucmarks = new mongoose.Schema({
    yop: Number,
    aggregate: Number,
    board: String
}, { _id: false });

var diplomamarks = new mongoose.Schema({
    yop: Number,
    aggregate: Number,
    board: String
}, { _id: false });

var engineeringmarks = new mongoose.Schema({
    firstsem: Number,
    secondsem: Number,
    thirdsem: Number,
    fourthsem: Number,
    fifthsem: Number,
    sixthsem: Number,
    seventhsem: Number,
    eighthsem: Number
}, { _id: false });

var marksdetails = new mongoose.Schema({
    tenthmarks: tenthmarks,
    pucmarks: pucmarks,
    diplomamarks: diplomamarks,
    engineeringmarks: engineeringmarks,
    currentaggreegate: Number
}, { _id: false });


// student father details
var fatherdetails = new mongoose.Schema({
    name: String,
    dob: Date,
    contactno: Number,
    email: String
}, { _id: false });

// student personal details
var personaldetails = new mongoose.Schema({
    firstname: String,
    lastname: String,
    fullname: String,
    dob: Date,
    gender: String,
    contactno: Number,
    email: String,
    fatherdetails: fatherdetails
}, { _id: false });

// other details of student
var otherdetails = new mongoose.Schema({
    yearofjoining: Number,
    currentaddress: String,
    permanentaddress: String,
    seattype: String,
    entranceexamrank: Number,
    religion: String,
    caste: String
}, { _id: false });

// student complete details
// all sub-details inherited for main schema
var infoSchema = new mongoose.Schema({
    branch: String,
    semester: String,
    usn: String,
    personaldetails: personaldetails,
    marksdetails: marksdetails,
    otherdetails: otherdetails    
}, { _id: false });


module.exports = mongoose.model('InfoSchema', infoSchema);
