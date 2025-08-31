import { Router } from "express";
import { prisma } from "../prisma";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

// place bid for waste
router.post("/bid", authMiddleware, async (req: any, res) => {
  const { wasteId, price, pickupIncluded } = req.body;
  const bidderId = req.user.userId;
  const bid = await prisma.bid.create({ data: { wasteId, bidderId, price: Number(price), pickupIncluded: !!pickupIncluded }});
  res.json(bid);
});

// accept bid (owner)
router.post("/accept/:bidId", authMiddleware, async (req: any, res) => {
  const { bidId } = req.params;
  const bidder = await prisma.bid.findUnique({ where: { id: bidId }});
  if (!bidder) return res.status(404).json({ error: "bid not found" });
  // mark accepted and create pickup, mock payment
  await prisma.bid.update({ where: { id: bidId }, data: { status: "accepted" }});
  await prisma.waste.update({ where: { id: bidder.wasteId }, data: { status: "matched" }});
  const pickup = await prisma.pickup.create({ data: { wasteId: bidder.wasteId, recyclerId: bidder.bidderId, status: "assigned" }});
  // create payment record (mock)
  const payment = await prisma.payment.create({ data: { orderId: pickup.id, payerId: req.user.userId, payeeId: bidder.bidderId, amount: bidder.price * (await prisma.waste.findUnique({where:{id:bidder.wasteId}}))!.quantityKg, method: "mock" }});
  await prisma.payment.update({ where: { id: payment.id }, data: { status: "cleared" }});
  res.json({ pickup, payment });
});

export default router;

