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
    if (err) {
      totalContacts.reject(err);
    }
    else {
      totalContacts.resolve(count);
    }
  });

  db.find({})
  .sort(orderBy)
  .skip(+count * (+page - 1))
  .limit(+count)
  .exec(function (err, foundContacts) {
    if (err) {
      contacts.reject(err);
    }
    else {
      contacts.resolve(foundContacts);
    }
  });

  Q.all([
    totalContacts.promise, contacts.promise
  ])
  .catch(function (error) {
    res.send(500, error);
  })
  .spread(function (totalContacts, contacts) {
    res.json(createResponseObj(contacts, totalContacts));
  });
}

function insupdate(req, res) {
  var contact = req.body;

  if (contact._id) {
    db.update({ _id: contact._id }, contact, {},  function (err, numReplaced) {
      if (err) {
        res.send(500, err);
      }
      else if (numReplaced > 0) {
        res.send(200, numReplaced + ' contact/s updated!');
      }
      else {
        res.send(500, numReplaced + ' contact/s updated!')
      }
    });
  }
  else {
    db.insert(contact, function (err, newContact) {
      if (err) {
        res.send(500, err);
      }
      else {
        res.send(201, newContact);
      }
    });
  }
}

exports.find = find;
exports.insupdate = insupdate;
