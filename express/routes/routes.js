const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, '../documents'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-profile-' + file.originalname);
    }
});

const fileUpload = multer({
    storage: diskstorage
}).single('image');

router.get('/', (req, res) => {
    res.send('Welcome to my image app');
});

router.post('/documents/post', fileUpload, (req, res) => {
    const { originalname, mimetype } = req.file;

    const filename = req.file.filename;

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            return res.status(500).send('server error');
        }

        conn.query('INSERT INTO filedata (filename) VALUES (?)', [filename], (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).send('server error');
            }

            fs.readFile(path.join(__dirname, '../documents/' + filename), (err, data) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('server error');
                }

                alert('Image and data saved!');
            });
        });
    });
});

module.exports = router;
