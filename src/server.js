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
