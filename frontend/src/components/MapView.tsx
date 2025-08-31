import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import API from "../api/client";

type Waste = {
  id: string;
  type: string;
  subType?: string | null;
  quantityKg: number;
  address?: { lat: number; lng: number; label?: string };
  owner?: { id: string; name: string };
};

type Recycler = {
  userId: string;
  accepted: string;
  capacityKg: number;
  radiusKm: number;
  locationLat: number;
  locationLng: number;
  user?: { id: string; name: string };
};

const MapView: React.FC<{ center?: [number, number]; zoom?: number }> = ({ center = [12.961, 77.607], zoom = 13 }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // initialize map
    const map = L.map(mapRef.current, { center, zoom });
    leafletMapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Icon defs
    const wasteIcon = L.divIcon({ className: "waste-marker", html: `<div style="background:#2563eb;color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-weight:700;">W</div>` });
    const recyclerIcon = L.divIcon({ className: "recycler-marker", html: `<div style="background:#059669;color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-weight:700;">R</div>` });

    // Fetch markers
    async function load() {
      try {
        const [wres, rres] = await Promise.all([
          API.get("/wastes"),
          API.get("/recyclers")
        ]);
        const wastes: Waste[] = wres.data;
        const recs: Recycler[] = rres.data;

        // add wastes
        wastes.forEach(w => {
          if (!w.address?.lat || !w.address?.lng) return;
          const marker = L.marker([w.address.lat, w.address.lng], { icon: wasteIcon }).addTo(map);
          const owner = w.owner?.name || "Seller";
          marker.bindPopup(`<div style="min-width:180px">
            <strong>${w.type} ${w.subType ?? ""}</strong><br/>
            <small>${w.quantityKg} kg • Seller: ${owner}</small><br/>
            <div style="margin-top:8px;">
              <a href="/pickup/create?wasteId=${w.id}" style="padding:6px 8px;border-radius:6px;background:#10b981;color:white;text-decoration:none;">Request Pickup</a>
            </div>
          </div>`);
        });

        // add recyclers
        recs.forEach(r => {
          const lat = r.locationLat; const lng = r.locationLng;
          const marker = L.marker([lat, lng], { icon: recyclerIcon }).addTo(map);
          marker.bindPopup(`<div style="min-width:200px">
            <strong>${r.user?.name ?? "Recycler"}</strong><br/>
            <small>Accepts: ${r.accepted}</small><br/>
            <small>Capacity: ${r.capacityKg} kg</small><br/>
            <div style="margin-top:8px;">
              <a href="/profile" style="padding:6px 8px;border-radius:6px;background:#2563eb;color:white;text-decoration:none;">View Profile</a>
            </div>
          </div>`);
          // draw radius circle
          if (r.radiusKm) {
            L.circle([lat, lng], { radius: r.radiusKm * 1000, color: "#34d399", opacity: 0.15 }).addTo(map);
          }
        });

      } catch (err) {
        console.error("map load error", err);
      }
    }

    load();

    return () => {
      map.remove();
    };
  }, [center, zoom]);

  return <div ref={mapRef} style={{ width: "100%", height: "520px", borderRadius: 12, overflow: "hidden", boxShadow: "0 6px 18px rgba(0,0,0,0.08)" }} />;
};

export default MapView;

