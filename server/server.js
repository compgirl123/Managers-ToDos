const express = require('express');
require('dotenv').config({ path: '../.env' });
const mysql = require('mysql');
const cors = require('cors');
const app = express();


app.use(
  cors({
    origin: ["http://localhost:3000", "https://managers-todos0.onrender.com", "https://managers-todos.onrender.com"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);


app.use(express.json());



const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10
})
// Set up the CORS headers
app.use((req, res, next) => {
  //res.header("Access-Control-Allow-Origin", "https://managers-todos0.onrender.com");
  //res.setHeader("Access-Control-Allow-Origin", "https://managers-todos0.onrender.com");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const sql = "SELECT * from users WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ error: 'An error occurred while processing your request.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Login Failed' });
    }
    return res.json({ success: 'Login Successful', user: results[0] });
  });
});


// Define an API route that returns static JSON data
app.get('/api', (req, res) => {
  res.json({"users": ["userOne", "userTwo", "userThree"]});
});

app.post('/addTask', (req, res) => {
  const newTask = req.body.newTask; // Read the task from the request body
  console.log("PAYLOAD");
  console.log(newTask);

  // Use placeholders in the SQL query
  const sql = "INSERT INTO todos (task) VALUES (?)";

  // Values to be inserted
  const values = [newTask];

  // Execute the prepared statement with placeholders
  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
    // Check if the INSERT was successful and get the newly inserted ID
    if (results.affectedRows === 1) {
      const insertedId = results.insertId;
      return res.json({ id: insertedId, task: newTask, completed:false, priority:'high'});
    } else {
      return res.status(500).json({ error: 'Task could not be added.' });
    }
  });
});

app.post('/deleteTask', (req, res) => {
  const taskId = req.body.taskIdToDelete; // Read the task from the request body
  console.log("PAYLOAD");
  console.log(req.body);

  // Use placeholders in the SQL query
  const sql = "DELETE FROM todos WHERE id = ?"; //Replace '1' with the ID of the task you want to delete

  // Values to be inserted
  const values = [taskId];

  // Execute the prepared statement with placeholders
  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
    return res.json({ message: "Task deleted successfully"});
  });
});

// Define a route for querying data from the MySQL database
app.get('/todos', (req, res) => {
  const sql = "SELECT * from todos";
  // Execute the database query
  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json(err); // Respond with an error status code
    }
    // Log the data and respond with it
    console.log(data);
    return res.json(data); // Send the data as a JSON response
  });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
