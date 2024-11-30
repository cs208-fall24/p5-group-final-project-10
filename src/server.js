import express from 'express'
import sql from 'sqlite3'
import fs from 'fs'

const sqlite3 = sql.verbose()

// Create an in memory table to use
const db = new sqlite3.Database(':memory:')

const app = express()
app.use(express.static('public'))
app.set('views', 'views')
app.set('view engine', 'pug')
//app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Initialize a table specifically for "Prompt Engineering"
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS PromptEngineering (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      review TEXT NOT NULL
    )
  `);
});

app.get('/', function (req, res) {
  console.log('GET called')
  res.render('index')
})

//----- STUDENT 1
app.get('/student1', function (req, res) {
  console.log('GET called')
  res.render('student1')
})

app.post('/deleteComment', function (req, res){
  console.log(req.body.value);
  const lineToDelete = req.body.value;

  fs.readFile("public/Data.txt", 'utf8', (err, data) => {
    if(err){
      console.error('Error reading the file:', err);
      return;
    }

    let lines = data.split('\n');

    lines = lines.filter((line, index) => index !== lineToDelete);

    const updatedContent = lines.join('\n');

    fs.writeFile("public/Data.txt", updatedContent, 'utf8', (err) => {
      if(err) {
        console.error('Error writing to the file:', err);
      } else {
        console.log('Line deleted successfully.');
      }
    });
  });
})

app.post('/print', function (req, res){
  console.log('POST called')
  console.log(req.body.value);
})

app.post('/addComment', function (req, res) {
  console.log('POST called')
  console.log(req.body.value)

  const textToAppend = '\n' + req.body.value;

  const filePath = 'public/Data.txt';

  fs.appendFile(filePath, textToAppend, (err) => {
  if (err) {
      console.log('Error appending to file:', err);
  } else {
      console.log('Text successfully appended!');
  }
  });
})

app.post('/editComment', function (req, res){
  console.log('POST called')
  
  fs.readFile("public/Data.txt", 'utf8', (err, data) => {
    if(err){
      console.error('Error reading the file: ', err);
      return;
    }

    const lines = data.split('\n');

    lines[req.body.index] = req.body.value;

    const updatedContent = lines.join('\n');

    fs.writeFile("public/Data.txt", updatedContent, 'utf8', (err) => {
      if(err){
        console.error('Error writing to the file: ', err);
      } else {
        console.log('File updated successfully!');
      }
    })
  })
})

app.get('/comments', function (req, res){
  console.log('GET called')
  res.render('student1/comments')
})
//----- STUDENT 1

app.get('/student2', function (req, res) {
  db.all('SELECT review FROM PromptEngineering ORDER BY RANDOM() LIMIT 5', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Database error');
    } else {
      const reviews = rows.map(row => row.review);
      res.render('student2/index', { reviews }); // Include subdirectory in path
    }
  });
});

// Student 2 reviews page
app.get('/student2/reviews', function (req, res) {
  db.all('SELECT id, review FROM PromptEngineering', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Database error');
    } else {
      res.render('student2/reviews', { reviews: rows }); // Include subdirectory in path
    }
  });
});

// Add a new review for Student 2
app.post('/student2/reviews/add', function (req, res) {
  const { review } = req.body;
  if (!review) {
    res.redirect('/student2/reviews');
    return;
  }
  db.run('INSERT INTO PromptEngineering (review) VALUES (?)', [review], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Database error');
    } else {
      res.redirect('/student2/reviews');
    }
  });
});

// Delete a review for Student 2
app.post('/student2/reviews/delete/:id', function (req, res) {
  const { id } = req.params;
  db.run('DELETE FROM PromptEngineering WHERE id = ?', [id], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Database error');
    } else {
      res.redirect('/student2/reviews');
    }
  });
});

// Edit a review for Student 2
app.post('/student2/reviews/edit/:id', function (req, res) {
  const { id } = req.params;
  const { review } = req.body;
  if (!review) {
    res.redirect('/student2/reviews');
    return;
  }
  db.run('UPDATE PromptEngineering SET review = ? WHERE id = ?', [review, id], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Database error');
    } else {
      res.redirect('/student2/reviews');
    }
  });
});


app.get('/student3', function (req, res) {
  console.log('GET called')
  res.render('student3')
})

// Start the web server
app.listen(3000, function () {
  console.log('Listening on port 3000...')
})