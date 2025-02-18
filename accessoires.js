document.addEventListener("DOMContentLoaded", function() {
// Zubehörpreise pro Artikel und Dimension
const accessoryPrices = {//muss aktuell hier und im accesoires.js aktualisiert werden --> evtl iwo global erstellen
  "Tischbefestigung": {
    15: 4,
    20: 5,
    25: 6,
    30: 7
  },
  "Decken/Wandbefestigung": {
    15: 5,
    20: 6,
    25: 7,
    30: 8
  },
  "Tischfuss": {
    15: 6,
    20: 7,
    25: 8,
    30: 9
  },
  "Kleiderbügel": {
    40: 20,
  },
  "Kleiderhaken": {
    40: 10,
  }
};

  // Accessory data
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
    {
      id: "3",
      name: "Tischfuss",
      quantityId: "iFix3",
      dropdownId: "myDropdown3",
      outputId: "iPrice3",
    },
    {
      id: "4",
      name: "Kleiderbügel",
      quantityId: "iFix4",
      dropdownId: "myDropdown4",
      outputId: "iPrice4",
    },
    {
      id: "5",
      name: "Kleiderhaken",
      quantityId: "iFix5",
      dropdownId: "myDropdown5",
      outputId: "iPrice5",
    }
  ];





  // Function to calculate the total price
  function calculatePrice(quantity, dimension, accessoryName) {
    const pricePerItem = accessoryPrices[accessoryName][dimension] || 0;
    return quantity * pricePerItem;
  }

  // Function to update the price display
  function updatePriceDisplay(accessory) {
    const quantity = parseInt(document.getElementById(accessory.quantityId).value) || 0;
    const dimension = parseInt(document.getElementById(accessory.dropdownId).value) || 20;
    const totalPrice = calculatePrice(quantity, dimension, accessory.name);

    // Display price
    document.getElementById(accessory.outputId).textContent = `${totalPrice} €`;

    // Save accessory data to Local Storage
    saveToLocalStorage(accessory.id, {
      name: accessory.name,
      quantity,
      dimension,
      totalPrice,
    });
  }

// clearAccesoryData
function clearAccesoryData(accessory) {

  //Anzahl löschen
  document.getElementById(accessory.quantityId).value = 0;
  //Daten holen
  const quantity = parseInt(document.getElementById(accessory.quantityId).value) || 0;
  const dimension = parseInt(document.getElementById(accessory.dropdownId).value) || 20;
  const totalPrice = calculatePrice(quantity, dimension, accessory.name);

  // Display price
   document.getElementById(accessory.outputId).textContent = `${totalPrice} €`;

    // Save accessory data to Local Storage
    saveToLocalStorage(accessory.id, {
      name: accessory.name,
      quantity,
      dimension,
      totalPrice,
    });
}

  // Function to save all accessories to Local Storage
  function saveToLocalStorage(accessoryId, data) {
    let savedData = JSON.parse(localStorage.getItem("accessories")) || {};
    savedData[accessoryId] = data;
    localStorage.setItem("accessories", JSON.stringify(savedData));
  }

  // Function to load accessories from Local Storage
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

  // Add event listeners for Add-Buttons
  accessories.forEach((accessory) => {
    const addButton = document.getElementById(`iFixAdd${accessory.id}`);
    if (addButton) {
      addButton.addEventListener("click", () => updatePriceDisplay(accessory));
    }
  });

    // Add event listeners for Add-Buttons
    accessories.forEach((accessory) => {
      const clearButton = document.getElementById(`iClearAdd${accessory.id}`);
      if (clearButton) {
        clearButton.addEventListener("click", () => clearAccesoryData(accessory));
      }
    });

  // Load data from Local Storage when the page is loaded
  loadFromLocalStorage();
});












