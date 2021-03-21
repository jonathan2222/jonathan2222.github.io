window.onload = function() {
    "use strict";
    var hiddenTextList = document.getElementsByClassName("hidden-text")
      , reviewText = document.getElementById("review-text");
    reviewText.innerHTML = hiddenTextList[0].children[3].innerHTML;
    var links = document.getElementsByClassName("review-link");
    links[3].classList.add("selected");
    for (var s = 0; s < links.length; s++)
        links[s].addEventListener("click", function() {
            var s = this.dataset.index;
            reviewText.innerHTML = hiddenTextList[0].children[s].innerHTML;
            for (var i = 0; i < links.length; i++)
            links[i].classList.remove("selected");
            links[this.dataset.index].classList.add("selected")
        });
    console.log("Everything is ready.")
}();
