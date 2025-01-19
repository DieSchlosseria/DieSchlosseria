// Globale Konfigurationen und Variablen
const START_WERT_COUNT = 0;
const START_WERT_DIMENSION = 20;

// Zubehör-Daten (einzelne Zubehörteile)
const accessories = [
  {
    id: "iFix1",
    count: parseFloat(localStorage.getItem("iFix1")) || START_WERT_COUNT,
    dimension: localStorage.getItem("myDropdown1") || START_WERT_DIMENSION,
    price: parseFloat(localStorage.getItem("iPrice1")) || 0,
    name: "Wandbefestigung",
  },
  {
    id: "iFix2",
    count: parseFloat(localStorage.getItem("iFix2")) || START_WERT_COUNT,
    dimension: localStorage.getItem("myDropdown2") || START_WERT_DIMENSION,
    price: parseFloat(localStorage.getItem("iPrice2")) || 0,
    name: "Tischbefestigung",
  },
];

// Anzeige-Elemente
const OutExtra1 = document.getElementById("outExtra1");
const OutExtra2 = document.getElementById("outExtra2");
const OutTotal = document.getElementById("iTotoal");
const clearButton = document.getElementById("clearButton");

// Berechnung der Gesamtsumme
const calculateTotal = () => {
  let total = 0;

  // Addiere alle Zubehörpreise
  accessories.forEach((accessory) => {
    total += accessory.price;
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
  accessories.forEach((accessory) => {
    const index = accessory.id.replace("iFix", ""); // Extrahiere die Nummer der ID

    const outPrice = document.getElementById(`Price${index}`);
    if (outPrice) {
      outPrice.textContent = accessory.price.toFixed(2) + " €";
    } else {
      console.error(`Element Price${index} nicht gefunden!`);
    }

    const outExtra = document.getElementById(`outExtra${index}`);
    if (outExtra) {
      outExtra.textContent = `${accessory.name} ${accessory.dimension} mm x ${accessory.count}`;
    } else {
      console.error(`Element outExtra${index} nicht gefunden!`);
    }
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

// Zubehördaten speichern
const saveAccessoryData = () => {
  accessories.forEach(({ id, count, dimension, price }) => {
    const index = id.replace("iFix", ""); // Extrahiere die ID-Nummer
    localStorage.setItem(id, count);
    localStorage.setItem(`myDropdown${index}`, dimension);
    localStorage.setItem(`iPrice${index}`, price.toString());
  });
};

// Löschen der Konfigurationen
const clearConfigurations = () => {
  localStorage.removeItem("configurations");
  accessories.forEach(({ id }) => {
    const index = id.replace("iFix", "");
    localStorage.setItem(`iPrice${index}`, "0");
  });

  alert("Kompletter Warenkorb wurde erfolgreich gelöscht.");
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

  const additionalData = `
    Name: ${name}
    Adresse: ${street} ${houseNumber}, ${zip} ${city}
    E-Mail: ${email}
    Nachricht: ${message}
    Zubehör: ${accessories
      .map(
        (accessory) =>
          `${accessory.name}: ${accessory.dimension} mm, ${accessory.count}x`
      )
      .join(", ")}
    Konfigurationen: ${JSON.stringify(JSON.parse(localStorage.getItem("configurations")) || [])}
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
  saveAccessoryData();
});

// Initialisierung der Seite
document.addEventListener("DOMContentLoaded", () => {
  initializeDOM();
  displayConfigurations();
});
