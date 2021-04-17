function isElementInViewport (el) {
    var rect = el.getBoundingClientRect();

    return (
        /*rect.top >= 0 &&*/
        rect.left >= 0 &&
        /*rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}

function focus(el) {
    el.scrollIntoView();
    window.scrollTo(0, 1);
    console.log("Focusing on " + el.className);
}

window.onload = function() {
    var elem = document.getElementsByClassName("home")[0];
    focus(elem);
    
    var preSelectedNavLink = null;
    var navLinks = document.getElementsByClassName("nav-link");
    for(var i = 0; i < navLinks.length; i++) {
        var link = navLinks[i];
        if(link.classList.contains("active")) {
            preSelectedNavLink = link;
        }
        link.onclick = function() {
            var l = this.parentElement.className.split('-');
            var index = l[l.length-1];
            var sections = document.getElementsByTagName("section");
            for(let section of sections) {
                l = section.className.split('-');
                var secIndex = l[l.length-1];
                if(index == secIndex)
                    focus(section);
            }
        };
    }

    addEventListener("scroll", function() {
        var sections = document.getElementsByTagName("section");
            for(let section of sections) {
                if(isElementInViewport(section)) {
                    var l = section.className.split('-');
                    var index = l[l.length-1];
                    var navLink = document.getElementsByClassName("li-link-" + index)[0];
                    
                    if(navLink.firstChild != preSelectedNavLink)
                    {
                        preSelectedNavLink.classList.remove("active");
                        navLink.firstChild.classList.add("active");
                        preSelectedNavLink = navLink.firstChild;
                        // Do not focus to the top when when sliding
                        //focus(section);
                        //console.log(section.className);
                    }
                } 
            }
    }, true);
};