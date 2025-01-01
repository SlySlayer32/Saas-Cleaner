import express from 'express';
import {
  addClient,
  getClient,
  updateClient,
  deleteClient,
} from '../controllers/clientController';

const router = express.Router();

router.post('/', addClient);
router.get('/:id', getClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

export default router;
