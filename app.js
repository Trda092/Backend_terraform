const express = require('express');
const fs = require('fs');
const {execFile, exec} = require('child_process');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
dotenv.config()
app.use(express.json());

//databases
var mysql = require('mysql2')
var connection = mysql.createConnection({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
})
connection.connect(function (err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack)
    return
  }
  console.log('Connected to database.')
})
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
      connection.query('insert into db (idf, username, password, access) values (?,?,?,?)', [data.db_idf, data.db_username, data.db_password, data.db_access])
      res.send("put data success, creating on process")
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
        connection.query('insert into s3 (name, access) values (?,?)', [data.s3_bucket, data.s3_public_access])
        res.send("put data success, creating on process")
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
        connection.query('insert into ec2 (os,name, state) values (?,?,?)', [data.ec2_os, data.ec2_name, data.ec2_state])
        res.send("put data success, creating on process")
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
      connection.query('update db set access = ? where idf = ?', [data.db_access, data.db_idf])
        res.send("access changed")
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
      connection.query('update s3 set access = ? where name = ?', [data.s3_public_access, data.s3_bucket])
        res.send("access changed")
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
      connection.query('update ec2 set state = ? where name = ?', [data.ec2_state, data.ec2_name])
        res.send("state changed")
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
      exec('cd tf_db && terraform.exe init && terraform.exe destroy -auto-approve', (err, stdout, stderr)=>{
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
      connection.query('delete from db where idf = ?', [data.db_idf])
        res.send("deleted")
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
      exec('cd tf_s3 && terraform.exe init && terraform.exe destroy -auto-approve', (err, stdout, stderr)=>{
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
      connection.query('delete from s3 where name = ?', [data.s3_bucket])
        res.send("deleted")
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
      exec('cd tf_ec2 && terraform.exe init && terraform.exe destroy -auto-approve', (err, stdout, stderr)=>{
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
      connection.query('delete from ec2 where name = ?', [data.ec2_name])
      res.send("deleted")
    }
  });
});

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
