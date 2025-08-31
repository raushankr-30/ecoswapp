import { Router } from "express";
import { prisma } from "../prisma";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.get("/escalations", authMiddleware, async (req: any, res) => {
  if (req.user.role !== "ADMIN" && req.user.role !== "MUNICIPAL") return res.status(403).json({ error: "forbidden" });
  const list = await prisma.pickup.findMany({ where: { status: "escalated" }, include: { waste: true }});
  res.json(list);
});

export default router;

