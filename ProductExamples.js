var ids = ["iDefined1", "iDefined2", "iDefined3"];  //füge jeweils die ID des neuen Produktbeispiel hinzu

ids.forEach(function(id) {
    var element = document.getElementById(id);
    if (element) {
        element.addEventListener("click", function() {
            localStorage.setItem(id, "true");
            window.location.href = 'index.html';
        });
    }
});

