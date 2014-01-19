'use strict';

var Datastore = require('nedb'),
	db = new Datastore(),
	data = require('../../data/contacts.json');

// populate the in-memory db
data.forEach(function(contact) {
	db.insert(contact);
});

exports.findAll = function(req, res) {
	db.find({}, function (err, contacts) {
		res.json(contacts);
	});
};