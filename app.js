const express = require('express');
const fs = require('fs');
const {execFile, exec} = require('child_process');

const app = express();
app.use(express.json());

//method post
app.post('/api/credentials', (req, res) => {
  const data = req.body;
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFile('./credentials.json', jsonData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      res.status(500).json({ error: 'An error occurred while writing to the file.' });
    } else {res.json({message: 'Data written to file successfully.'});
    }
  });
});


app.post('/api/database', (req, res) => {
  const data = req.body;
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFile('./tf_db/database.json', jsonData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      res.status(500).json({error: 'An error occurred while writing to the file.'});
    } else {
      exec('cd tf_db && terraform.exe init && terraform.exe plan -out conf && terraform.exe apply conf', (err, stdout, stderr)=>{
        if(err){
          console.log(`error: ${err.message}`);
          return;
        }
        if(stderr){
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`)
      })
      res.json({message: 'Data written to file successfully.'});
    }
  });
});

app.post('/api/s3', (req, res) => {
    const data = req.body;
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFile('./tf_s3/s3.json', jsonData, 'utf8', (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        res.status(500).json({ error: 'An error occurred while writing to the file.' });
      } else {
        exec('cd tf_s3 && terraform.exe init && terraform.exe plan -out conf && terraform.exe apply conf', (err, stdout, stderr)=>{
          if(err){
            console.log(`error: ${err.message}`);
            return;
          }
          if(stderr){
            console.log(`stderr: ${stderr}`);
            return;
          }
          console.log(`stdout: ${stdout}`)
        })
    res.json({ message: 'Data written to file successfully.' });
      }
    });
  });

app.post('/api/ec2', (req, res) => {
    const data = req.body;
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFile('./tf_ec2/ec2.json', jsonData, 'utf8', (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        res.status(500).json({ error: 'An error occurred while writing to the file.' });
      } else {
        exec('cd tf_ec2 && terraform.exe init && terraform.exe plan -out conf && terraform.exe apply conf', (err, stdout, stderr)=>{
          if(err){
            console.log(`error: ${err.message}`);
            return;
          }
          if(stderr){
            console.log(`stderr: ${stderr}`);
            return;
          }
          console.log(`stdout: ${stdout}`)
        })
  res.json({ message: 'Data written to file successfully.' });
      }
    });
  });

//method put
app.put('/api/database', (req, res) => {
  const data = req.body;
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFile('./tf_db/database.json', jsonData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      res.status(500).json({ error: 'An error occurred while writing to the file.' });
    } else {
      exec('cd tf_db && terraform.exe init && terraform.exe plan -out conf && terraform.exe apply conf', (err, stdout, stderr)=>{
        if(err){
          console.log(`error: ${err.message}`);
          return;
        }
        if(stderr){
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`)
      })
      res.json({ message: 'Data written to file successfully.' });
    }
  });
});

app.put('/api/s3', (req, res) => {
  const data = req.body;
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFile('./tf_s3/s3.json', jsonData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      res.status(500).json({ error: 'An error occurred while writing to the file.' });
    } else {
      exec('cd tf_s3 && terraform.exe init && terraform.exe plan -out conf && terraform.exe apply conf', (err, stdout, stderr)=>{
        if(err){
          console.log(`error: ${err.message}`);
          return;
        }
        if(stderr){
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`)
      })
      res.json({ message: 'Data written to file successfully.' });
    }
  });
});

app.put('/api/ec2', (req, res) => {
  const data = req.body;
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFile('./tf_ec2/ec2.json', jsonData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      res.status(500).json({ error: 'An error occurred while writing to the file.' });
    } else {
      exec('cd tf_ec2 && terraform.exe init && terraform.exe plan -out conf && terraform.exe apply conf', (err, stdout, stderr)=>{
        if(err){
          console.log(`error: ${err.message}`);
          return;
        }
        if(stderr){
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`)
      })
      res.json({ message: 'Data written to file successfully.' });
    }
  });
});

//method delete
app.delete('/api/database', (req, res) => {
  const data = req.body;
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFile('./tf_db/database.json', jsonData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      res.status(500).json({ error: 'An error occurred while writing to the file.' });
    } else {
      exec('cd tf_db && terraform.exe init && terraform.exe destroy', (err, stdout, stderr)=>{
        if(err){
          console.log(`error: ${err.message}`);
          return;
        }
        if(stderr){
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`)
      })
      res.json({ message: 'Data written to file successfully.' });
    }
  });
});

app.delete('/api/s3', (req, res) => {
  const data = req.body;
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFile('./tf_s3/s3.json', jsonData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      res.status(500).json({ error: 'An error occurred while writing to the file.' });
    } else {
      exec('cd tf_s3 && terraform.exe init && terraform.exe destroy', (err, stdout, stderr)=>{
        if(err){
          console.log(`error: ${err.message}`);
          return;
        }
        if(stderr){
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`)
      })
      res.json({ message: 'Data written to file successfully.' });
    }
  });
});

app.delete('/api/ec2', (req, res) => {
  const data = req.body;
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFile('./tf_ec2/ec2.json', jsonData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      res.status(500).json({ error: 'An error occurred while writing to the file.' });
    } else {
      exec('cd tf_ec2 && terraform.exe init && terraform.exe destroy', (err, stdout, stderr)=>{
        if(err){
          console.log(`error: ${err.message}`);
          return;
        }
        if(stderr){
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`)
      })
      res.json({ message: 'Data written to file successfully.' });
    }
  });
});

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
