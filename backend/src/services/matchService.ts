import { prisma } from "../prisma";
import { haversineKm } from "../utils/geo";

/**
 * Return nearby recyclers sorted by distance that accept waste.type and have capacity.
 */
export async function findMatchesForWaste(wasteId: string) {
  const waste = await prisma.waste.findUnique({ where: { id: wasteId }, include: { address: true } });
  if (!waste || !waste.address) return [];
  const type = waste.type.toLowerCase();
  const recyclers = await prisma.recycler.findMany({ include: { user: true }});
  // compute distance & filter
  const matches = recyclers.map(r => {
    const dist = haversineKm(waste.address!.lat, waste.address!.lng, r.locationLat, r.locationLng);
    return { r, dist };
  }).filter(item => item.r.accepted.toLowerCase().includes(type) && item.dist <= item.r.radiusKm)
    .sort((a,b) => a.dist - b.dist)
    .slice(0, 10);
  // return user + recycler info
  return Promise.all(matches.map(async m => {
    const u = await prisma.user.findUnique({ where: { id: m.r.userId }});
    return { user: u, recycler: m.r, distanceKm: m.dist };
  }));
}

