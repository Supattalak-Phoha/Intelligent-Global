const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// เส้นทางไปยังไฟล์ build ของ Angular
app.use(express.static(path.join(__dirname, '../client/dist/client/browser')));

// ================================================== API ==================================================
// เส้นทางไปยังไฟล์ข้อมูล
const dataFilePath = path.join(__dirname, 'assets/data');

app.get('/api/app', (req, res) => {
  fs.readFile(dataFilePath + '/app.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading data');
    }
    res.json(JSON.parse(data));
  });
});

app.get('/api/home', (req, res) => {
  fs.readFile(dataFilePath + '/home.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading data');
    }
    res.json(JSON.parse(data));
  });
});

app.get('/api/about-us', (req, res) => {
  fs.readFile(dataFilePath + '/about-us.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading data');
    }
    res.json(JSON.parse(data));
  });
});

app.get('/api/services', (req, res) => {
  fs.readFile(dataFilePath + '/services.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading data');
    }
    res.json(JSON.parse(data));
  });
});

app.get('/api/contact-us', (req, res) => {
  fs.readFile(dataFilePath + '/contact-us.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading data');
    }
    res.json(JSON.parse(data));
  });
});
// ================================================== API ==================================================

// ส่งไฟล์ index.html เมื่อเข้าถึง URL ที่ไม่ใช่ API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/client/browser/index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});