import { Router } from "express";
import { prisma } from "../prisma";
import { authMiddleware } from "../middlewares/auth";
import { findMatchesForWaste } from "../services/matchService";

const router = Router();

// create pickup for a waste -> find matches and assign first
router.post("/create/:wasteId", authMiddleware, async (req: any, res) => {
  const { wasteId } = req.params;
  const { scheduledAt } = req.body;
  const matches = await findMatchesForWaste(wasteId);
  // choose top match or escalate
  if (matches.length === 0) {
    // escalate to municipal
    const municipal = await prisma.user.findFirst({ where: { role: "MUNICIPAL" }});
    const p = await prisma.pickup.create({ data: { wasteId, recyclerId: municipal?.id, scheduledAt: scheduledAt ? new Date(scheduledAt) : null, status: "escalated" }});
    return res.json({ pickup: p, escalated: true });
  }
  const top = matches[0];
  const p = await prisma.pickup.create({ data: { wasteId, recyclerId: top.user?.id || undefined, scheduledAt: scheduledAt ? new Date(scheduledAt) : null, status: "assigned", otp: Math.floor(100000 + Math.random()*900000).toString() }});
  res.json({ pickup: p, match: top });
});

// collector marks enroute / picked / delivered
router.patch("/:id/status", authMiddleware, async (req: any, res) => {
  const { status } = req.body;
  const { id } = req.params;
  const p = await prisma.pickup.update({ where: { id }, data: { status }});
  res.json(p);
});

// get pickup
router.get("/:id", authMiddleware, async (req, res) => {
  const p = await prisma.pickup.findUnique({ where: { id: req.params.id }, include: { waste: { include: { owner: true }}, recycler: true }});
  res.json(p);
});

export default router;

