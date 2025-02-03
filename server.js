const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const QUESTIONS_PATH = path.join(__dirname, 'questions.json');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile(path.join(PUBLIC_DIR, 'index.html'), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading index.html');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.url === '/questions') {
    fs.readFile(QUESTIONS_PATH, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading questions');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      }
    });
  } else if (req.url.endsWith('.css')) {
    fs.readFile(path.join(PUBLIC_DIR, req.url), (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('CSS file not found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(data);
      }
    });
  } else if (req.url.endsWith('.js')) {
    fs.readFile(path.join(PUBLIC_DIR, req.url), (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('JavaScript file not found');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(3000, () => {
    console.log(`Server is running on http://localhost:${3000}`);
});