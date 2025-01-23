// Globale Konfigurationen und Variablen
const START_WERT_COUNT = 0;
const START_WERT_DIMENSION = 20;
var outExtra1 = document.getElementById("outExtra1");

// Lade die Zubehör-Daten aus dem Local Storage
const savedData = JSON.parse(localStorage.getItem("accessories")) || {};

// Anzeige-Elemente
const OutTotal = document.getElementById("iTotoal");
const clearButton = document.getElementById("clearButton");

// Berechnung der Gesamtsumme
const calculateTotal = () => {
  let total = 0;

  // Addiere alle Zubehörpreise
  Object.keys(savedData).forEach((id) => {
    const accessory = savedData[id];

    total += accessory.totalPrice;

  });

  // Addiere alle Konfigurationen (falls vorhanden)
  const storedConfigurations = JSON.parse(localStorage.getItem("configurations")) || [];
  storedConfigurations.forEach((config) => {
    total += parseFloat(config.total) || 0;
  });

  return total;
};

// DOM-Inhalte initialisieren    
const initializeDOM = () => {

  Object.keys(savedData).forEach((id) => { 
    outExtra1.innerHTML  += savedData[id].quantity + " x "  + savedData[id].name + " " + savedData[id].dimension + "mm"    +  " Total " + savedData[id].totalPrice + "€" + "<br>"  ;
  });

  // Gesamtsumme berechnen und anzeigen
  if (OutTotal) {
    OutTotal.textContent = calculateTotal().toFixed(2) + " €";
  }
};

// Konfigurationen anzeigen
const displayConfigurations = () => {
  const storedConfigurations = JSON.parse(localStorage.getItem("configurations")) || [];
  if (storedConfigurations.length > 0) {
    const container = document.createElement("div");
    container.classList.add("configurations-container");

    storedConfigurations.forEach((config, index) => {
      const paragraph = document.createElement("p");
      paragraph.classList.add("cTest");

      paragraph.innerHTML = `
        Möbelstück ${index + 1}:<br>
        Breite: ${config.width},<br>
        Tiefe: ${config.deepth},<br>
        Höhe: ${config.hight},<br>
        Preis: ${parseFloat(config.total).toFixed(2)} €<br>
      `;
      container.appendChild(paragraph);
    });

    const accessoriesSection = document.querySelector(".accessories");
    if (accessoriesSection) {
      accessoriesSection.insertAdjacentElement("afterend", container);
    }
  }
};


// Löschen der Konfigurationen
const clearConfigurations = () => {
  localStorage.removeItem("configurations");
  clearAccesoryData();
  outExtra = alert("Kompletter Warenkorb wurde erfolgreich gelöscht.");
  location.reload(); // Seite neu laden
};

// Event-Listener für den Löschen-Button
if (clearButton) {
  clearButton.addEventListener("click", clearConfigurations);
}

// Formularverarbeitung (für E-Mail und Konfigurationen)
document.getElementById("emailForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const street = document.getElementById("street").value;
  const houseNumber = document.getElementById("houseNumber").value;
  const zip = document.getElementById("zip").value;
  const city = document.getElementById("city").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
 
  const accessoriesData = Object.keys(savedData).map((id) => {
    const accessory = savedData[id];
    return `${accessory.quantity} x ${accessory.name} (Total: ${accessory.totalPrice || 0}€)`;
  })
  .join(", ");

const configurationsData = JSON.stringify(
  JSON.parse(localStorage.getItem("configurations")) || []
);



const additionalData = `
  Name: ${name}
  Adresse: ${street} ${houseNumber}, ${zip} ${city}
  E-Mail: ${email}
  Nachricht: ${message}
  Zubehör: ${accessoriesData}
  Konfigurationen: ${configurationsData}
`;

  const additionalDataField = document.createElement("input");
  additionalDataField.type = "hidden";
  additionalDataField.name = "additional_data";
  additionalDataField.value = additionalData;

  this.appendChild(additionalDataField);
  this.action = "https://formspree.io/f/xjvqzjnz"; // Zieladresse
  this.submit();

  // Warenkorb zurücksetzen
  localStorage.removeItem("configurations");
  clearAccesoryData();
});

// Initialisierung der Seite
document.addEventListener("DOMContentLoaded", () => {
  initializeDOM();
  displayConfigurations();
});



//clearAccesoryData
function clearAccesoryData() {
  Object.keys(savedData).forEach((id) => {
    const accessory = savedData[id];
    accessory.quantity = 0;
    accessory.totalPrice = 0;
  });

  localStorage.setItem("accessories", JSON.stringify(savedData));

}