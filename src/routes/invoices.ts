import express from 'express';
    import {
      generateInvoice,
      getInvoice,
      sendInvoice,
      updateInvoice,
    } from '../controllers/invoiceController';

    const router = express.Router();

    router.post('/generate', generateInvoice);
    router.get('/:id', getInvoice);
    router.post('/:id/send', sendInvoice);
    router.put('/:id', updateInvoice);

    export default router;
