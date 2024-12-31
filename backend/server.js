const express = require('express');
    const cors = require('cors');
    const { Pool } = require('pg');

    const app = express();
    const port = process.env.PORT || 3000;

    // Use CORS middleware
    app.use(cors());

    // Parse JSON bodies
    app.use(express.json());

    // Database configuration
    const pool = new Pool({
      user: 'user',
      host: 'localhost',
      database: 'cleaning_service',
      password: 'password',
      port: 5432,
    });

    // Test database connection
    pool.query('SELECT NOW()', (err, res) => {
      if (err) {
        console.error('Error connecting to the database:', err);
      } else {
        console.log('Database connected successfully:', res.rows[0].now);
      }
    });

    // Basic route
    app.get('/', (req, res) => {
      res.send('Hello from the backend!');
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
