const express = require('express');
const connectDB = require('../Config/database');
const routes = require('../Server/Routes');

const app = express();
connectDB();

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

