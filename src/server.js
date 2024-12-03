import express from 'express'
import sql from 'sqlite3'

const sqlite3 = sql.verbose()

// Create an in memory table to use
const db = new sqlite3.Database(':memory:')

const app = express()
app.use(express.static('public'))
app.set('views', 'views')
app.set('view engine', 'pug')
app.use(express.urlencoded({ extended: false }))

// Initialize a table specifically for "Prompt Engineering"
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS PromptEngineering (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      comment TEXT NOT NULL
    )
  `);
});

app.get('/', function (req, res) {
  console.log('GET called')
  res.render('index')
})

app.get('/student1', function (req, res) {
  console.log('GET called')
  res.render('student1')
})

app.get('/student2', function (req, res) {
  db.all('SELECT comment FROM PromptEngineering ORDER BY RANDOM() LIMIT 5', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Database error');
    } else {
      const comments = rows.map(row => row.comment);
      res.render('student2', { comments });
    }
  });
});

// Student 2 comments page
app.get('/student2/comments', function (req, res) {
  db.all('SELECT id, comment FROM PromptEngineering', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Database error');
    } else {
      res.render('comments', { comments: rows });
    }
  });
});

// Add a new comment for Student 2
app.post('/student2/comments/add', function (req, res) {
  const { comment } = req.body;
  if (!comment) {
    res.redirect('/student2/comments');
    return;
  }
  db.run('INSERT INTO PromptEngineering (comment) VALUES (?)', [comment], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Database error');
    } else {
      res.redirect('/student2/comments');
    }
  });
});

// Delete a comment for Student 2
app.post('/student2/comments/delete/:id', function (req, res) {
  const { id } = req.params;
  db.run('DELETE FROM PromptEngineering WHERE id = ?', [id], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Database error');
    } else {
      res.redirect('/student2/comments');
    }
  });
});

// Edit a comment for Student 2
app.post('/student2/comments/edit/:id', function (req, res) {
  const { id } = req.params;
  const { comment } = req.body;
  if (!comment) {
    res.redirect('/student2/comments');
    return;
  }
  db.run('UPDATE PromptEngineering SET comment = ? WHERE id = ?', [comment, id], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Database error');
    } else {
      res.redirect('/student2/comments');
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
