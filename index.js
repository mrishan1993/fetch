const express = require('express');
const { fetchJobs } = require('./controllers/fetch_jobs');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  
  fetchJobs()
  res.send(fetchJobs());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});