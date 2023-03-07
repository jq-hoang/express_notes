const express = require('express');
const htmlRoutes = require('./routes/htmlroutes');
const noteRoutes = require('./routes/noteRoutes');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();



app.use(express.static('public'));
app.use('/', htmlRoutes)
app.use('/api', noteRoutes)

// GET Route for feedback page
app.get('/feedback', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/feedback.html'))
);

// Wildcard route to direct users to index page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);


