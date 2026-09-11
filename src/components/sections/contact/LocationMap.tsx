"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { COMPANY } from "@/lib/constants";

type View = "map" | "satellite";
type Layers = Record<View, import("leaflet").Layer[]>;

// Esri's public imagery service: no API key, no billing account — the same
// reason the street layer is OpenStreetMap rather than Google Maps. Most
// areas have native imagery down to about z18; past that Esri serves a
// "map data not available" placeholder, so higher zooms upscale z18 tiles
// instead (maxNativeZoom) rather than showing that placeholder.
const ESRI = "https://server.arcgisonline.com/ArcGIS/rest/services";
const SATELLITE_NATIVE_MAX_ZOOM = 18;

function showView(map: import("leaflet").Map, layers: Layers, view: View) {
  for (const layer of [...layers.map, ...layers.satellite]) map.removeLayer(layer);
  for (const layer of layers[view]) layer.addTo(map);
}

/**
 * OpenStreetMap via Leaflet — not Google Maps, deliberately (no API key,
 * no billing account, no Google dependency for a page that just needs to
 * show one pin). A satellite toggle sits top-right: for a site visit or a
 * truck pickup, the aerial view of the yard is more recognisable than the
 * street map, which shows the industrial park only as grey blocks.
 */
export default function LocationMap() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const layersRef = useRef<Layers | null>(null);
  const [view, setView] = useState<View>("map");
  // Leaflet loads asynchronously, so a toggle clicked before it finishes has
  // no map to act on yet — the init reads the latest choice from here.
  const viewRef = useRef<View>(view);

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
        // Imagery alone has no names on it, which makes it hard to orient
        // by — road and place labels are layered on top, like a "hybrid"
        // view in the big map apps.
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

      // The map's height now follows its row (see the container's classes),
      // which can settle after Leaflet has already drawn — web fonts
      // loading, the Reveal animation, a window resize. Leaflet measures its
      // box only once, so without this it keeps the stale size and leaves
      // grey untiled strips along the edge that grew.
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
      {/* relative + z-0 gives Leaflet's container its own stacking context —
          without it, Leaflet's internal panes/controls (z-index up to 1000)
          aren't contained and render above the site's sticky header instead
          of staying inside this card. The toggle below sits outside that
          context, which is what lets z-10 put it above the map.
          Side by side (lg), the map fills the row height instead of keeping
          a fixed 4:3 ratio, so it lines up with the info card next to it
          rather than leaving a gap under whichever of the two is shorter. */}
      <div
        ref={containerRef}
        className="relative z-0 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border lg:aspect-auto lg:h-full lg:min-h-[460px]"
        aria-label={`Map showing ${COMPANY.name} at ${COMPANY.address}`}
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
