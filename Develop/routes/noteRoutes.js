const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const path = require('path');
const app = express();
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');


app.post('/notes', (req, res) => {
    console.log(req.body);
  
    const { title, body } = req.body;
  
    if (req.body) {
      const newPost = {
       title,
       body
      };
  
      readAndAppend(newPost, './db/db.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding Note');
    }
  });