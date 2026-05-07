"use client";

import { useEffect, useRef } from "react";
import type { BuilderEvent } from "@/lib/builder-events";

export function EventsMap({ events }: { events: BuilderEvent[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current) return;

      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      const map = L.map(containerRef.current, {
        center: [25, 5],
        zoom: 2,
        zoomControl: true,
        scrollWheelZoom: false,
        worldCopyJump: true,
      });
      mapRef.current = map;

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 18,
        subdomains: "abcd",
      }).addTo(map);

      const dotIcon = L.divIcon({
        className: "nb-event-dot",
        html:
          '<span style="display:block;width:14px;height:14px;border-radius:50%;background:#052B42;border:2px solid #E0FF4F;box-shadow:0 0 0 4px rgba(224,255,79,0.35);"></span>',
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      const officialIcon = L.divIcon({
        className: "nb-event-dot",
        html:
          '<span style="display:block;width:14px;height:14px;border-radius:50%;background:#E0FF4F;border:2px solid #052B42;box-shadow:0 0 0 4px rgba(5,43,66,0.25);"></span>',
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      events.forEach((e) => {
        const marker = L.marker([e.lat, e.lng], {
          icon: e.isOfficial ? officialIcon : dotIcon,
        }).addTo(map);
        const date = new Date(e.startsAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        const dest = e.officialUrl ?? e.lumaUrl ?? "";
        const linkLine = dest
          ? `<div style="margin-top:8px;"><a href="${dest}" target="_blank" rel="noreferrer" style="color:#052B42;font-weight:600;text-decoration:underline;text-underline-offset:2px;">Details ↗</a></div>`
          : "";
        marker.bindPopup(`
          <div style="font-family:Inter,sans-serif;min-width:220px;color:#052B42;">
            <div style="font-size:10px;letter-spacing:0.08em;text-transform:uppercase;color:rgba(5,43,66,0.55);">${e.format.replace("_", " ")} · ${e.city}</div>
            <div style="font-weight:600;margin:4px 0 6px;line-height:1.25;">${e.title}</div>
            <div style="font-size:12px;color:rgba(5,43,66,0.7);">${date} · ${e.isOfficial ? "Nebius" : "@" + e.builderHandle}</div>
            ${linkLine}
          </div>
        `);
      });
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [events]);

  return (
    <div
      ref={containerRef}
      className="h-[460px] w-full overflow-hidden rounded-card border border-ink-200 bg-ink-50"
    />
  );
}
