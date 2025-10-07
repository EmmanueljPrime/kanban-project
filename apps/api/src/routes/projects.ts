import { Router } from 'express';
import { prisma } from "../prisma";

const router = Router();

// GET /projects - Récupérer tous les projets
router.get('/',async(req, res, next)=>{
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc'},
      include: {
        _count: { select: { tasks: true } },
        owner: { select: { id: true, email: true } }
      }
    });
    res.json(projects)
  }catch(err){
    next(err)
  }
})

export default router;
