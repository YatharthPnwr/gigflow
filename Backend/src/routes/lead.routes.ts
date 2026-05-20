import { Router } from 'express';
import { RequestHandler } from 'express';
import authMiddleware from '../middleware/auth.middleware';
import authorize from '../middleware/rbac.middleware';
import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  exportCSV,
} from '../controllers/lead.controller';

const router = Router();

router.use(authMiddleware as unknown as RequestHandler);

router.get('/export/csv', authorize('admin') as unknown as RequestHandler, exportCSV as unknown as RequestHandler);

router.get('/', getLeads as unknown as RequestHandler);
router.post('/', createLead as unknown as RequestHandler);
router.get('/:id', getLeadById as unknown as RequestHandler);
router.patch('/:id', updateLead as unknown as RequestHandler);
router.delete('/:id', authorize('admin') as unknown as RequestHandler, deleteLead as unknown as RequestHandler);

export default router;
