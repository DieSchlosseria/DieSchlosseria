
//____________________VARIABLEN_______________________
let configurations = [];
let currentIndex = 0
let outputText = "";

// Das Output-Element auswählen --> für Popup
const outDim = document.getElementById("outDim");
const outCost = document.getElementById("outCost");
const outDeliv = document.getElementById("outDeliv");

//HooverButton
let isButtonClicked = false;
let hideTimeout; // Timeout-Variable hinzugefügt
const buttonStates = {};

//Eingabe Maße
var width = width ?? 150;;
var hight = hight ?? 100;
var deepth = deepth ?? 100;
var middleH = middleH ?? 80;
var middleV = middleV ?? 115;
var perspective = perspective ?? 25;
var material = material ?? 15;
var materialScaled = materialScaled ?? 1.5;

//Input Value
const widthInput = document.getElementById("iWidth");
const hightInput = document.getElementById("iHight");
const deepthInput = document.getElementById("iDeepth");
const MaterialInput = document.getElementById("iMaterial");
const MiddleInput = document.getElementById("iMiddleH");
const MiddleLengthInput = document.getElementById("iMiddleV");
const perspectiveInput = document.getElementById("iPerspective");

//InOutput (anzeige aktuelle Werte)
const materialOutput = document.getElementById("materialOutput");
const hightOutput = document.getElementById("hightOutput");
const widthOutput = document.getElementById("widthOutput");
const deepthOutput = document.getElementById("deepthOutput");
const middleVOutput = document.getElementById("middleVOutput");
const middleHOutput = document.getElementById("middleHOutput");

//Preis
var Total = 0;
const PricePerMeter = 10; //Preis pro Meter bei einem 20mm Quadratrohr
const PricePerPeace = 10; //Für ABschnitt zusammenschweißen usw.
const PriceVersand = 30; // Versand etc.

const add = document.getElementById("iAdd");
let takenWidth;
let takenHight;
let takenDeepth;

//Eingabe Slider --> führt Input aus
MaterialInput.addEventListener("input", getData);
hightInput.addEventListener("input", getData);
widthInput.addEventListener("input", getData);
deepthInput.addEventListener("input", getData);
MiddleInput.addEventListener("input", getData);
MiddleLengthInput.addEventListener("input", getData);
perspectiveInput.addEventListener("input", getData);

//Ein/Ausblenden
function displayed(ButtonList, id, show) {
  // Hole das Element anhand der ID
  var element = document.getElementById(id);

  // Überprüfe, ob das Element gefunden wurde
  if (!element) {
      console.error("Element mit ID " + id + " nicht gefunden.");
      return;
  }

  // Prüfen, ob einer der Buttons aktiv ist (true)
  let showElement = false;
  for (let button of ButtonList) {
      if (buttonStates[button]) {
          showElement = true;
          break; // Wenn einer wahr ist, abbrechen und das Element anzeigen
      }
  }

  // Blende das Element ein oder aus
  if (showElement) {
      element.style.display = show; // Element anzeigen
  } else {
      element.style.display = "none"; // Element ausblenden
  }
}

function updateInput(id, input, min, max) {
  let value = parseInt(input.value);
  value = Math.max(min, Math.min(value, max)); // Begrenze auf min/max
  localStorage.setItem(id, value);
  return value;
  };

//Linien in Canvas zeichnen
function draw(){

//______________________________TEST_______________________________
let trueCount = 0; // Variable zur Zählung der "true"-Werte
      
      for (const key in buttonStates) {
        if (buttonStates.hasOwnProperty(key) && buttonStates[key] === true) {
          trueCount++; // Erhöhe die Zählvariable, wenn der Wert "true" ist
        }
      }   

}
  
//Werte von Inputfeld übernehmen Limitieren und in localStorage  
function getData() {

width = updateInput("iWidth", widthInput, 10, 200);
hight = updateInput("iHight", hightInput, 10, 200);
deepth =  updateInput("iDeepth", deepthInput, 10, 200);
var limitMiddleH = hight; 
var limitMiddleV = width;
middleH = updateInput("iMiddleH",MiddleInput, 10, limitMiddleH);
middleV = updateInput("iMiddleV",MiddleLengthInput, 10, limitMiddleV);
perspective = updateInput("iPerspective",perspectiveInput, 10, 50);
material = updateInput("iMaterial", MaterialInput, 15, 50)
materialScaled = (Math.ceil(material/5)*5)/10; //in cm und in 5 schritten wandeln   

ActInput();  
}

function setButtons(){
  // Speichere das aktualisierte buttonStates-Objekt in localStorage
    localStorage.setItem("buttonStates", JSON.stringify(buttonStates));
}

function getButtons(){

// Lade den gespeicherten Zustand aus localStorage und weise ihn direkt buttonStates zu
  const savedStates = JSON.parse(localStorage.getItem("buttonStates")) || {}; // Hole die gespeicherten Daten oder setze auf {} als Fallback
// Kopiere die gespeicherten Zustände in das bereits vorhandene buttonStates-Objekt
  Object.assign(buttonStates, savedStates);


}

function setData(){
//Inputwerte aktualisieren
widthInput.value = localStorage.getItem("iWidth");
localStorage.setItem("iWidth", width);

hightInput.value = localStorage.getItem("iHight");
localStorage.setItem("iHight", hight);

deepthInput.value = localStorage.getItem("iDeepth");
localStorage.setItem("iDeepth", deepth);

MaterialInput.value = localStorage.getItem("iMaterial");
localStorage.setItem("iMaterial", material);

MiddleInput.value = localStorage.getItem("iMiddleH");
localStorage.setItem("iMiddleH", middleH);

MiddleLengthInput.value = localStorage.getItem("iMiddleV");
localStorage.setItem("iMiddleV", middleV);

perspectiveInput.value = localStorage.getItem("iPerspective");
localStorage.setItem("iPerspective", perspective);
}

//Ein/Ausgabe aktualisieren
function ActInput(){ //Ein-Ausgänge aktualisieren

  widthInput.value = width;
  hightInput.value = hight;
  deepthInput.value = deepth;
  MaterialInput.value = materialScaled * 10;
  MiddleLengthInput.value = middleV;
  MiddleInput.value = middleH;
  perspectiveInput.value = perspective;

  materialOutput.value = materialScaled * 10; 
  hightOutput.value = hight;
  widthOutput.value = width;
  deepthOutput.value = deepth;
  middleVOutput.value = middleV;
  middleHOutput.value = middleH;
}

//Design löschen
function FuncClear(){

  PreConfigDesign(100, 150, 100, 80, 65, 26, 40,  0, 0 , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  
}

//Für Hoover Würfel
function funcHooverButton(){
  const button = document.getElementById("hoverButton");
  const svg = document.querySelector("svg");             
  // Event-Listener für Klick
  button.addEventListener("click", function () {
    const lineId = button.getAttribute("data-line-id");
 // Toggle den Status des Buttons
    buttonStates[lineId] = !buttonStates[lineId]; // Invertiere den aktuellen Status
setButtons();
  });

   // Funktion zum Aktualisieren der Button-Position
  function updateButtonPosition(x, y) {
    button.style.left = x - 5 + "px";
    button.style.top = y - 5 + "px";
  }

  svg.addEventListener("mousemove", function (e) {
    
   const mouseX = e.clientX;
    const mouseY = e.clientY;
  
    const svgRect = svg.getBoundingClientRect(); // Das SVG-Element Rechteck erhalten
  
   const relativeX = mouseX - svgRect.left; // Relative X-Position innerhalb des SVG
    const relativeY = mouseY - svgRect.top; // Relative Y-Position innerhalb des SVG
  
  
    let closestLine = null;
    let closestDistance = Number.MAX_SAFE_INTEGER;
  
    const lines = document.querySelectorAll(".cube-line");
  
    lines.forEach((line) => {
      const lineBox = line.getBBox();
      const lineX = (lineBox.x + lineBox.x + lineBox.width) / 2;
      const lineY = (lineBox.y + lineBox.y + lineBox.height) / 2;
      const distance = Math.sqrt(
        Math.pow(relativeX - lineX, 2) + Math.pow(relativeY - lineY, 2)
      );
  
      if (distance < closestDistance) {
        closestDistance = distance;
        closestLine = line;
      }
    });
  
    lines.forEach((line) => {
      line.classList.remove("hovered");
    });
  
    if (closestLine) {
      closestLine.classList.add("hovered");
      button.style.display = "block";
      updateButtonPosition(mouseX, mouseY); // Button-Position aktualisieren
      button.setAttribute("data-line-id", closestLine.id);
    
      isButtonClicked = false;
      clearTimeout(hideTimeout);
    } else {
      hideTimeout = setTimeout(() => {
        button.style.display = "none";
      
      }, 200);
    }
  });
}

// Produktbeispiele bzw konfiguration vorbestimmen
 function PreConfigDesign(tHight, tWidth, tDeepth, tmiddleH, tmiddleV, tPerspective, tMaterial ,tFrontTop, tFrontBottom , tLeftTop, tRightTop, tBackTop, tBackBottom, tFrontRight, tBackRight, tFrontLeft, tBackLeft, tRightBottom, tLeftBottom, tFrontMiddleCross, tFrontMiddleLength, tBackMiddleCross, tBackMiddleLength, tRightMiddleCross, tLeftMiddleCross) {

  // Strebenzustände setzen
  buttonStates["FrontTop"] = tFrontTop;
  buttonStates["FrontBottom"] = tFrontBottom;
  buttonStates["LeftTop"] = tLeftTop;
  buttonStates["RightTop"] = tRightTop;
  buttonStates["BackTop"] = tBackTop;
  buttonStates["BackBottom"] = tBackBottom;
  buttonStates["FrontRight"] = tFrontRight;
  buttonStates["BackRight"] = tBackRight;
  buttonStates["FrontLeft"] = tFrontLeft;
  buttonStates["BackLeft"] = tBackLeft; // Hier war ein Tippfehler (ttBackleftrue)
  buttonStates["RightBottom"] = tRightBottom;
  buttonStates["LeftBottom"] = tLeftBottom;
  buttonStates["FrontMiddleCross"] = tFrontMiddleCross;
  buttonStates["FrontMiddleLenght"] = tFrontMiddleLength;
  buttonStates["BackMiddleCross"] = tBackMiddleCross;
  buttonStates["BackMiddleLenght"] = tBackMiddleLength;
  buttonStates["RightMiddleCross"] = tRightMiddleCross;
  buttonStates["LeftMiddleCross"] = tLeftMiddleCross;

  // Dimensionen setzen
  hight = tHight;
  width = tWidth;
  deepth = tDeepth;
  middleH = tmiddleH;
  middleV = tmiddleV;
  perspective= tPerspective;
  materialScaled = (Math.ceil(tMaterial / 5) * 5) / 10; // in cm und in 5 Schritten wandeln;
  
setData();
ActInput();  
setButtons();

}

// Funktion zur Berechnung der Gesamtwerte
function calculateTotal(buttonStates, dimensions, keys) {
  return keys.reduce((total, key) => total + (buttonStates[key] ? dimensions : 0), 0);
}

//Rückgabewert gleich 0 wenn die entsprechenden streben nicht angewählt sind
function setValueToZero(ButtonList, dimension) {
  for (let button of ButtonList) {
    if (buttonStates[button]) {
      return dimension; // Gibt den Wert von dimension zurück, wenn ein Taster gedrückt ist
    }
  }
  return 0; // Gibt 0 zurück, wenn keiner der Taster gedrückt ist
}

//______________________AUSFÜHREN_____________________

funcHooverButton();

//alle werte zurücksetzen
var clear = document.getElementById("iTrash");
clear.addEventListener('click', FuncClear);

//Seite neu laden
window.onload = function() {
  getButtons();
  setData();
  getData();
  };

//Zyklischer ablauf
setInterval(value, 200);

function value(){
// Elemente ein/ausblenden
displayed(["FrontMiddleLenght", "BackMiddleLenght"], "displayV", "flex");
displayed(["FrontMiddleCross", "BackMiddleCross"], "displayH", "flex");
//displayed( ["LeftTop", "RightBottom", "RightTop",  "LeftBottom", "RightMiddleCross", "LeftMiddleCross"], "iPerspBox", "flex");
};

//____________________________POPUP_FENSTER______________________________________

const PopUp = document.getElementById('showPopup');
var fulllength; 
var delivery;
var countEdge;
var element; 

PopUp.addEventListener('click', () => {
 takenWidth = setValueToZero(["FrontTop", "FrontBottom", "FrontMiddleCross", "BackTop", "BackBottom", "BackMiddleCross"], width);
 takenHight = setValueToZero(["FrontLeft", "FrontRight", "FrontMiddleLength", "BackLeft", "BackRight", "BackMiddleLength"], hight);
 takenDeepth = setValueToZero(["LeftBottom", "LeftTop", "LeftMiddleCross", "RightBottom", "RightTop", "RightMiddleCross"], deepth);

 //Lieferung 
if (takenDeepth > 150 || takenWidth > 150 || takenHight > 150 ) {
  delivery = "Nur Abholung";
} else {
  delivery = "Versand möglich";
};

//Preis berechnen
let trueCount = Object.values(buttonStates).filter(value => value == true).length;

// Berechnung der Gesamtwerte für Länge, Höhe und Tiefe
var FullWidth = calculateTotal(buttonStates, takenWidth, ["FrontTop", "FrontBottom", "FrontMiddleCross", "BackTop", "BackBottom", "BackMiddleCross"]);
var FullHeight = calculateTotal(buttonStates, takenHight, ["FrontLeft", "FrontRight", "FrontMiddleLength", "BackLeft", "BackRight", "BackMiddleLength"]);
var FullDepth = calculateTotal(buttonStates, takenDeepth, ["LeftBottom", "LeftTop", "LeftMiddleCross", "RightBottom", "RightTop", "RightMiddleCross"]);
var Fulllength = (FullWidth + FullHeight + FullDepth)/100 * (material/20); //Für 20mm Quadratrohr kalkuliert
if (Fulllength > 0) { PricePauschal = PriceVersand;} else {PricePauschal = 0;};
Total = Fulllength * PricePerPeace + trueCount * PricePerPeace + PricePauschal;

//_________________AUSGABEWERTE____________________
// Den Wert der Variable in das Output-Element einfügen

outDim.textContent = takenWidth + "X" + takenDeepth + "X" + takenHight ;
outCost.textContent = Total + "€" ;
outDeliv.textContent = delivery ;
});

for (const id in buttonStates) {
  if (buttonStates.hasOwnProperty(id)) {
    const status = buttonStates[id];
  }
};

//_________________________________FORMULAR_SENDEN____________________________________

//Speichere Object
add.addEventListener('click', () => {

  for (const id in buttonStates) {
    if (buttonStates.hasOwnProperty(id)) {
      const status = buttonStates[id];
      outputText += `ID: ${id}, Status: ${status}\n`;
    }
  };

  // Create an object with the current configuration
  const currentConfig = {
      bitmuster: outputText,
      dicke: materialScaled * 10,
      width: takenWidth,
      deepth: takenDeepth,
      hight: takenHight,
      total: Total,
  };

  // Save the current configuration to the array
  configurations[currentIndex] = currentConfig;

  // Increment the index for the next configuration
  currentIndex++;

localStorage.setItem('configurations', JSON.stringify(configurations));
  alert("erfolgreich zum Warenkorb hinzugefügt.");  
});
//_________________________________________________________________________________---


// Beim Laden der Seite --> Konfigurationen wiederherstellen
window.addEventListener('load', () => {
  // Laden der gespeicherten Konfigurationen aus dem Local Storage
  const storedConfigurations = localStorage.getItem('configurations');
  ActInput();

  // Überprüfen, ob gespeicherte Konfigurationen vorhanden sind
  if (storedConfigurations) {
    configurations = JSON.parse(storedConfigurations);
    currentIndex = configurations.length; // Setzen Sie den Index auf die nächste verfügbare Position
  }

});
























