import express from 'express';
    import {
      addAppointment,
      getAppointment,
      updateAppointment,
      deleteAppointment,
    } from '../controllers/appointmentController';

    const router = express.Router();

    router.post('/', addAppointment);
    router.get('/:id', getAppointment);
    router.put('/:id', updateAppointment);
    router.delete('/:id', deleteAppointment);

    export default router;
