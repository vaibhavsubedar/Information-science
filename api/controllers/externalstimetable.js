'use strict';

var externalSchema = require('../model/externals.model');

module.exports = {
    externalstimetable: externalstimetable,
    listexternalsbysemester: listexternalsbysemester,
    listallexternalexam: listallexternalexam
};


// save internals timetable
function externalstimetable(req, res) {
    var externalschema = new externalSchema();
    externalschema.semester = req.body.semester;
    externalschema.externalexamdetails = req.body.externalexamdetails;

    var upsertQuery = { 'semester': externalschema.semester };

    var externalschemaToUpdate = {};
    externalschemaToUpdate = Object.assign(externalschemaToUpdate, externalschema._doc);
    delete externalschemaToUpdate._id;
    externalSchema.findOneAndUpdate(upsertQuery, externalschemaToUpdate, { upsert: true }, function (err, doc) {
        if (err) {
            res.status(500).send({ success: false, error: err.name + ': ' + err.message });
        } else {
            res.send({ message: 'External exam deatils saved successfully' });
        }
    });
}

// list external timetable by semester
function listexternalsbysemester(req, res) {
    externalSchema.findOne({ semester: req.swagger.params.semester.value }, function (err, externalexam) {
        if (err)
            res.send(err);
        res.json(externalexam);
    });
}

// list all external timetable
function listallexternalexam(req, res) {
    externalSchema.find({}, { _id: 0, semester: 1, externalexamdetails: 1 }, function (err, externals) {
        res.send(externals);
    });
}
