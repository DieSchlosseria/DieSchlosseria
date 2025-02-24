document.addEventListener("DOMContentLoaded", function() {
  // Zubehörpreise zentral definieren
  const accessoryPrices = {
    "Tischbefestigung": { 15: 4, 20: 5, 25: 6, 30: 7 },
    "Decken/Wandbefestigung": { 15: 5, 20: 6, 25: 7, 30: 8 },
    "Tischfuss": { 15: 6, 20: 7, 25: 8, 30: 9 },
    "Kleiderbügel": { 40: 20 },
    "Kleiderhaken": { 40: 10 },
    "Sockel": { 40: 10 }
  };

  // Zubehör-Daten
  const accessories = [
    { id: "1", name: "Tischbefestigung", quantityId: "iFix1", dropdownId: "myDropdown1", outputId: "iPrice1" },
    { id: "2", name: "Decken/Wandbefestigung", quantityId: "iFix2", dropdownId: "myDropdown2", outputId: "iPrice2" },
    { id: "3", name: "Tischfuss", quantityId: "iFix3", dropdownId: "myDropdown3", outputId: "iPrice3" },
    { id: "4", name: "Kleiderbügel", quantityId: "iFix4", dropdownId: "myDropdown4", outputId: "iPrice4" },
    { id: "5", name: "Kleiderhaken", quantityId: "iFix5", dropdownId: "myDropdown5", outputId: "iPrice5" },
    { id: "6", name: "Sockel", quantityId: "iFix6", dropdownId: "myDropdown6", outputId: "iPrice6" } // Fix: myDropdown6
  ];

  // Preisberechnung
  function calculatePrice(quantity, dimension, accessoryName) {
    return (quantity * (accessoryPrices[accessoryName][dimension] || 0));
  }

  // Preis-Update Funktion
  function updatePriceDisplay(accessory) {
    const quantity = parseInt(document.getElementById(accessory.quantityId).value) || 0;
    const dimension = parseInt(document.getElementById(accessory.dropdownId).value) || 20;
    const totalPrice = calculatePrice(quantity, dimension, accessory.name);

    document.getElementById(accessory.outputId).textContent = `${totalPrice} €`;
    saveToLocalStorage(accessory.id, { name: accessory.name, quantity, dimension, totalPrice });
  }

  // Zubehör löschen
  function clearAccessoryData(accessory) {
    document.getElementById(accessory.quantityId).value = 0;
    updatePriceDisplay(accessory);
  }

  // Speicherung in Local Storage
  function saveToLocalStorage(accessoryId, data) {
    let savedData = JSON.parse(localStorage.getItem("accessories")) || {};
    savedData[accessoryId] = data;
    localStorage.setItem("accessories", JSON.stringify(savedData));
  }

  // Laden aus Local Storage
  function loadFromLocalStorage() {
    const savedData = JSON.parse(localStorage.getItem("accessories")) || {};
    accessories.forEach((accessory) => {
      if (savedData[accessory.id]) {
        document.getElementById(accessory.quantityId).value = savedData[accessory.id].quantity;
        document.getElementById(accessory.dropdownId).value = savedData[accessory.id].dimension;
        document.getElementById(accessory.outputId).textContent = `${savedData[accessory.id].totalPrice} €`;
      }
    });
  }

  // Event Listener für Add- und Clear-Buttons kombinieren
  accessories.forEach((accessory) => {
    document.getElementById(`iFixAdd${accessory.id}`)?.addEventListener("click", () => updatePriceDisplay(accessory));
    document.getElementById(`iClearAdd${accessory.id}`)?.addEventListener("click", () => clearAccessoryData(accessory));
  });

  // Daten aus Local Storage laden
  loadFromLocalStorage();
});
