"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { COMPANY } from "@/lib/constants";

/**
 * OpenStreetMap via Leaflet — not Google Maps, deliberately (no API key,
 * no billing account, no Google dependency for a page that just needs to
 * show one pin).
 */
export default function LocationMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let cancelled = false;

    import("leaflet").then((L) => {
      if (cancelled || !containerRef.current || mapRef.current) return;

      const { lat, lng } = COMPANY.coordinates;

      const map = L.map(containerRef.current, {
        center: [lat, lng],
        zoom: 16,
        scrollWheelZoom: false,
      });
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // A plain divIcon instead of Leaflet's default marker image — the
      // default marker's icon URLs are relative paths that bundlers like
      // Turbopack/webpack don't resolve correctly without extra config.
      const icon = L.divIcon({
        className: "",
        html: `<div style="width:34px;height:34px;border-radius:50% 50% 50% 0;background:#1688B5;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.35);transform:rotate(-45deg);"></div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 34],
      });

      L.marker([lat, lng], { icon })
        .addTo(map)
        .bindPopup(`<strong>${COMPANY.name}</strong><br/>${COMPANY.address}`)
        .openPopup();
    });

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    // relative + z-0 gives Leaflet's container its own stacking context —
    // without it, Leaflet's internal panes/controls (z-index up to 1000)
    // aren't contained and render above the site's sticky header instead
    // of staying inside this card.
    <div
      ref={containerRef}
      className="relative z-0 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border"
      aria-label={`Map showing ${COMPANY.name} at ${COMPANY.address}`}
    />
  );
}
