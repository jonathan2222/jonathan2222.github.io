function isElementInViewport (el) {
    //console.log(el);
    var rect = el.getBoundingClientRect();

    return (
        /*rect.top >= 0 &&*/
        rect.left >= 0 &&
        /*rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}

window.onload = function() {
    var elem = document.getElementsByClassName("home")[0];
    elem.scrollIntoView();
    
    var navLinks = document.getElementsByClassName("nav-links");
    for(var i = 0; i < navLinks.length; i++)
    {
        var link = navLinks[i];
        link.onclick = function() {
            var str = this.className;
            console.log("Test");
        };
    }

    var timer = null;
    addEventListener("scroll", function() {
        clearTimeout(timer);
        // Reset timer
        timer = setTimeout(function(){
            var sections = document.getElementsByTagName("section");
            for(let section of sections) {
                if(isElementInViewport(section)) {
                    console.log("Changed! to " + section.className);
                } 
            }
        }, 100);
    }, true);
};