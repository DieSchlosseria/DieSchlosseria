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
  "FrontTop", "FrontBottom", "FrontLeft", "FrontRight", "FrontMiddleCross",
  "FrontMiddleLenght", "BackLeft", "BackTop", "BackRight", "BackBottom",
  "FrontBottom", "BackMiddleCross", "BackMiddleLenght", "LeftTop", 
  "RightBottom", "RightTop", "LeftBottom", "RightMiddleCross", "LeftMiddleCross"
];
//______________TEST_____________
let test = document.getElementById("iTest");
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

  DrawLine(LineCoord.FrontTop, "FrontTop");
  DrawLine(LineCoord.FrontBottom, "FrontBottom");
  DrawLine(LineCoord.FrontRight, "FrontRight");
  DrawLine(LineCoord.FrontLeft, "FrontLeft");

  DrawLine(LineCoord.BackTop, "BackTop");
  DrawLine(LineCoord.BackBottom, "BackBottom");
  DrawLine(LineCoord.BackRight, "BackRight");
  DrawLine(LineCoord.BackLeft, "BackLeft");

  DrawLine(LineCoord.LeftTop, "LeftTop");
  DrawLine(LineCoord.LeftBottom, "LeftBottom");
  DrawLine(LineCoord.RightTop, "RightTop");
  DrawLine(LineCoord.RightBottom, "RightBottom");

  DrawLine(LineCoord.FrontMiddleCross, "FrontMiddleCross");
  DrawLine(LineCoord.FrontMiddleLength,  "FrontMiddleLenght");

  DrawLine(LineCoord.BackMiddleCross, "BackMiddleCross");
  DrawLine(LineCoord.BackMiddleLenght, "BackMiddleLenght");

  DrawLine(LineCoord.RightMiddleCross,  "RightMiddleCross");
  DrawLine(LineCoord.LeftMiddleCross,  "LeftMiddleCross");
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
