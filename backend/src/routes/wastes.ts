import { Router } from "express";
import { prisma } from "../prisma";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.post("/", authMiddleware, async (req: any, res) => {
  const { type, subType, quantityKg, priceType, priceMin, photos, address } = req.body;
  const ownerId = req.user.userId;
  let addrId: string | undefined = undefined;
  if (address) {
    const addr = await prisma.address.create({ data: { ...address, userId: ownerId }});
    addrId = addr.id;
  }
  const w = await prisma.waste.create({
    data: { ownerId, type, subType, quantityKg: Number(quantityKg), priceType, priceMin: priceMin ? Number(priceMin) : 0, photos: photos ? JSON.stringify(photos) : undefined, addressId: addrId }
  });
  res.json(w);
});

router.get("/", authMiddleware, async (req: any, res) => {
  // list all active wastes
  const wastes = await prisma.waste.findMany({ where: { status: "listed" }, include: { owner: true, address: true }});
  res.json(wastes);
});

// get single waste
router.get("/:id", authMiddleware, async (req, res) => {
  const w = await prisma.waste.findUnique({ where: { id: req.params.id }, include: { owner: true, address: true, bids: true }});
  res.json(w);
});

export default router;

