"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { COMPANY } from "@/lib/constants";

type View = "map" | "satellite";
type Layers = Record<View, import("leaflet").Layer[]>;

// Esri satellite imagery, no API key needed. Tiles exist up to z18; higher
// zooms upscale them.
const ESRI = "https://server.arcgisonline.com/ArcGIS/rest/services";
const SATELLITE_NATIVE_MAX_ZOOM = 18;

function showView(map: import("leaflet").Map, layers: Layers, view: View) {
  for (const layer of [...layers.map, ...layers.satellite]) map.removeLayer(layer);
  for (const layer of layers[view]) layer.addTo(map);
}

// OpenStreetMap via Leaflet (no API key), with a satellite toggle.
export default function LocationMap() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const layersRef = useRef<Layers | null>(null);
  const [view, setView] = useState<View>("map");
  // Leaflet loads async. The init reads the latest choice from this ref.
  const viewRef = useRef<View>(view);
  // The popup is built once, so the address comes from a ref.
  const addressRef = useRef(t.common.address);

  useEffect(() => {
    viewRef.current = view;
    if (mapRef.current && layersRef.current) showView(mapRef.current, layersRef.current, view);
  }, [view]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let cancelled = false;
    let resizeObserver: ResizeObserver | undefined;

    import("leaflet").then((L) => {
      if (cancelled || !containerRef.current || mapRef.current) return;

      const { lat, lng } = COMPANY.coordinates;

      const map = L.map(containerRef.current, {
        center: [lat, lng],
        zoom: 16,
        scrollWheelZoom: false,
      });
      mapRef.current = map;

      const esriCredit = "Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics";
      layersRef.current = {
        map: [
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
          }),
        ],
        // Road and place labels over the imagery.
        satellite: [
          L.tileLayer(`${ESRI}/World_Imagery/MapServer/tile/{z}/{y}/{x}`, {
            attribution: esriCredit,
            maxZoom: 19,
            maxNativeZoom: SATELLITE_NATIVE_MAX_ZOOM,
          }),
          L.tileLayer(`${ESRI}/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}`, {
            maxZoom: 19,
            maxNativeZoom: SATELLITE_NATIVE_MAX_ZOOM,
          }),
          L.tileLayer(`${ESRI}/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}`, {
            maxZoom: 19,
            maxNativeZoom: SATELLITE_NATIVE_MAX_ZOOM,
          }),
        ],
      };
      showView(map, layersRef.current, viewRef.current);

      // A divIcon: Leaflet's default marker images don't resolve with the
      // bundler.
      const icon = L.divIcon({
        className: "",
        html: `<div style="width:34px;height:34px;border-radius:50% 50% 50% 0;background:#1688B5;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.35);transform:rotate(-45deg);"></div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 34],
      });

      L.marker([lat, lng], { icon })
        .addTo(map)
        .bindPopup(`<strong>${COMPANY.name}</strong><br/>${addressRef.current}`)
        .openPopup();

      // Leaflet measures its box once, so re-measure when the container
      // resizes.
      resizeObserver = new ResizeObserver(() => map.invalidateSize());
      resizeObserver.observe(containerRef.current);
    });

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
      layersRef.current = null;
    };
  }, []);

  return (
    <div className="relative h-full">
      {/* relative + z-0 keeps Leaflet's layers under the sticky header. */}
      <div
        ref={containerRef}
        className="relative z-0 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border lg:aspect-auto lg:h-full lg:min-h-[460px]"
        aria-label={t.contact.mapLabel(COMPANY.name, t.common.address)}
      />

      <div
        role="group"
        aria-label={`${t.contact.mapView} / ${t.contact.satelliteView}`}
        className="absolute right-3 top-3 z-10 flex gap-0.5 rounded-lg bg-white p-1 shadow-md"
      >
        {(["map", "satellite"] as const).map((v) => (
          <button
            key={v}
            type="button"
            aria-pressed={view === v}
            onClick={() => setView(v)}
            className={clsx(
              "cursor-pointer rounded-md px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-blue",
              view === v ? "bg-navy text-white" : "text-navy hover:bg-soft-gray"
            )}
          >
            {v === "map" ? t.contact.mapView : t.contact.satelliteView}
          </button>
        ))}
      </div>
    </div>
  );
}
