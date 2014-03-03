'use strict';

var Datastore = require('nedb'),
	db = new Datastore(),
	data = require('../../data/contacts.json'),
	Q = require('q');

// populate the in-memory db
data.forEach(function(contact) {
	db.insert(contact);
});

function createResponseObj(data, totalLength) {
	return {
		data: data,
		count: totalLength
	};
}

function find(req, res) {
	var count = req.query.count || 5,
		page = req.query.page || 1,
		orderBy = req.query.orderBy ? JSON.parse(req.query.orderBy) : { '_id': 1 },
		totalContacts = Q.defer(),
		contacts = Q.defer();

	// TODO: validate ALL parameters

	db.count({}, function(err, count) {
		totalContacts.resolve(count);
	});

	db.find({})
	.sort(orderBy)
	.skip(+count * (+page - 1))
	.limit(+count)
	.exec(function (err, foundContacts) {
		contacts.resolve(foundContacts);
	});

	Q.all([
		totalContacts.promise, contacts.promise
	])
	.spread(function (totalContacts, contacts) {
		res.json(createResponseObj(contacts, totalContacts));
	});
}

function update(req, res) {
	var contact = req.body;

	db.update({ _id: contact._id }, contact, { upsert: true },  function (err, numReplaced) {
		res.send(201, numReplaced + ' contact/s created!');
	});
}

exports.find = find;
exports.update = update;
