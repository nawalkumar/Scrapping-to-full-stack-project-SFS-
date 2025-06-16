const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const port = 5000;

app.use(cors());

app.use(express.json());

const csvFilePath = './categorized_school_images.csv';

app.get('/', (req, res) => {
    res.json({ message: 'Hello developer, your server is running properly' });
});

app.get('/api/data', (req, res) => {
    const results = [];

    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.json(results);
        })
        .on('error', (error) => {
            console.error('Error reading CSV file:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

app.get('/api/data/:id', (req, res) => {
    const itemId = req.params.id;
    let foundItem = null;

    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
            if (row.ID === itemId) {
                foundItem = row;
            }
        })
        .on('end', () => {
            if (foundItem) {
                res.json(foundItem);
            } else {
                res.status(404).json({ error: 'Item not found' });
            }
        })
        .on('error', (error) => {
            console.error('Error reading CSV file:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});