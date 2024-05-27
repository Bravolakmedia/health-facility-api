const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected'); // Include the new route

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(authRoutes);
app.use(protectedRoutes); // Use the new route

sequelize.sync().then(() => {
  console.log('Database & tables created!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
