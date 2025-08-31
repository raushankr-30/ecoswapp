import { prisma } from "../prisma";

/**
 * Create a mock payment and immediately mark as cleared for demo.
 */
export async function createMockPayment(orderId: string, payerId: string, payeeId: string, amount: number, method = "mock") {
  const payment = await prisma.payment.create({
    data: { orderId, payerId, payeeId, amount, method, status: "pending" }
  });
  // simulate immediate settlement
  await prisma.payment.update({ where: { id: payment.id }, data: { status: "cleared" }});
  return await prisma.payment.findUnique({ where: { id: payment.id }});
}

