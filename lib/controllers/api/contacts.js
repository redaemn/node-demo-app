'use strict';

var Datastore = require('nedb'),
	db = new Datastore(),
	data = require('../../data/contacts.json');

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

exports.findAll = function(req, res) {
	var count = req.query.count || 5,
		page = req.query.page || 1,
		orderBy = req.query.orderBy ? JSON.parse(req.query.orderBy) : { field: 'id', direction: 'asc' },
		totalContacts;

	if (orderBy.direction !== "asc" && orderBy.direction !== "desc") {
		res.send(400, 'Wrong "orderBy.direction" parameter');
	}

	db.find({}, function (err, contacts) {
		totalContacts = contacts.length;

		contacts.sort(function(a, b) {
			if (a[orderBy.field] > b[orderBy.field])
				return orderBy.direction === "asc" ? 1 : -1;
			if (a[orderBy.field] < b[orderBy.field])
				return orderBy.direction === "asc" ? -1 : 1;

			return 0;
		});

		contacts = contacts.slice(count * (page - 1), count * page);

		res.json(createResponseObj(contacts, totalContacts));
	});
};