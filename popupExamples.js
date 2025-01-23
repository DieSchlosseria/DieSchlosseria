//VARIABLEN
const popups = [
  {
    showButtonId: 'showPopup',
    overlayId: 'popupOverlay',
    closeButtonId: 'closePopup',
    closeActionId: 'iAdd',
  },
    {                                  //hier kann man zusätzliches Popup machen --> ID muss eingetragen werden usw. --> wie bei erstem
    showButtonId: 'showPopup1',
    overlayId: 'popupOverlay1',
    closeButtonId: 'closePopup1',
    closeActionId: 'iAdd1',
    },
];


var Ids = ["iDefined1", "iDefined2", "iDefined3"];  

Ids.forEach(function(id) {
    var element = document.getElementById(id);
    if (element) {
        element.addEventListener("click", function() {
            localStorage.setItem(id, "true");
            window.location.href = 'index.html';
        });
    }
});






popup();













//_________________LIB______________
function popup(){


// Popup-Daten


// Funktion zur Anzeige und Schließung von Popups
const togglePopup = (popup) => {
  const showButton = document.getElementById(popup.showButtonId);
  const overlay = document.getElementById(popup.overlayId);
  const closeButton = document.getElementById(popup.closeButtonId);
  const closeAction = document.getElementById(popup.closeActionId);

  showButton.addEventListener('click', () => {
    overlay.style.display = 'block';
  });

  closeButton.addEventListener('click', () => {
    overlay.style.display = 'none';
  });

  closeAction.addEventListener('click', () => {
    overlay.style.display = 'none';
  });
};

// Popups initialisieren
popups.forEach(popup => {
  togglePopup(popup);
});

};