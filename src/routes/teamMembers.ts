import express from 'express';
    import {
      addTeamMember,
      getTeamMember,
      updateTeamMember,
      deleteTeamMember,
    } from '../controllers/teamMemberController';

    const router = express.Router();

    router.post('/', addTeamMember);
    router.get('/:id', getTeamMember);
    router.put('/:id', updateTeamMember);
    router.delete('/:id', deleteTeamMember);

    export default router;
