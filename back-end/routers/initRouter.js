import { Router } from 'express';

// initial express router configuration for project setup
const router = Router();
router.get('/api', (req, res) => {
  res.status(200).json({ message: 'initial api response' });
});

export default router;
