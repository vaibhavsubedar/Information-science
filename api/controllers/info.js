'use strict';

var infoSchema = require('../model/info.model');

module.exports = {   
    info: info,
    listallinfo: listallinfo,
    listbyspecificbranch: listbyspecificbranch,
    listbyspecificsemester: listbyspecificsemester,
    listbyspecificusn: listbyspecificusn,
    uploadstudentinfo: uploadstudentinfo
};

// save info
function info(req, res) {
    var infoschema = new infoSchema();
    infoschema.branch = req.body.branch;
    infoschema.semester = req.body.semester;
    infoschema.usn = req.body.usn;
    infoschema.personaldetails = req.body.personaldetails;
    infoschema.marksdetails = req.body.marksdetails;
    infoschema.otherdetails = req.body.otherdetails;

    var upsertQuery = { 'usn': infoschema.usn };

    var infoschemaToUpdate = {};
    infoschemaToUpdate = Object.assign(infoschemaToUpdate, infoschema._doc);
    delete infoschemaToUpdate._id;
    infoSchema.findOneAndUpdate(upsertQuery, infoschemaToUpdate, { upsert: true }, function (err, doc) {
        if (err) {
            res.status(500).send({ success: false, error: err.name + ': ' + err.message });
        } else {
            res.send({ message: 'Info deatils saved successfully' });
        }
    });
}

// List all info
function listallinfo(req, res) {
    infoSchema.find({}, { _id: 0, branch: 1, semester: 1, usn: 1, personaldetails: 1, marksdetails: 1, otherdetails:1 }, function (err, info) {
        res.send(info);
    });
}

// List info by branch
function listbyspecificbranch(req, res) {
    infoSchema.findOne({ branch: req.swagger.params.branch.value }, function (err, branchinfo) {
        if (err)
            res.send(err);
        res.json(branchinfo);
    });
}

// List info by semester
function listbyspecificsemester(req, res) {
    infoSchema.findOne({ semester: req.swagger.params.semester.value }, function (err, semesterinfo) {
        if (err)
            res.send(err);
        res.json(semesterinfo);
    });
}

// List info by usn
function listbyspecificusn(req, res) {
    infoSchema.findOne({ usn: req.swagger.params.usn.value }, function (err, usninfo) {
        if (err)
            res.send(err);
        res.json(usninfo);
    });
}

// Api for upload from excel
function uploadstudentinfo(req, res) {
    var XLSX = require('xlsx');
    var workbook = XLSX.read(req.swagger.params.file.value.buffer, { type: "buffer" });
    //console.log('this is workbook',workbook);
    var first_sheet_name = workbook.SheetNames[0];
//console.log(first_sheet_name); to print sheet number
    var worksheet_type = workbook.Sheets[first_sheet_name];
  //console.log(worksheet_type);
    var info = XLSX.utils.sheet_to_json(worksheet_type);
    console.log(info);
    var infoschema = new infoSchema();
    infoschema.branch = info.branch;
    infoschema.semester = info.semester;
    infoschema.usn = info.usn;
    infoschema.personaldetails = info.personaldetails;
    infoschema.marksdetails = info.marksdetails;
    infoschema.otherdetails = info.otherdetails;
    infoschema.save(function (err, doc) {
        if (err) res.send({ message: 'Error Creating Student Info' });
        else {
            res.send({ message: 'Student Info created successfully' });

        }
    });
}