import "https://cdn.jsdelivr.net/npm/leaflet@1.9.3/dist/leaflet-src.min.js";

function renderMap(id: string) {
  // @ts-expect-error How to type Leaflet?
  const L = window.L;
  const venueLatLon = [60.178510, 24.947590];
  const restaurantLatLon = [60.17919, 24.9481];
  const afterpartyLatLon = [60.1690, 24.9428];
  const map = L.map(id).setView(venueLatLon, 13);

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
    .bindPopup("Paasitorni")
    .openPopup();

  L.marker(restaurantLatLon).addTo(map)
    .bindPopup("Restaurant");

  L.marker(afterpartyLatLon).addTo(map)
    .bindPopup("Afterparty");
}

renderMap("speaker-map");
