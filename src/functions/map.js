document.addEventListener("DOMContentLoaded", function () {
  const lat = 43.5075;
  const lng = 16.4086;
  const map = L.map("map").setView([lat, lng], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      "<b>Prythian Real Estate</b><br>82 Šetalište Ivana Meštrovića, Split"
    )
    .openPopup();
});
