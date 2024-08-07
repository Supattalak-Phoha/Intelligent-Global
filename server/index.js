const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// เส้นทางไปยังไฟล์ build ของ Angular
app.use(express.static(path.join(__dirname, '../client/dist/client/browser')));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// ส่งไฟล์ index.html เมื่อเข้าถึง URL ที่ไม่ใช่ API
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/client/browser/index.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
