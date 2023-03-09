import "https://cdn.jsdelivr.net/npm/leaflet@1.9.3/dist/leaflet-src.min.js";

function renderMap(id: string) {
  // @ts-expect-error How to type Leaflet?
  const L = window.L;
  const venueLatLon = [60.168413, 24.949216];
  const map = L.map(id).setView(venueLatLon, 14);

  // Different options at https://leaflet-extras.github.io/leaflet-providers/preview/
  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20,
    },
  ).addTo(map);

  L.marker(venueLatLon).addTo(map)
    .bindPopup("Pörssitalo, Helsinki Stock Exchange Building")
    .openPopup();

  L.marker([60.1643642, 24.945336]).addTo(map)
    .bindPopup("Hotel Lilla Roberts");
}

renderMap("speaker-map");
