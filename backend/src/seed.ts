import { prisma } from "./prisma";

async function main() {
  console.log("Cleaning DB...");
  await prisma.payment.deleteMany();
  await prisma.pickup.deleteMany();
  await prisma.bid.deleteMany();
  await prisma.waste.deleteMany();
  await prisma.address.deleteMany();
  await prisma.collector.deleteMany();
  await prisma.recycler.deleteMany();
  await prisma.user.deleteMany();

  console.log("Seeding users...");

  const alice = await prisma.user.create({ data: { name: "Alice Generator", email: "alice@generator.test", role: "GENERATOR" }});
  const ravi = await prisma.user.create({ data: { name: "Ravi Recycler", email: "ravi@recycler.test", role: "RECYCLER" }});
  const chotu = await prisma.user.create({ data: { name: "Chotu Collector", email: "chotu@collector.test", role: "COLLECTOR" }});
  const municipal = await prisma.user.create({ data: { name: "City Municipal", email: "municipal@city.test", role: "MUNICIPAL" }});
  const admin = await prisma.user.create({ data: { name: "Admin", email: "admin@ecoswap.test", role: "ADMIN" }});

  console.log("Seeding profiles...");
  await prisma.recycler.create({ data: { userId: ravi.id, accepted: "plastic,paper", capacityKg: 2000, radiusKm: 25, locationLat: 12.96, locationLng: 77.6 }});
  await prisma.collector.create({ data: { userId: chotu.id, vehicleType: "bike", capacityKg: 200, radiusKm: 12, locationLat: 12.962, locationLng: 77.608 }});

  const addr = await prisma.address.create({ data: { userId: alice.id, label: "Home", street: "MG Road", city: "DemoCity", pincode: "12345", lat: 12.961, lng: 77.607 }});
  const w1 = await prisma.waste.create({ data: { ownerId: alice.id, type: "plastic", subType: "PET", quantityKg: 20, priceType: "negotiable", priceMin: 5.5, addressId: addr.id }});
  const w2 = await prisma.waste.create({ data: { ownerId: alice.id, type: "paper", subType: "mixed", quantityKg: 15, priceType: "fixed", priceMin: 3.0, addressId: addr.id }});

  console.log("Seed complete. Accounts:");
  console.log("GENERATOR: alice@generator.test");
  console.log("RECYCLER: ravi@recycler.test");
  console.log("COLLECTOR: chotu@collector.test");
  console.log("MUNICIPAL: municipal@city.test");
  console.log("ADMIN: admin@ecoswap.test");
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());

