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

app.get('/', function (req, res) {
  console.log('GET called')
  res.render('index')
})

//-----
app.get('/student1', function (req, res) {
  console.log('GET called')
  res.render('student1')
})

app.post('/addComment', function (req, res) {
  console.log(req.body)

  // The text you want to append
  const textToAppend = '\n' + req.body.value;

  // The file path (it should be an existing file)
  const filePath = 'public/Data.txt';

  if (fs.existsSync(filePath)) {
    console.log('File exists');
  } else {
    console.log('File does not exist');
  }

  // Append the text to the file
  fs.appendFile(filePath, textToAppend, (err) => {
  if (err) {
      console.log('Error appending to file:', err);
  } else {
      console.log('Text successfully appended!');
  }
  });
})

app.get('/comments', function (req, res){
  console.log('GET called')
  res.render('student1/comments')
})
//-----

app.get('/student2', function (req, res) {
  console.log('GET called')
  res.render('student2')
})

app.get('/student3', function (req, res) {
  console.log('GET called')
  res.render('student3')
})

// Start the web server
app.listen(3000, function () {
  console.log('Listening on port 3000...')
})
