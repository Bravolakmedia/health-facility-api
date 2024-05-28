const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected'); // Include the new route
const consultationRoutes = require('./routes/consultation'); // Ensure you have this route
const models = require('./models/User');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use(protectedRoutes); // Use the new route

models.sequelize.sync().then(() => {
  console.log('Database & tables created!');
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
