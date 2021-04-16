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
    
    var preSelectedNavLink = null;
    var navLinks = document.getElementsByClassName("nav-link");
    for(var i = 0; i < navLinks.length; i++) {
        var link = navLinks[i];
        if(link.classList.contains("active")) {
            preSelectedNavLink = link;
        }

        link.onclick = function() {
            var str = this.className;
            console.log("TODO: Scroll to this page: " + str);
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
                    var l = section.className.split('-');
                    var index = l[l.length-1];
                    var navLink = document.getElementsByClassName("li-link-" + index)[0];
                    preSelectedNavLink.classList.remove("active");
                    navLink.firstChild.classList.add("active");
                    preSelectedNavLink = navLink.firstChild;
                } 
            }
        }, 100);
    }, true);
};