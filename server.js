import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { MongoClient, ObjectID } from 'mongodb';
import atob from 'atob';
const path = require('path');

var db;
const dbUrl = "mongodb://localhost:27017";
const dbName = "contacts";

const serverPort = "8080";

const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'public')));

MongoClient.connect(dbUrl, { promiseLibrary: Promise }, (error, client) => {
  if (error) {
    console.log('There was an error while trying to connect to the database.', error);
  }

  console.log('Successfully connected to MongoDB.');

  db = client.db(dbName);

  const server = app.listen(serverPort, () => {
    console.log(`App now running on port ${serverPort}.`);
  });
});

app.get('/contacts', (req, res) => {
  const { query } = req;
  let filters = {};

  if (Object.keys(query).length > 0) {
    filters = {
      phone: atob(query.phone)
    };

    if (query.id !== 'undefined' && query.id.length > 0) {
      Object.assign(filters, {
        _id: {
          '$ne': new ObjectID(query.id)
        }
      });
    }
  }

  db.collection(dbName).find(filters).toArray((error, docs) => {
    if (error) {
      handleError(res, error.message, "Failed to fetch contacts");
    } else {
      let contacts = [];

      docs.forEach(doc => {
        contacts.push({
          id: doc._id,
          name: doc.name,
          phone: doc.phone,
          email: doc.email
        });
      });

      res.status(200).json(contacts);
    }
  })
});

app.get('/contacts/:id', (req, res) => {
  db.collection(dbName).findOne({ _id: new ObjectID(req.params.id) }, (error, doc) => {
    if (error) {
      handleError(res, error.message, 'Failed to fetch contact', 404);
    } else {
      res.status(200).json({
        id: doc._id,
        name: doc.name,
        phone: doc.phone,
        email: doc.email
      });
    }
  })
});

app.post('/contacts', (req, res) => {
  const { body }  = req;

  if (!(body.name || body.email)) {
    handleError(res, "Invalid user input", "Must provide name and e-mail at least", 400);
    return;
  }

  db.collection(dbName).insertOne(body, (error, doc) => {
    if (error) {
      handleError(res, error.message, 'Failed to create contact');
    } else {
      res.status(201).json(doc.ops[0]);
    }
  })
});

app.put('/contacts/:id', (req, res) => {
  let { body } = req;

  delete body.id;

  db.collection(dbName).updateOne({ _id: new ObjectID(req.params.id) }, { $set: body }, (error, doc) => {
    if (error) {
      handleError(res, error.message, 'Failed to update contact');
    } else {
      res.status(204).end();
    }
  });
});

app.delete('/contacts/:id', (req, res) => {
  db.collection(dbName).deleteOne({ _id: new ObjectID(req.params.id) }, (error, result) => {
    if (error) {
      handleError(res, error.message, "Failed to delete contact");
    } else {
      res.status(204).end();
    }
  })
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

const handleError = (res, reason, message, code) => {
  console.log(`Error: ${reason}`);
  res.status(code || 500).json({ error: message });
};
