'use strict';

var internalSchema = require('../model/internals.model');

module.exports = {
    internalstimetable: internalstimetable,
    listbysemester: listbysemester,
    listalltimetable: listalltimetable
};


// save internals timetable
function internalstimetable(req, res) {
    var internalschema = new internalSchema();
    internalschema.semester = req.body.semester;
    internalschema.dateTimeSub = req.body.dateTimeSub;

    var upsertQuery = { 'semester': internalschema.semester };

    var internalsschemaToUpdate = {};
    internalsschemaToUpdate = Object.assign(internalsschemaToUpdate, internalschema._doc);
    delete internalsschemaToUpdate._id;
    internalSchema.findOneAndUpdate(upsertQuery, internalsschemaToUpdate, { upsert: true }, function (err, doc) {
        if (err) {
            res.status(500).send({ success: false, error: err.name + ': ' + err.message });
        } else {
            res.send({ message: 'Internals deatils saved successfully' });
        }
    });
}

// list internal timetable by semester
function listbysemester(req, res) {
    internalSchema.findOne({ semester: req.swagger.params.semester.value }, function (err, internalsemester) {
        if (err)
            res.send(err);
        res.json(internalsemester);
    });
}

// list all internal timetable
function listalltimetable(req, res) {
    internalSchema.find({}, { _id: 0, semester: 1, dateTimeSub: 1 }, function (err, internalsemester) {
        res.send(internalsemester);
    });
}
