import express from 'express';
    import {
      getUsers,
      getUserById,
      createUser,
      updateUser,
      deleteUser,
    } from '../controllers/userController';

    const router = express.Router();

    router.get('/', async (req, res) => {
      try {
        const users = await getUsers();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    router.get('/:id', async (req, res) => {
      try {
        const user = await getUserById(req.params.id);
        res.status(200).json(user);
      } catch (error) {
        if (error instanceof Error && error.message === 'User not found (404)') {
          res.status(404).json({ error: 'User not found' });
        } else {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
    });

    router.post('/', async (req, res) => {
      try {
        const newUser = await createUser(req.body);
        res.status(201).json(newUser);
      } catch (error) {
        if (error instanceof Error && error.message === 'Invalid request body (400)') {
          res.status(400).json({ error: 'Invalid request body' });
        } else {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
    });

    router.put('/:id', async (req, res) => {
      try {
        const updatedUser = await updateUser(req.params.id, req.body);
        res.status(200).json(updatedUser);
      } catch (error) {
        if (error instanceof Error && error.message === 'User not found (404)') {
          res.status(404).json({ error: 'User not found' });
        } else if (error instanceof Error && error.message === 'Invalid request body (400)') {
          res.status(400).json({ error: 'Invalid request body' });
        } else {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
    });

    router.delete('/:id', async (req, res) => {
      try {
        await deleteUser(req.params.id);
        res.status(204).send();
      } catch (error) {
        if (error instanceof Error && error.message === 'User not found (404)') {
          res.status(404).json({ error: 'User not found' });
        } else {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
    });

    export default router;
