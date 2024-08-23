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
app.use(express.json({ limit: '10mb' }));

// Middleware สำหรับพาร์สข้อมูลแบบฟอร์มที่เข้ารหัสแบบ URL (เช่น application/x-www-form-urlencoded)
app.use(express.urlencoded({ limit: '10mb', extended: true }));

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

    let result = JSON.parse(data)
    fs.readFile(dataFilePath + '/services.json', 'utf8', (err, services) => {
      if (err) {
        return res.status(500).send('Error reading data');
      }

      let serviceObj = JSON.parse(services)
      result.arrays.array002 = serviceObj.arrays.array001

      fs.readFile(dataFilePath + '/users.json', 'utf8', (err, users) => {
        if (err) {
          return res.status(500).send('Error reading data');
        }

        let usersObj = JSON.parse(users)
        result.arrays.array003 = usersObj
        res.json(result);
      });
    });
  });
});

app.get('/api/home', (req, res) => {
  fs.readFile(dataFilePath + '/home.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading data');
    }

    let result = JSON.parse(data)
    fs.readFile(dataFilePath + '/services.json', 'utf8', (err, services) => {
      if (err) {
        return res.status(500).send('Error reading data');
      }

      let serviceObj = JSON.parse(services)
      result.arrays.array002 = serviceObj.arrays.array001

      fs.readFile(dataFilePath + '/users.json', 'utf8', (err, users) => {
        if (err) {
          return res.status(500).send('Error reading data');
        }

        let usersObj = JSON.parse(users)
        result.arrays.array004 = usersObj
        res.json(result);
      });

    });
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

app.get('/api/service-detail/:code', (req, res) => {
  fs.readFile(dataFilePath + '/services.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading data');
    }

    let services = JSON.parse(data)
    let service = services?.arrays?.array001?.find(x => x.code === req.params.code)
    let resp = {
      images: {
        "image001": services?.images?.image001
      },
      service: service
    }

    res.json(resp);
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

app.get('/api/users', (req, res) => {
  fs.readFile(dataFilePath + '/users.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading data');
    }
    res.json(JSON.parse(data));
  });
});

app.get('/api/images', (req, res) => {
  const folderImagesPath = path.join(__dirname, '../client/public/assets/images')
  let images = []
  fs.readdir(folderImagesPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    files = files.filter(file => file.search(/\./) != -1);
    files.forEach(file => {
      images?.push(
        {
          fileName: file,
          path: "assets/images/" + file
        }
      )
    });

    let data = {
      images: images
    }
    res.json(data);
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

app.post('/api/users', (req, res) => {
  fs.writeFile(dataFilePath + '/users.json', JSON.stringify(req.body, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Error writing data');
    }

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Replace with your GitHub token
    const REPO_OWNER = 'Supattalak-Phoha';
    const REPO_NAME = 'Intelligent-Global'; // Your repository name
    const FILE_PATH = dataFilePath + '/users.json'; // Local file path you want to upload
    const COMMIT_MESSAGE = 'Update Users Data';
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
              Authorization: `token ${GITHUB_TOKEN}`
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



const multer = require('multer');
// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../client/public/assets/images'); // Specify the upload directory
    cb(null, '../client/dist/client/browser/assets/images'); // เพื่อให้เปลี่บยนใน folder build ด้วย
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Rename file with timestamp
    // cb(null, 'abouttttt-us-002' + path.extname(file.originalname)); // Rename file with timestamp
  }
});
const upload = multer({ storage: storage });
// Create the uploads directory if it does not exist
const uploadDir = '../client/public/assets/images';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.post('/api/uploadImage', upload.single('file'), (req, res) => {
  // Log file information
  console.log('File:', req.file); // Contains details about the uploaded file
  console.log('Original Filename:', req.file.originalname);
  console.log('Filename:', req.file.filename);
  console.log('Mimetype:', req.file.mimetype);
  console.log('Size:', req.file.size);

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Replace with your GitHub token
  const REPO_OWNER = 'Supattalak-Phoha';
  const REPO_NAME = 'Intelligent-Global'; // Your repository name
  const FILE_PATH = '../client/public/assets/images/'; // Local file path you want to upload
  const COMMIT_MESSAGE = 'Update File';
  const TARGET_PATH = 'client/public/assets/images'; // Directory in the repository

  const uploadFileToGitHub = async () => {
    try {
      const fileName = path.basename(FILE_PATH + req.file.filename);
      const fileContent = fs.readFileSync(FILE_PATH + req.file.filename, { encoding: 'base64' });
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

      console.log('File uploaded successfully');
      return res.status(200).send({ message: 'File uploaded successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).send(error?.response?.data?.message);
    }
  };

  uploadFileToGitHub();
});

app.delete('/api/deleteImage/:filename', async (req, res) => {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Replace with your GitHub token
  const REPO_OWNER = 'Supattalak-Phoha';
  const REPO_NAME = 'Intelligent-Global'; // Your repository name
  const TARGET_PATH = 'client/public/assets/images'; // Directory in the repository
  const filename = req.params.filename;
  const fileUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${TARGET_PATH}/${filename}`;

  try {
    let filePath = path.join(__dirname, '../client/public/assets/images/' + filename)
    fs.unlink(filePath, (err) => {
      if (err) {
        throw err;
      }
    });

    // Get the SHA of the file to be deleted
    const response = await axios.get(fileUrl, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const sha = response.data.sha;

    // Delete the file
    await axios.delete(fileUrl, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      data: {
        message: 'Delete File',
        sha: sha,
      },
    });

    console.log('File deleted successfully');
    return res.status(200).send({ message: 'File deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error?.response?.data?.message);
  }
});
// ================================================== API ==================================================

// ส่งไฟล์ index.html เมื่อเข้าถึง URL ที่ไม่ใช่ API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/client/browser/index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});