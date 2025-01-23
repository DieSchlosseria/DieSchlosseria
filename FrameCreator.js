//Funktionen Vordefinieren
//VAriablen
let configurations = [];
let currentIndex = 0
let outputText = "";

// Das Output-Element auswählen
const outDim = document.getElementById("outDim");
const outCost = document.getElementById("outCost");
const outDeliv = document.getElementById("outDeliv");


//HooverButton
let isButtonClicked = false;
let hideTimeout; // Timeout-Variable hinzugefügt
const buttonStates = {};

//Eingabe Maße
var width = 100;
var hight = 100;
var deepth = 100;
var middleH = 50;
var middleV = 50;
var perspective =40;
var material = 15;
let materialScaled = 1.5;
//Input (Slider)
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

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//__________________EINGABE_____________________

//___________________DATEN_Übernehmen_von_Slider____________________

MaterialInput.addEventListener("input", TakeData);
hightInput.addEventListener("input", TakeData);
widthInput.addEventListener("input", TakeData);
deepthInput.addEventListener("input", TakeData);
MiddleInput.addEventListener("input", TakeData);
MiddleLengthInput.addEventListener("input", TakeData);

perspectiveInput.addEventListener("input", TakeData);

//___________________STREBEN_SETZTEN_LÖSCHEN__________________
funcHooverButton();

// _____________________________________________________________

//___________________________________Canvas__________________________________________________
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

ctx.fillStyle = 'whitesmoke';
ctx.fillRect(0, 0, canvas.width, canvas.height);


//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX//
//________________________________________________Alles loeschen__________________________________________//

//Streben löschen

var clear = document.getElementById("iTrash");

clear.addEventListener('click', FuncClear);


//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX//
//________________________________________________Produktbeispiele__________________________________________//


window.onload = function() {
// Produktbeispiel 1
  const Defined1 = localStorage.getItem("iDefined1j");
  if (Defined1 === "true") {
    productExample(120, 110, 50, 50, 50, 40, 20, 1, 0 , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0);}
    localStorage.setItem("iDefined1n", "false");

    // Produktbeispiel 
   const Defined2 = localStorage.getItem("iDefined2j");
   if (Defined2 === "true") {
   productExample(120, 60, 50, 50, 50, 40, 15, 1, 1 , 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0);}
   localStorage.setItem("iDefined2n", "false"); 
};

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX//
//______________________________________________________________________________________________//



setInterval(value, 200);

function value(){

draw();

// Elemente ein/ausblenden
displayed(["FrontMiddleLenght", "BackMiddleLenght"], "displayV", "flex");
displayed(["FrontMiddleCross", "BackMiddleCross"], "displayH", "flex");
displayed( ["LeftTop", "RightBottom", "RightTop",  "LeftBottom", "RightMiddleCross", "LeftMiddleCross"], "iPerspBox", "flex");

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

};


function draw(){

ctx.fillStyle = 'hsl(0, 0%, 90%)';
ctx.fillRect(0, 0, canvas.width, canvas.height);

let offseet1 = (1 - Math.sin(perspective * (Math.PI / 180))) * deepth;
let offseet2 = (  Math.sin(perspective * (Math.PI / 180))) * deepth;
//let offseet2 = deepth/2 *      perspective/90 ; //Y-Position

ctx.strokeStyle = 'black';
ctx.shadowColor = 'whitesmoke';
ctx.shadowBlur = 1;
ctx.lineJoin = "round";
ctx.lineWidth = materialScaled;
//__________________________Zeichnen____________________________

let startXFront = (canvas.width/2)  - (width/2) - (offseet1/2);
let startXBack = startXFront + width;
let startYFront = (canvas.height/2) + (hight/2) +  (offseet2/2);

//__________________________Front____________________________
FuncLineDraw("FrontTop",startXFront, startYFront - hight, startXFront + width, startYFront - hight);
FuncLineDraw("FrontLeft",startXFront, startYFront, startXFront, startYFront - hight);
FuncLineDraw("FrontMiddleCross",startXFront,  startYFront - middleH ,  startXFront + width, startYFront - middleH);
FuncLineDraw("FrontRight", startXFront  + width , startYFront   ,  startXFront + width, startYFront - hight  );
FuncLineDraw("FrontBottom", startXFront  ,startYFront    , startXFront + width, startYFront  );
FuncLineDraw("FrontMiddleLenght",startXFront + middleV   , startYFront   ,  startXFront + middleV   , startYFront - hight  );

//__________________________Back____________________________
FuncLineDraw("BackLeft",startXFront + offseet1 ,startYFront - offseet2 , startXFront + offseet1 , startYFront - hight - offseet2);
FuncLineDraw("BackTop",startXFront + offseet1 ,  startYFront - hight - offseet2 , startXFront + offseet1 + width , startYFront - hight - offseet2);
FuncLineDraw("BackRight", startXFront + offseet1 + width, startYFront - offseet2 , startXFront + offseet1 + width ,startYFront - hight - offseet2 );
FuncLineDraw("BackBottom",startXFront + offseet1 , startYFront - offseet2 ,startXFront + offseet1 + width , startYFront -offseet2);
FuncLineDraw("BackMiddleCross",startXFront + offseet1 ,startYFront - middleH - offseet2  ,startXFront + width + offseet1  ,startYFront - middleH - offseet2 );
FuncLineDraw("BackMiddleLenght", startXFront  + offseet1 + middleV , startYFront- offseet2 ,  startXFront  + offseet1 + middleV   , startYFront - hight - offseet2 );

//__________________________Seite____________________________
FuncLineDraw("LeftTop", startXFront  , startYFront - hight  , startXFront + offseet1 ,  startYFront  -  hight - offseet2 );
FuncLineDraw("RightBottom", startXBack  , startYFront  ,  startXBack + offseet1 , startYFront - offseet2 );
FuncLineDraw("RightTop", startXBack  , startYFront -hight  , startXBack + offseet1  , startYFront  - offseet2 - hight );
FuncLineDraw("LeftBottom", startXFront  , startYFront  ,startXFront + offseet1  , startYFront - offseet2 );
FuncLineDraw("RightMiddleCross", startXBack  , startYFront - middleH  ,  startXBack + offseet1 , startYFront  - offseet2 - middleH ); 
FuncLineDraw("LeftMiddleCross", startXFront  , startYFront - middleH  , startXFront + offseet1  , startYFront  -  middleH -offseet2 );

//______________________________TEST_______________________________

    let trueCount = 0; // Variable zur Zählung der "true"-Werte
    
    for (const key in buttonStates) {
      if (buttonStates.hasOwnProperty(key) && buttonStates[key] === true) {
        trueCount++; // Erhöhe die Zählvariable, wenn der Wert "true" ist
      }
    }    
};


//____________________________POPUP_FENSTER______________________________________

const PopUp = document.getElementById('showPopup');

var fulllength; 
var delivery;
var countEdge;
var element; 

PopUp.addEventListener('click', () => {
//Lieferung 
if (deepth > 150 || width > 150 || hight > 150 ) {
  delivery = "Nur Abholung";
} else {
  delivery = "Versand möglich";
}

//__________________Preis_berechnen______________________________

let trueCount = Object.values(buttonStates).filter(value => value == true).length;

// Berechnung der Gesamtwerte für Länge, Höhe und Tiefe
var FullWidth = calculateTotal(buttonStates, width, ["FrontTop", "FrontBottom", "FrontMiddleCross", "BackTop", "BackBottom", "BackMiddleCross"]);
var FullHeight = calculateTotal(buttonStates, hight, ["FrontLeft", "FrontRight", "FrontMiddleLength", "BackLeft", "BackRight", "BackMiddleLength"]);
var FullDepth = calculateTotal(buttonStates, deepth, ["LeftBottom", "LeftTop", "LeftMiddleCross", "RightBottom", "RightTop", "RightMiddleCross"]);






var Fulllength = (FullWidth + FullHeight + FullDepth)/100 * (material/20); //Für 20mm Quadratrohr kalkuliert

if (Fulllength > 0) { PricePauschal = PriceVersand;} else {PricePauschal = 0;}

Total = Fulllength * PricePerPeace + trueCount * PricePerPeace + PricePauschal;

//_________________AUSGABEWERTE____________________

        // Den Wert der Variable in das Output-Element einfügen
        outDim.textContent = width + "X" + deepth + "X" + hight ;
        outCost.textContent = Total + "€" ;
        outDeliv.textContent = delivery ;
  
});


for (const id in buttonStates) {
  if (buttonStates.hasOwnProperty(id)) {
    const status = buttonStates[id];
  }
}



//_________________________________FORMULAR_SENDEN____________________________________
//!!!!!!!!!!!!!!!!!!!!!!! Bereich wieder einblenden wenn Email gesendet werden soll!!!!!!!!!!!!!!!!!!!!!!!!

//Speichere Object

// Inside the button click event listener (where you want to save the configuration)
add.addEventListener('click', () => {
  // ... your existing code

  for (const id in buttonStates) {
    if (buttonStates.hasOwnProperty(id)) {
      const status = buttonStates[id];
      outputText += `ID: ${id}, Status: ${status}\n`;
    }
  }

  // Create an object with the current configuration
  const currentConfig = {
      bitmuster: outputText,
      dicke: materialScaled * 10,
      width: width,
      deepth: deepth,
      hight: hight,
      total: Total,
  };

  // Save the current configuration to the array
  configurations[currentIndex] = currentConfig;

  // Increment the index for the next configuration
  currentIndex++;

console.log(configurations);

localStorage.setItem('configurations', JSON.stringify(configurations));
  // ... the rest of your existing code
});
//_________________________________________________________________________________---


//Allgemeine Funktionen

function TakeData() {
  width = parseInt(widthInput.value);
  hight = parseInt(hightInput.value);
  deepth = parseInt(deepthInput.value);
  material = parseInt(MaterialInput.value);
  middleH = parseInt(MiddleInput.value);
  middleV = parseInt(MiddleLengthInput.value);
  perspective = parseInt(perspectiveInput.value);
  materialScaled = (Math.ceil(material/5)*5)/10; //in cm und in 5 schritten wandeln

  //Limit    
  width = Math.min(width, 200);
  deepth = Math.min(deepth, 200);
  material = Math.min(Math.max(material, 15), 30); // Begrenzung zwischen 15 und 30
  middleV = Math.min(middleV, width);
  middleH = Math.min(middleH, hight);

  FuncActInput();  
};  

function FuncClear(){

  productExample(100, 100, 100, 50, 50, 40, 20,  0, 0 , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

};

function FuncActInput(){ //Ein-Ausgänge setzen
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
};


function funcHooverButton(){
  const button = document.getElementById("hoverButton");
  const svg = document.querySelector("svg");
               
  button.addEventListener("click", function () {
                             
  const lineId = button.getAttribute("data-line-id");
          
  isButtonClicked = false;
  
  // Toggle den Status der button
                  if (buttonStates[lineId]) {
                   buttonStates[lineId] = false; // Button is no longer pressed
                  } else {
                buttonStates[lineId] = true; // Button is pressed
                  }
  
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
  };
 //____________________________LOCAL_STORAGE_____________________________________
function getAndDisplayLocalStorageValue(variableName) {
  // Laden des gespeicherten Werts
  var gespeicherterWert = localStorage.getItem(variableName);

  // Überprüfen, ob der Wert im Local Storage existiert
  if (gespeicherterWert !== null) {
    return  gespeicherterWert;
  }
}


// Beim Laden der Seite --> Konfigurationen wiederherstellen
window.addEventListener('load', () => {
  // Laden der gespeicherten Konfigurationen aus dem Local Storage
  const storedConfigurations = localStorage.getItem('configurations');
  FuncActInput();

  // Überprüfen, ob gespeicherte Konfigurationen vorhanden sind
  if (storedConfigurations) {
    configurations = JSON.parse(storedConfigurations);
    currentIndex = configurations.length; // Setzen Sie den Index auf die nächste verfügbare Position
  }

});


function FuncLineDraw(Button, moveToX, moveToY , lineToX, lineToY  ){

  if (( buttonStates[Button]) ) {
 //Vorne oben
 ctx.beginPath();
 ctx.moveTo(moveToX , moveToY);
 ctx.lineTo( lineToX, lineToY);
 ctx.stroke(); 
 }
 };


 // Produktbeispiele bzw konfiguration vorbestimmen
function productExample(tHight, tWidth, tDeepth, tmiddleH, tmiddleV, tPerspective, tMaterial ,tFrontTop, tFrontBottom , tLeftTop, tRightTop, tBackTop, tBackBottom, tFrontRight, tBackRight, tFrontLeft, tBackLeft, tRightBottom, tLeftBottom, tFrontMiddleCross, tFrontMiddleLength, tBackMiddleCross, tBackMiddleLength, tRightMiddleCross, tLeftMiddleCross) {

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
  
  FuncActInput();

}

// Funktion zur Berechnung der Gesamtwerte
function calculateTotal(buttonStates, dimensions, keys) {
  return keys.reduce((total, key) => total + (buttonStates[key] ? dimensions : 0), 0);
}






