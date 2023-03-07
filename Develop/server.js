const express = require('express');
const path = require('path');
const uuid = require('./helpers/uuid');

// const { v4: uuidv4 } = require('uuid');


const PORT = process.env.PORT || 3001;

const app = express();

const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('./helpers/fsUtils');


app.use(express.static('public'));
app.use(express.json()); // Add this line to parse JSON request body

// GET Route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);



app.post('/api/notes', (req, res) => {
    console.log(`${req.method} request received to add a note`);
  
    const { title, text } = req.body;
  
    if (title && text) {
      const newNote = {
        title,
        text,
        id: uuid(),
      };
  
      readAndAppend(newNote, './db/db.json');
      const response = {
        status: 'success',
        body: newNote,
      };
      res.json(response);
    } else {
      res.status(400).send('The note is not formatted properly');
    }
  });
  

// DELETE Route for deleting a note
app.delete('/api/notes/:id', (req, res) => {
    console.log(`${req.method} request received to delete a note`);

    const { id } = req.params;

    readFromFile('./db/db.json').then((data) => {
        let parsedNotes = JSON.parse(data);

        let filteredNotes = parsedNotes.filter(note => note.id !== id);

        return filteredNotes;

    }).then(response => {

        writeToFile('./db/db.json', response);

        res.json(response);
    });
});

// GET Route for all notes
app.get('/api/notes', (req, res) => {
    console.log(`${req.method} request received for all notes`);

    readFromFile('./db/db.json').then((data) => {
        const notes = JSON.parse(data);
        res.json(notes);
    }).catch((err) => {
        console.error(err);
        // res.json([]);
    });
});


// Wildcard route to direct users to a 404 page
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);


module.exports = uuid;
