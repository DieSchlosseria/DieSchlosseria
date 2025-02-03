const viewButton = document.getElementById("iView");

let Thickness = 4; // Materialstärke
let width = 100;
let height = 100;
let length = 100;

// Szene, Kamera und Renderer erstellen
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xf4f4f4);

var material = new THREE.MeshStandardMaterial({
    color: 0x404040,
    roughness: 0.5,
    metalness: 0.5,
    envMapIntensity: 1.0,
    emissive: 0x1a1a1a,
    side: THREE.DoubleSide  // Beleuchtet sowohl Vorder- als auch Rückseite
});



var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 400);
camera.position.set(150, 150, 150);
camera.lookAt(0, 0, 0);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Licht hinzufügen
var ambientLight = new THREE.AmbientLight(0x404040, 3); // Erhöhte Intensität
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(10, 20, 10);
// directionalLight.castShadow = true;
directionalLight.intensity = 1.0; // Geringere Intensität des Lichts


scene.add(directionalLight);

// CubeMap-Textur für Reflexionen
var loader = new THREE.CubeTextureLoader();
var texture = loader.load([
    'https://threejs.org/examples/textures/skybox/px.jpg',
    'https://threejs.org/examples/textures/skybox/nx.jpg',
    'https://threejs.org/examples/textures/skybox/py.jpg',
    'https://threejs.org/examples/textures/skybox/ny.jpg',
    'https://threejs.org/examples/textures/skybox/pz.jpg',
    'https://threejs.org/examples/textures/skybox/nz.jpg'
]);
scene.environment = texture;
material.envMap = texture;
material.needsUpdate = true;

// Gruppe für Rohre
var cubeGroup = new THREE.Group();
scene.add(cubeGroup);
cubeGroup.scale.set(0.7, 0.7, 0.7);

// Funktion zur Erstellung eines quadratischen Rohrs mit Überlappung
function createSquarePipe(x1, y1, z1, x2, y2, z2) {
    var length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2) + Thickness;
    var geometry = new THREE.BoxGeometry(Thickness, Thickness, length);
    var pipe = new THREE.Mesh(geometry, material);

    var direction = new THREE.Vector3(x2 - x1, y2 - y1, z2 - z1).normalize();
    var quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), direction);

    pipe.position.set((x1 + x2) / 2, (y1 + y2) / 2, (z1 + z2) / 2);
    pipe.setRotationFromQuaternion(quaternion);
    cubeGroup.add(pipe);

    // **Kanten hervorheben mit LineBasicMaterial (durchgezogen)**
    var edges = new THREE.EdgesGeometry(geometry);
    var basicMaterial = new THREE.LineBasicMaterial({
        color: 0x000000,  // Kantenfarbe (schwarz)
        linewidth: 2      // Stärke der Linie
    });
    var edgeLines = new THREE.LineSegments(edges, basicMaterial);
    
    edgeLines.position.copy(pipe.position);
    edgeLines.setRotationFromQuaternion(quaternion);
    cubeGroup.add(edgeLines);  // Linien zum gleichen Gruppieren hinzufügen
}

// Koordinaten für den Würfelrahmen
var coordinates = [
    [0, 0, 0, width, 0, 0], [width, 0, 0, width, height, 0],
    [width, height, 0, 0, height, 0], [0, height, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, length], [width, 0, 0, width, 0, length],
    [width, height, 0, width, height, length], [0, height, 0, 0, height, length],
    [0, 0, length, width, 0, length], [width, 0, length, width, height, length],
    [width, height, length, 0, height, length], [0, height, length, 0, 0, length],
    [0, 0, 0, 0, height, 0], [width, 0, 0, width, height, 0],
    [0, 0, length, 0, height, length], [width, 0, length, width, height, length]
];

coordinates.forEach(coord => {
    createSquarePipe(coord[0] - width / 2, coord[1] - height / 2, coord[2] - length / 2,
                     coord[3] - width / 2, coord[4] - height / 2, coord[5] - length / 2);
});


// OrbitControls aktivieren
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.minDistance = 150;  // Kamera kann nicht näher als 150 Einheiten kommen
controls.maxDistance = 200;  // Kamera kann nicht weiter als 200 Einheiten weg sein
controls.enableDamping = true;  // Aktivieren der Dämpfung
controls.dampingFactor = 0.1;  // Dämpfungsfaktor
controls.target.set(0, 0, 0);  // Zielpunkt der Kamera (Mittelpunkt der Szene)
controls.maxPolarAngle = Math.PI / 2;  // Begrenzung der vertikalen Drehung
controls.update();  // Updates für die Steuerung



// Animationsschleife
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Fenstergrößenänderung anpassen
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
