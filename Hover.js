
if (buttonStates["FrontTop"]) {
    frontTopLine.style.stroke = "black";
    frontTopLine.style.strokeWidth = "4"; // Dünnere Linie
    console.log("Positive Flanke erkannt");
  } else {
    frontTopLine.style.stroke = "lightgray";
    frontTopLine.style.width = "1";
  }
