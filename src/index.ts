import express from 'express';
    import dotenv from 'dotenv';
    import { testDbConnection } from './utils/db';
    import authRoutes from './routes/auth';
    import clientRoutes from './routes/clients';
    import appointmentRoutes from './routes/appointments';
    import invoiceRoutes from './routes/invoices';
    import teamMemberRoutes from './routes/teamMembers';
    import userRoutes from './routes/users';

    dotenv.config();

    const app = express();
    const port = process.env.PORT || 3000;

    app.use(express.json()); // Add middleware to parse JSON request bodies

    app.get('/', (req, res) => {
      res.send('Hello from Cleaning Business SaaS Backend!');
    });

    app.get('/test-db', async (req, res) => {
      try {
        const message = await testDbConnection();
        res.send(message);
      } catch (error) {
        res.status(500).send('Database connection test failed');
      }
    });

    // Use authentication routes
    app.use('/auth', authRoutes);

    // Use client routes
    app.use('/clients', clientRoutes);

    // Use appointment routes
    app.use('/appointments', appointmentRoutes);

    // Use invoice routes
    app.use('/invoices', invoiceRoutes);

    // Use team member routes
    app.use('/team-members', teamMemberRoutes);

    // Use user routes
    app.use('/users', userRoutes);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
