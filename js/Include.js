function includeHTML() {
    var allElements = document.getElementsByTagName("*");
    for (var i = 0; i < allElements.length; i++) {
        var element = allElements[i];
        var file = element.getAttribute("include-html");
        if(file) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if(this.readyState == 4) {
                    if(this.status == 200) { element.innerHTML = this.responseText; }
                    if(this.status == 404) { element.innerHTML = "Page not found!"; }
                    // Remove attribute and call this function again.
                    element.removeAttribute("include-html");
                    includeHTML();
                }
            };
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
}