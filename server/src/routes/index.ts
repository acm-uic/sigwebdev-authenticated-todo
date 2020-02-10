import { Router, Request, Response } from 'express';

// * Initialize router
const router = Router();

// * Basic route
router.get("/", (req: Request, res: Response) => {
  res.send({api: "Hello World!"})
})

// * Export router
export default router;
