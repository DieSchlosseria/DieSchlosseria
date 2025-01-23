// VARIABLEN
const popups = [
  {
    showButtonId: 'showPopup',
    overlayId: 'popupOverlay',
    closeButtonId: 'closePopup',
    closeActionId: 'iDefined1n', // ID des Nein-Buttons
  },
  {
    showButtonId: 'showPopup1',
    overlayId: 'popupOverlay1',
    closeButtonId: 'closePopup1',
    closeActionId: 'iDefined2n', // ID des Nein-Buttons
  },
];

const Ids = [
  {
    IdJ: "iDefined1j", // ID des Ja-Buttons
    IdN: "iDefined1n", // ID des Nein-Buttons
  },
  {
    IdJ: "iDefined2j", // ID des Ja-Buttons
    IdN: "iDefined2n", // ID des Nein-Buttons
  }
];

// Funktion zur Initialisierung der Popups
function popup() {
  const togglePopup = (popup) => {
    const showButton = document.getElementById(popup.showButtonId);
    const overlay = document.getElementById(popup.overlayId);
    const closeButton = document.getElementById(popup.closeButtonId);
    const closeAction = document.getElementById(popup.closeActionId);

    if (showButton && overlay && closeButton && closeAction) {
      // Öffnen des Popups
      showButton.addEventListener('click', () => {
        overlay.style.display = 'block';
      });

      // Schließen mit der Schließen-Taste
      closeButton.addEventListener('click', () => {
        overlay.style.display = 'none';
      });

      // Schließen mit der "Nein"-Aktion
      closeAction.addEventListener('click', () => {
        overlay.style.display = 'none';
      });
    } else {
      console.warn(`Fehlende Elemente für Popup:`, popup);
    }
  };

  // Alle Popups initialisieren
  popups.forEach(togglePopup);
}

// Funktion zur Initialisierung der Klick-Events für die IDs
function initializeIds() {
  Ids.forEach((defined) => {
    const idJ = defined.IdJ;
    const element = document.getElementById(idJ);

    if (element) {
      element.addEventListener("click", function() {
        localStorage.setItem(idJ, "true");
        window.location.href = 'index.html';
      });
    } else {
      console.warn(`Element mit ID ${idJ} nicht gefunden.`);
    }
  });
}

// Initialisierungen ausführen
document.addEventListener("DOMContentLoaded", () => {
  popup();
  initializeIds();
});