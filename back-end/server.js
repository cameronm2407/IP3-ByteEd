import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';

// connect to remote database
mongoose.connect(process.env.DB_URI).then(
  () => console.log('Server connected to database'),
  err => {
    // handle initial connection error
    console.log('Database connection error: ' + err.message);
  }
);

// start server
app.listen(process.env.DEV_PORT, () => {
  console.log(
    'Web Application Server listening on port ' + process.env.DEV_PORT
  );
});
