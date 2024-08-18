const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const axios = require('axios');
require('dotenv').config();
const port = process.env.PORT || 3000;

// เส้นทางไปยังไฟล์ build ของ Angular
app.use(express.static(path.join(__dirname, '../client/dist/client/browser')));

// Middleware สำหรับพาร์สข้อมูล JSON
app.use(express.json());

// Middleware สำหรับพาร์สข้อมูลแบบฟอร์มที่เข้ารหัสแบบ URL (เช่น application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// ================================================== API ==================================================
// เส้นทางไปยังไฟล์ข้อมูล
const dataFilePath = path.join(__dirname, 'assets/data');

app.post('/api/login', (req, res) => {
  fs.readFile(dataFilePath + '/users.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading data');
    }

    let users = JSON.parse(data)
    let user = users?.find?.(x => x.username === req?.body?.username && x.password === req?.body?.password)
    return res.json(user);
  });
})

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

app.post('/api/home', (req, res) => {
  fs.writeFile(dataFilePath + '/home.json', JSON.stringify(req.body, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Error writing data');
    }

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Replace with your GitHub token
    const REPO_OWNER = 'Supattalak-Phoha';
    const REPO_NAME = 'Intelligent-Global'; // Your repository name
    const FILE_PATH = dataFilePath + '/home.json'; // Local file path you want to upload
    const COMMIT_MESSAGE = 'Update Home Data';
    const TARGET_PATH = 'server/assets/data'; // Directory in the repository

    const uploadFileToGitHub = async () => {
      try {
        const fileName = path.basename(FILE_PATH);
        const fileContent = fs.readFileSync(FILE_PATH, { encoding: 'base64' });
        const fileUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${TARGET_PATH}/${fileName}`;

        // Check if the file already exists
        let sha = null;
        try {
          const response = await axios.get(fileUrl, {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
            },
          });
          sha = response.data.sha;
        } catch (error) {
          if (error.response && error.response.status === 404) {
            // File does not exist
            sha = null;
          } else {
            throw error;
          }
        }

        // Upload or update the file
        const response = await axios.put(
          fileUrl,
          {
            message: COMMIT_MESSAGE,
            content: fileContent,
            sha: sha, // Include sha if updating an existing file
          },
          {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('Update Data Success')
        return res.status(200).send({ message: 'Update Data Success' });
      } catch (error) {
        console.log(error)
        return res.status(500).send(error?.response?.data?.message);
      }
    };

    uploadFileToGitHub();
  });
});

app.post('/api/about-us', (req, res) => {
  fs.writeFile(dataFilePath + '/about-us.json', JSON.stringify(req.body, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Error writing data');
    }

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Replace with your GitHub token
    const REPO_OWNER = 'Supattalak-Phoha';
    const REPO_NAME = 'Intelligent-Global'; // Your repository name
    const FILE_PATH = dataFilePath + '/about-us.json'; // Local file path you want to upload
    const COMMIT_MESSAGE = 'Update About Us Data';
    const TARGET_PATH = 'server/assets/data'; // Directory in the repository

    const uploadFileToGitHub = async () => {
      try {
        const fileName = path.basename(FILE_PATH);
        const fileContent = fs.readFileSync(FILE_PATH, { encoding: 'base64' });
        const fileUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${TARGET_PATH}/${fileName}`;

        // Check if the file already exists
        let sha = null;
        try {
          const response = await axios.get(fileUrl, {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
            },
          });
          sha = response.data.sha;
        } catch (error) {
          if (error.response && error.response.status === 404) {
            // File does not exist
            sha = null;
          } else {
            throw error;
          }
        }

        // Upload or update the file
        const response = await axios.put(
          fileUrl,
          {
            message: COMMIT_MESSAGE,
            content: fileContent,
            sha: sha, // Include sha if updating an existing file
          },
          {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('Update Data Success')
        return res.status(200).send({ message: 'Update Data Success' });
      } catch (error) {
        console.log(error)
        return res.status(500).send(error?.response?.data?.message);
      }
    };

    uploadFileToGitHub();
  });
});

app.post('/api/services', (req, res) => {
  fs.writeFile(dataFilePath + '/services.json', JSON.stringify(req.body, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Error writing data');
    }

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Replace with your GitHub token
    const REPO_OWNER = 'Supattalak-Phoha';
    const REPO_NAME = 'Intelligent-Global'; // Your repository name
    const FILE_PATH = dataFilePath + '/services.json'; // Local file path you want to upload
    const COMMIT_MESSAGE = 'Update Service Data';
    const TARGET_PATH = 'server/assets/data'; // Directory in the repository

    const uploadFileToGitHub = async () => {
      try {
        const fileName = path.basename(FILE_PATH);
        const fileContent = fs.readFileSync(FILE_PATH, { encoding: 'base64' });
        const fileUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${TARGET_PATH}/${fileName}`;

        // Check if the file already exists
        let sha = null;
        try {
          const response = await axios.get(fileUrl, {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
            },
          });
          sha = response.data.sha;
        } catch (error) {
          if (error.response && error.response.status === 404) {
            // File does not exist
            sha = null;
          } else {
            throw error;
          }
        }

        // Upload or update the file
        const response = await axios.put(
          fileUrl,
          {
            message: COMMIT_MESSAGE,
            content: fileContent,
            sha: sha, // Include sha if updating an existing file
          },
          {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('Update Data Success')
        return res.status(200).send({ message: 'Update Data Success' });
      } catch (error) {
        console.log(error)
        return res.status(500).send(error?.response?.data?.message);
      }
    };

    uploadFileToGitHub();
  });
});

app.post('/api/contact-us', (req, res) => {
  fs.writeFile(dataFilePath + '/contact-us.json', JSON.stringify(req.body, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Error writing data');
    }

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Replace with your GitHub token
    const REPO_OWNER = 'Supattalak-Phoha';
    const REPO_NAME = 'Intelligent-Global'; // Your repository name
    const FILE_PATH = dataFilePath + '/contact-us.json'; // Local file path you want to upload
    const COMMIT_MESSAGE = 'Update Contact Us Data';
    const TARGET_PATH = 'server/assets/data'; // Directory in the repository

    const uploadFileToGitHub = async () => {
      try {
        const fileName = path.basename(FILE_PATH);
        const fileContent = fs.readFileSync(FILE_PATH, { encoding: 'base64' });
        const fileUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${TARGET_PATH}/${fileName}`;

        // Check if the file already exists
        let sha = null;
        try {
          const response = await axios.get(fileUrl, {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
            },
          });
          sha = response.data.sha;
        } catch (error) {
          if (error.response && error.response.status === 404) {
            // File does not exist
            sha = null;
          } else {
            throw error;
          }
        }

        // Upload or update the file
        const response = await axios.put(
          fileUrl,
          {
            message: COMMIT_MESSAGE,
            content: fileContent,
            sha: sha, // Include sha if updating an existing file
          },
          {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('Update Data Success')
        return res.status(200).send({ message: 'Update Data Success' });
      } catch (error) {
        console.log(error)
        return res.status(500).send(error?.response?.data?.message);
      }
    };

    uploadFileToGitHub();
  });
});

app.post('/api/app', (req, res) => {
  fs.writeFile(dataFilePath + '/app.json', JSON.stringify(req.body, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Error writing data');
    }

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Replace with your GitHub token
    const REPO_OWNER = 'Supattalak-Phoha';
    const REPO_NAME = 'Intelligent-Global'; // Your repository name
    const FILE_PATH = dataFilePath + '/app.json'; // Local file path you want to upload
    const COMMIT_MESSAGE = 'Update App Data';
    const TARGET_PATH = 'server/assets/data'; // Directory in the repository

    const uploadFileToGitHub = async () => {
      try {
        const fileName = path.basename(FILE_PATH);
        const fileContent = fs.readFileSync(FILE_PATH, { encoding: 'base64' });
        const fileUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${TARGET_PATH}/${fileName}`;

        // Check if the file already exists
        let sha = null;
        try {
          const response = await axios.get(fileUrl, {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
            },
          });
          sha = response.data.sha;
        } catch (error) {
          if (error.response && error.response.status === 404) {
            // File does not exist
            sha = null;
          } else {
            throw error;
          }
        }

        // Upload or update the file
        const response = await axios.put(
          fileUrl,
          {
            message: COMMIT_MESSAGE,
            content: fileContent,
            sha: sha, // Include sha if updating an existing file
          },
          {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('Update Data Success')
        return res.status(200).send({ message: 'Update Data Success' });
      } catch (error) {
        console.log(error)
        return res.status(500).send(error?.response?.data?.message);
      }
    };

    uploadFileToGitHub();
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