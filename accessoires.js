// Konstanten
const START_WERT_COUNT = "0";
const START_WERT_DIMENSION = "20";

// Zubehör-Daten mit individuellen Preisen
const accessoires = [
  {
    countId: "iFix1",
    dimensionId: "myDropdown",
    addId: "iFixAdd1",
    priceId: "iPrice1",
    unitPrice: 5  // Individueller Preis für iFix1
  },

  {
    countId: "iFix2",
    dimensionId: "myDropdown2",
    addId: "iFixAdd2",
    priceId: "iPrice2",
    unitPrice: 7  // Individueller Preis für iFix2
  }
];

// Wiederherstellen gespeicherter Werte bei Seitenneuladen
accessoires.forEach(function(accessoire) {
  restoreValues(accessoire);
});

// Zubehör wegspeichern
accessoires.forEach(function(accessoire) {
  saveValues(accessoire);
});



//LIB
function saveValues(accessoire) {
  const { countId, dimensionId, addId, priceId, unitPrice } = accessoire;

  const Fix = document.getElementById(countId);
  const Drop = document.getElementById(dimensionId);
  const Add = document.getElementById(addId);
  const PriceElement = document.getElementById(priceId);

  // Lokale Speicherung und Initialisierung
  const savedCount = localStorage.getItem(countId) || START_WERT_COUNT;
  const savedDimension = localStorage.getItem(dimensionId) || START_WERT_DIMENSION;

  Fix.value = savedCount;
  Drop.value = savedDimension;
  updatePrice(Fix, PriceElement, unitPrice);

  // Event-Listener für Änderungen
  Fix.addEventListener("change", function () {
    updatePrice(Fix, PriceElement, unitPrice);
    localStorage.setItem(countId, Fix.value); // Count speichern
  });

  Drop.addEventListener("change", function () {
    localStorage.setItem(dimensionId, Drop.value); // Dimension speichern
  });

  Add.addEventListener("click", function () {
    localStorage.setItem(countId, Fix.value);
    localStorage.setItem(dimensionId, Drop.value);
    localStorage.setItem(priceId, PriceElement.value); // Preis speichern
  });
}

function restoreValues(accessoire) {
  const { countId, dimensionId, priceId } = accessoire;
  
  const savedCount = localStorage.getItem(countId);
  const savedDimension = localStorage.getItem(dimensionId);
  const savedPrice = localStorage.getItem(priceId);

  if (savedCount !== null) document.getElementById(countId).value = savedCount;
  if (savedDimension !== null) document.getElementById(dimensionId).value = savedDimension;
  if (savedPrice !== null) document.getElementById(priceId).value = savedPrice;
}

// Preis für jedes Zubehör berechnen
function updatePrice(Fix, PriceElement, unitPrice) {
  const count = parseFloat(Fix.value) || 0;
  PriceElement.value = unitPrice * count;
}

// Die Dropdown-Werte aktualisieren
function handleDropdownChange(tIdDrop) {
  const dropdown = document.getElementById(tIdDrop);
  return dropdown.value;
}

// Die aktuelle Seite ermitteln
function getCurrentPage() {
  return window.location.href.split('/').pop();
}
