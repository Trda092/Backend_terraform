const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

app.post('/api/database', (req, res) => {
  const data = req.body;

  // Convert the data to JSON format
  const jsonData = JSON.stringify(data, null, 2);

  // Write the JSON data to a file
  fs.writeFile('./tf_test/database.json', jsonData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      res.status(500).json({ error: 'An error occurred while writing to the file.' });
    } else {
      console.log('Data written to file successfully.');
      res.json({ message: 'Data written to file successfully.' });
    }
  });
});


app.post('/api/s3', (req, res) => {
    const data = req.body;
  
    // Convert the data to JSON format
    const jsonData = JSON.stringify(data, null, 2);
  
    // Write the JSON data to a file
    fs.writeFile('./tf_test/s3.json', jsonData, 'utf8', (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        res.status(500).json({ error: 'An error occurred while writing to the file.' });
      } else {
        console.log('Data written to file successfully.');
        res.json({ message: 'Data written to file successfully.' });
      }
    });
  });

app.post('/api/ec2', (req, res) => {
    const data = req.body;
  
    // Convert the data to JSON format
    const jsonData = JSON.stringify(data, null, 2);
  
    // Write the JSON data to a file
    fs.writeFile('./tf_test/ec2.json', jsonData, 'utf8', (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        res.status(500).json({ error: 'An error occurred while writing to the file.' });
      } else {
        console.log('Data written to file successfully.');
        
        res.json({ message: 'Data written to file successfully.' });
      }
    });
  });
  
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
  