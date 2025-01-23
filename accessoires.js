document.addEventListener("DOMContentLoaded", function() {
  // Zubehörpreise pro Dimension (in €)
  const accessoryPrices = {
    15: 10, // Preis für 15mm
    20: 15, // Preis für 20mm
    25: 20, // Preis für 25mm
  };

  // Accessoires-Daten
  const accessories = [
    {
      id: "1",
      name: "Tischbefestigung",
      quantityId: "iFix1",
      dropdownId: "myDropdown1",
      outputId: "iPrice1",
    },
    {
      id: "2",
      name: "Decken/Wandbefestigung",
      quantityId: "iFix2",
      dropdownId: "myDropdown2",
      outputId: "iPrice2",
    },
  ];

  // Funktion zur Berechnung des Gesamtpreises
  function calculatePrice(quantity, dimension) {
    const pricePerItem = accessoryPrices[dimension] || 0;
    return quantity * pricePerItem;
  }

  // Funktion zur Aktualisierung der Preis-Anzeige
  function updatePriceDisplay(accessory) {
    const quantity = parseInt(document.getElementById(accessory.quantityId).value) || 0;
    const dimension = parseInt(document.getElementById(accessory.dropdownId).value) || 20;
    const totalPrice = calculatePrice(quantity, dimension);

    // Preis anzeigen
    document.getElementById(accessory.outputId).textContent = `${totalPrice} €`;

    // Accessoire im Local Storage speichern
    saveToLocalStorage(accessory.id, {
      name: accessory.name,
      quantity,
      dimension,
      totalPrice,
    });
  }

  // Funktion zum Speichern aller Accessoires im Local Storage
  function saveToLocalStorage(accessoryId, data) {
    let savedData = JSON.parse(localStorage.getItem("accessories")) || {};
    savedData[accessoryId] = data;
    localStorage.setItem("accessories", JSON.stringify(savedData));
  }

  // Funktion zum Laden der Accessoires aus Local Storage
  function loadFromLocalStorage() {
    const savedData = JSON.parse(localStorage.getItem("accessories")) || {};

    accessories.forEach((accessory) => {
      const savedAccessory = savedData[accessory.id];
      if (savedAccessory) {
        document.getElementById(accessory.quantityId).value = savedAccessory.quantity;
        document.getElementById(accessory.dropdownId).value = savedAccessory.dimension;
        document.getElementById(accessory.outputId).textContent = `${savedAccessory.totalPrice} €`;
      }
    });
  }

  // Event-Listener für Add-Buttons hinzufügen
  accessories.forEach((accessory) => {
    const addButton = document.getElementById(`iFixAdd${accessory.id}`);
    if (addButton) {
      addButton.addEventListener("click", () => updatePriceDisplay(accessory));
    }
  });

  // Daten beim Laden der Seite aus Local Storage laden
  loadFromLocalStorage();
});
