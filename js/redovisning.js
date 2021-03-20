window.onload = function() {
    "use strict";
    var e = document.getElementsByClassName("hidden-text")
      , t = document.getElementById("review-text");
    t.innerHTML = e[0].children[3].innerHTML;
    var n = document.getElementsByClassName("review-link");
    n[3].classList.add("selected");
    for (var s = 0; s < n.length; s++)
        n[s].addEventListener("click", function() {
            var s = this.dataset.index;
            t.innerHTML = e[0].children[s].innerHTML;
            for (var i = 0; i < n.length; i++)
                n[i].classList.remove("selected");
            n[this.dataset.index].classList.add("selected")
        });
    console.log("Everything is ready.")
}();
