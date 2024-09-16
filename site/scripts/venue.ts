import "https://cdn.jsdelivr.net/npm/leaflet@1.9.3/dist/leaflet-src.min.js";

function renderMap(id: string) {
  // @ts-expect-error How to type Leaflet?
  const L = window.L;
  const venueLatLon = [60.18500145319482, 24.83247578144074];
  const hotelLatLon = [60.18371611765855, 24.83635213466187];
  const hotel2LatLon = [60.17899837467085, 24.82998408489948];
  const map = L.map(id).setView(venueLatLon, 12);

  // Debug
  /*
  map.on("click", function (e) {
    console.log(e.latlng.lat);
    console.log(e.latlng.lng);
  });
  */

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
    // .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
    .bindPopup("Dipoli - the venue")
    .openPopup();

  L.marker(hotelLatLon).addTo(map)
    .bindPopup("Radisson Blu Hotel (****)");

  L.marker(hotel2LatLon).addTo(map)
    .bindPopup("Heymo 1 Hotel (****)");
}

renderMap("venue-map");
