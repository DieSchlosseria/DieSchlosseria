let width = localStorage.getItem("iWidth") || 100;
let length = localStorage.getItem("iDeepth") || 100;
let height = localStorage.getItem("iHight") || 100;
let buttonStates = JSON.parse(localStorage.getItem("buttonStates")) || [0, 0, 0, 0, 0, 0]; // Standardmäßig alle aus
let middleH = localStorage.getItem("iMiddleH") || 50;
let middleV = localStorage.getItem("iMiddleV") || 50;





//function addLine(x1, y1, z1, x2, y2, z2) {
//    coordinates([x1, y1, z1, x2, y2, z2]);
//}

function generateCoordinates() {
   

    if (buttonStates["FrontTop"]) { 
        addLine(0, 0, 0, width, 0, 0);
    }
}

window.onload = function () {
    console.log("width:", width);
    console.log("length:", length);
    console.log("height:", height);
    console.log("buttonStates:", buttonStates);

    generateCoordinates(); // Erstelle die Linien anhand der Button-States
};
