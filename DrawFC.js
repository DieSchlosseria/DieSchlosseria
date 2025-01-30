// Initialisierung der Koordinaten
let LineCoord = {
  FrontTop: {x1: null, y1: null, x2: null, y2: null},
  FrontBottom: {x1: null, y1: null, x2: null, y2: null},
  FrontRight: {x1: null, y1: null, x2: null, y2: null},
  FrontLeft: {x1: null, y1: null, x2: null, y2: null},
  FrontMiddleCross: {x1: null, y1: null, x2: null, y2: null},
  FrontMiddleLength: {x1: null, y1: null, x2: null, y2: null},
  BackTop: {x1: null, y1: null, x2: null, y2: null},
  BackBottom: {x1: null, y1: null, x2: null, y2: null},
  BackRight: {x1: null, y1: null, x2: null, y2: null},
  BackLeft: {x1: null, y1: null, x2: null, y2: null},
  BackMiddleCross: {x1: null, y1: null, x2: null, y2: null},
  BackMiddleLenght: {x1: null, y1: null, x2: null, y2: null},
  RightBottom: {x1: null, y1: null, x2: null, y2: null},
  RightTop: {x1: null, y1: null, x2: null, y2: null},
  LeftBottom: {x1: null, y1: null, x2: null, y2: null},
  LeftTop: {x1: null, y1: null, x2: null, y2: null},
  RightMiddleCross: {x1: null, y1: null, x2: null, y2: null},
  LeftMiddleCross: {x1: null, y1: null, x2: null, y2: null},
};
const lines = [
  "iFrontTop", "iFrontBottom", "iFrontLeft", "iFrontRight", "iFrontMiddleCross",
  "iFrontMiddleLenght", "iBackLeft", "iBackTop", "iBackRight", "iBackBottom",
  "iFrontBottom", "iBackMiddleCross", "iBackMiddleLenght", "iLeftTop", 
  "iRightBottom", "iRightTop", "iLeftBottom", "iRightMiddleCross", "iLeftMiddleCross"
];
//______________TEST_____________
let test = document.getElementById("iDisplayLine");
let isActive = false; // Die Variable, die getoggelt wird

test.addEventListener("click", function () {
  isActive = !isActive; // Toggle der Variable
  console.log("isActive:", isActive); // Zum Debuggen in der Konsole ausgeben
//Zustand ausgeben
if (isActive) {
  test.innerHTML = "Hilfslinien einblenden";
} else {
  test.innerHTML = "Hilfslinien ausblenden";
}
});


// Funktion zum Ändern der Linienbreite
function changeMultipleLineWidths(lineIds, width) {
  const line = document.getElementById(lineIds);
  if (line) {
    line.style.strokeWidth = width;
  }
}

// Zyklischer Ablauf alle 200ms
setInterval(value, 200);

function value() {
  // Elemente ein/ausblenden
     displayed(["iFrontMiddleLenght", "iBackMiddleLenght"], "displayV", "flex");
     displayed(["iFrontMiddleCross", "iBackMiddleCross"], "displayH", "flex");
     //displayed( ["LeftTop", "RightBottom", "RightTop",  "LeftBottom", "RightMiddleCross", "LeftMiddleCross"], "iPerspBox", "flex");

  lines.forEach(line => createLine(line));
  drawSvg();
}

// Funktion zum Zeichnen der Linien im SVG
function drawSvg() {
  const WindowWidth = 350;
  const WindowHeight = 350;
  console.log(perspective);
  let offset1 = (1 - Math.sin(perspective * (Math.PI / 180))) * deepth;
  let offset2 = (  Math.sin(perspective * (Math.PI / 180))) * deepth;

  let starty = WindowHeight / 2 - hight / 2 + offset1/2; 
  let startx = WindowWidth / 2 - width / 2 - offset2/2;  

  // Aktualisierung der Koordinaten
  //Vorne oben
  LineCoord.FrontTop.x1 = startx;
  LineCoord.FrontTop.y1 = starty;
  LineCoord.FrontTop.x2 = startx + width;
  LineCoord.FrontTop.y2 = starty;
  //Vorne unten
  LineCoord.FrontBottom.x1 = startx;
  LineCoord.FrontBottom.y1 = starty + hight;
  LineCoord.FrontBottom.x2 = startx + width;
  LineCoord.FrontBottom.y2 = starty + hight;
  //Vorne links
  LineCoord.FrontLeft.x1 = startx;
  LineCoord.FrontLeft.y1 = starty;
  LineCoord.FrontLeft.x2 = startx;
  LineCoord.FrontLeft.y2 = starty + hight;
  //Vorne rechts
  LineCoord.FrontRight.x1 = startx + width;
  LineCoord.FrontRight.y1 = starty;
  LineCoord.FrontRight.x2 = startx + width;
  LineCoord.FrontRight.y2 = starty + hight;
  //Hinten oben
  LineCoord.BackTop.x1 = startx + offset2;
  LineCoord.BackTop.y1 = starty - offset1;
  LineCoord.BackTop.x2 = startx + width + offset2;
  LineCoord.BackTop.y2 = starty - offset1;
  //Hinten unten
  LineCoord.BackBottom.x1 = startx + offset2;
  LineCoord.BackBottom.y1 = starty + hight - offset1;
  LineCoord.BackBottom.x2 = startx + width + offset2;
  LineCoord.BackBottom.y2 = starty + hight - offset1;
  //Hinten links
  LineCoord.BackLeft.x1 = startx + offset2;
  LineCoord.BackLeft.y1 = starty - offset1;
  LineCoord.BackLeft.x2 = startx + offset2;
  LineCoord.BackLeft.y2 = starty + hight - offset1;
  //Hinten rechts
  LineCoord.BackRight.x1 = startx + width + offset2;
  LineCoord.BackRight.y1 = starty - offset1;
  LineCoord.BackRight.x2 = startx + width + offset2;
  LineCoord.BackRight.y2 = starty + hight - offset1;
  
  //oben links
  LineCoord.LeftTop.x1 = startx;
  LineCoord.LeftTop.y1 = starty;
  LineCoord.LeftTop.x2 = startx + offset2;
  LineCoord.LeftTop.y2 = starty - offset1;

  //unten links
  LineCoord.LeftBottom.x1 = startx;
  LineCoord.LeftBottom.y1 = starty + hight ;
  LineCoord.LeftBottom.x2 = startx + offset2;
  LineCoord.LeftBottom.y2 = starty + hight - offset1;

  //oben rechts
  LineCoord.RightTop.x1 = startx + width;
  LineCoord.RightTop.y1 = starty;
  LineCoord.RightTop.x2 = startx + offset2 + width;
  LineCoord.RightTop.y2 = starty - offset1;

  //unten rechts
  LineCoord.RightBottom.x1 = startx + width;
  LineCoord.RightBottom.y1 = starty + hight ;
  LineCoord.RightBottom.x2 = startx + width + offset2;
  LineCoord.RightBottom.y2 = starty + hight - offset1;

  LineCoord.FrontMiddleCross.x1 = startx;
  LineCoord.FrontMiddleCross.y1 = starty  + hight - middleH;
  LineCoord.FrontMiddleCross.x2 = startx + width ;
  LineCoord.FrontMiddleCross.y2 = starty  + hight  - middleH;

  LineCoord.FrontMiddleLength.x1 = startx + middleV;
  LineCoord.FrontMiddleLength.y1 = starty;
  LineCoord.FrontMiddleLength.x2 = startx + middleV;
  LineCoord.FrontMiddleLength.y2 = starty + hight;

  LineCoord.BackMiddleCross.x1 = startx + offset2;
  LineCoord.BackMiddleCross.y1 = starty  + hight - middleH - offset1;
  LineCoord.BackMiddleCross.x2 = startx + width + offset2;
  LineCoord.BackMiddleCross.y2 = starty  + hight  - middleH - offset1;

  LineCoord.BackMiddleLenght.x1 = startx + middleV + offset2;
  LineCoord.BackMiddleLenght.y1 = starty - offset1;
  LineCoord.BackMiddleLenght.x2 = startx + middleV + offset2;
  LineCoord.BackMiddleLenght.y2 = starty + hight - offset1;

  LineCoord.RightMiddleCross.x1 = startx + width ;
  LineCoord.RightMiddleCross.y1 = starty  + hight - middleH;
  LineCoord.RightMiddleCross.x2 = startx + width + offset2;
  LineCoord.RightMiddleCross.y2 = starty  + hight - middleH - offset1;

  LineCoord.LeftMiddleCross.x1 = startx;
  LineCoord.LeftMiddleCross.y1 = starty  + hight - middleH;
  LineCoord.LeftMiddleCross.x2 = startx + offset2;
  LineCoord.LeftMiddleCross.y2 = starty  + hight - middleH - offset1;

  DrawLine(LineCoord.FrontTop, "iFrontTop");
  DrawLine(LineCoord.FrontBottom, "iFrontBottom");
  DrawLine(LineCoord.FrontRight, "iFrontRight");
  DrawLine(LineCoord.FrontLeft, "iFrontLeft");

  DrawLine(LineCoord.BackTop, "iBackTop");
  DrawLine(LineCoord.BackBottom, "iBackBottom");
  DrawLine(LineCoord.BackRight, "iBackRight");
  DrawLine(LineCoord.BackLeft, "iBackLeft");

  DrawLine(LineCoord.LeftTop, "iLeftTop");
  DrawLine(LineCoord.LeftBottom, "iLeftBottom");
  DrawLine(LineCoord.RightTop, "iRightTop");
  DrawLine(LineCoord.RightBottom, "iRightBottom");

  DrawLine(LineCoord.FrontMiddleCross, "iFrontMiddleCross");
  DrawLine(LineCoord.FrontMiddleLength,  "iFrontMiddleLenght");

  DrawLine(LineCoord.BackMiddleCross, "iBackMiddleCross");
  DrawLine(LineCoord.BackMiddleLenght, "iBackMiddleLenght");

  DrawLine(LineCoord.RightMiddleCross,  "iRightMiddleCross");
  DrawLine(LineCoord.LeftMiddleCross,  "iLeftMiddleCross");
}

// Funktion zum Zeichnen einer Linie mit den Koordinaten
function DrawLine(coord, Id) {
  let line = document.getElementById(Id);
  if (line) {
    line.setAttribute('x1', coord.x1);
    line.setAttribute('y1', coord.y1);
    line.setAttribute('x2', coord.x2);
    line.setAttribute('y2', coord.y2);
  }
}

// Funktion zum Erstellen und Anpassen einer Linie
function createLine(Line) {
  const tLine = document.getElementById(Line);
  
  // Überprüfen, ob die Linie sichtbar sein soll
  if (buttonStates[Line]) {
    tLine.style.stroke = "black";
    tLine.style.strokeDasharray = "none";
    tLine.parentNode.appendChild(tLine); // Linie nach vorne bringen
    changeMultipleLineWidths(Line, materialScaled); // materialScaled sollte definiert sein
  } else {
    tLine.style.stroke = "";
    tLine.style.strokeDasharray = "10, 1";
    tLine.style.strokeWidth = ""; // Zurücksetzen, damit CSS wieder greift
  }
 if (isActive) {
  if (!buttonStates[Line]) {
    tLine.style.stroke = "none";
  }
 }
 
}

//Ein/Ausblenden
function displayed(ButtonList, id, show) {
  // Hole das Element anhand der ID
  let element = document.getElementById(id);

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
