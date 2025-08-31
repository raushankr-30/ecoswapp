import { Router } from "express";
import { prisma } from "../prisma";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

// register recycler profile
router.post("/profile", authMiddleware, async (req: any, res) => {
  const { accepted, capacityKg, radiusKm, locationLat, locationLng } = req.body;
  const userId = req.user.userId;
  // upsert
  const exists = await prisma.recycler.findUnique({ where: { userId }});
  if (exists) {
    const u = await prisma.recycler.update({ where: { userId }, data: { accepted, capacityKg, radiusKm, locationLat, locationLng }});
    return res.json(u);
  }
  const p = await prisma.recycler.create({ data: { userId, accepted, capacityKg, radiusKm, locationLat, locationLng }});
  res.json(p);
});

// list recyclers (for map)
router.get("/", authMiddleware, async (req, res) => {
  const recs = await prisma.recycler.findMany({ include: { user: true }});
  res.json(recs);
});

export default router;

