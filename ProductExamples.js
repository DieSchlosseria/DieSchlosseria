var defined = [];

// Hole das Element mit der ID 'iDefined1'
defined[1] = document.getElementById("iDefined1");

// Füge den Event-Listener für das 'click'-Ereignis hinzu
defined[1].addEventListener("click", function() {
    localStorage.setItem("iDefined1", "true"); // Speichert den Wert 'true' im localStorage
    console.log("Example1");
    window.location.href = 'index.html';
});


