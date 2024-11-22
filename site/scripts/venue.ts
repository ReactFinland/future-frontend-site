import "https://cdn.jsdelivr.net/npm/leaflet@1.9.3/dist/leaflet-src.min.js";

function renderMap(id: string) {
  // @ts-expect-error How to type Leaflet?
  const L = window.L;
  const venueLatLon = [60.18500145319482, 24.83247578144074];
  const hotelLatLon = [60.18371611765855, 24.83635213466187];
  const hotel2LatLon = [60.17899837467085, 24.82998408489948];
  const hotel3LatLon = [60.18608898376467, 24.81036901473999];
  const metroLatLon = [60.18405195987836, 24.82746832771227];
  const map = L.map(id).setView(venueLatLon, 12);

  // https://github.com/pointhi/leaflet-color-markers
  const greenIcon = new L.Icon({
    iconUrl: "/images/marker-icon-2x-green.png",
    shadowUrl: "/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const orangeIcon = new L.Icon({
    iconUrl: "/images/marker-icon-2x-orange.png",
    shadowUrl: "/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

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

  L.marker(venueLatLon, { icon: greenIcon }).addTo(map)
    // .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
    .bindPopup("Dipoli - the venue")
    .openPopup();

  L.marker(hotelLatLon, { icon: orangeIcon }).addTo(map)
    .bindPopup("Radisson Blu Hotel (****)");

  L.marker(hotel2LatLon, { icon: orangeIcon }).addTo(map)
    .bindPopup("Heymo 1 Hotel (****)");

  L.marker(hotel3LatLon, { icon: orangeIcon }).addTo(map)
    .bindPopup("Noli Studios Otaniemi");

  L.marker(metroLatLon).addTo(map)
    .bindPopup("Metro station (right exit)");
}

renderMap("venue-map");
