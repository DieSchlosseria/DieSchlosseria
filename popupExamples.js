
// VARIABLEN
const popups = [
  {
    showButtonId: 'showPopup',
    overlayId: 'popupOverlay',
    closeButtonId: 'closePopup',
  },
  {
    showButtonId: 'showPopup1',
    overlayId: 'popupOverlay1',
    closeButtonId: 'closePopup1',
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

function popup() {
  const togglePopup = (popup) => {
    const showButton = document.getElementById(popup.showButtonId);
    const overlay = document.getElementById(popup.overlayId);
    const closeButton = document.getElementById(popup.closeButtonId);

    if (showButton && overlay && closeButton) {
      // Öffnen des Popups
      showButton.addEventListener('click', () => {
        overlay.style.display = 'block';
      });

      // Schließen mit der Schließen-Taste
      closeButton.addEventListener('click', () => {
        overlay.style.display = 'none';
      });

    } else {
      console.warn(`Fehlende Elemente für Popup:`, popup);
    }
  };

  // Alle Popups initialisieren
  popups.forEach(togglePopup);
}

function initializeIds() {
  Ids.forEach((defined) => {
    const idJ = defined.IdJ;
    const idN = defined.IdN;
    const elementJ = document.getElementById(idJ);
    const elementN = document.getElementById(idN);

    if (elementJ) {
      elementJ.addEventListener("click", function() {
        localStorage.setItem(idJ, "true");
        window.location.href = 'index.html';
      });
    } else {
      console.warn(`Element mit ID ${idJ} nicht gefunden.`);
    }

    if (elementN) {
      elementN.addEventListener("click", function() {
        localStorage.setItem(idN, "true");
        window.location.href = 'index.html';
      });
    } else {
      console.warn(`Element mit ID ${idN} nicht gefunden.`);
    }
    


  });
}

// Initialisierungen ausführen
document.addEventListener("DOMContentLoaded", () => {
  popup();
  initializeIds();
});