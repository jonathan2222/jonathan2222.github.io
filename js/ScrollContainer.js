var g_ActiveSection = null;
var currentMainHeight = 0;

function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();

    return (
        /*rect.top >= 0 &&*/
        rect.left >= 0 &&
        /*rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}

function isElementPartInViewport(el) {
    var rect = el.getBoundingClientRect();
    var w = (window.innerWidth || document.documentElement.clientWidth);
    return (
        rect.left >= 0 || rect.right <= w
    );
}

/**
 * Returns a factor from 0 to 1 that describes how much of the element is in the viewport.
 * @param {*} el The element to check.
 * @returns A factor from 0 to 1. A factor of 0 means that the element is not in viewport, and a value of 1 means the whole element is in the viewport.
 */
function getElementInViewportFactor(el) {
    var rect = el.getBoundingClientRect();
    var w = (window.innerWidth || document.documentElement.clientWidth);
    var left = Math.max(0, rect.left);
    var right = Math.min(rect.right, w);
    return Math.max(right-left, 0) / w;
}

function focus(el) {
    el.scrollIntoView();
    window.scrollTo(0, 0);
    setSection(el, true);
    console.log("Focusing on " + el.className);
}

function setSection(section, applyToMain) {
    if(g_ActiveSection != section) {
        console.log("Setting section to " + getName(section));
        g_ActiveSection = section;
        applyHeightToHeader();
    }

    if(applyToMain)
        applyHeightToScrollContainer();
}

function getLiLinkFromSection(section) {
    var l = section.className.split('-');
    var index = l[l.length-1];
    return document.getElementsByClassName("li-link-" + index)[0];
}

function getName(elem) {
    var l = elem.classList;
    return l[l.length-1];
}

// Used for .sticky
function applyHeightToHeader() {
    var header = document.getElementsByTagName("header")[0];
    var height = parseInt(g_ActiveSection.offsetHeight + g_ActiveSection.getBoundingClientRect().top);
    header.style.height = height + "px";
}

function applyHeightToScrollContainer() {
    var height = parseInt(g_ActiveSection.offsetHeight);
    
    // Clamp to screen height if smaller.
    var heightClampedToWindowHeight = (window.innerHeight || document.documentElement.clientHeight);
    heightClampedToWindowHeight = parseInt(heightClampedToWindowHeight-g_ActiveSection.getBoundingClientRect().top);
    height = Math.max(height, heightClampedToWindowHeight);
    
    if(currentMainHeight != height) {
        var con = document.getElementsByClassName("scroll-container")[0];
        var main = document.getElementsByTagName("main")[0];
        con.style.height = height + "px";
        main.style.height = height + "px";
        currentMainHeight = height;
    }
}

window.onload = function() {
    var homeElem = document.getElementsByClassName("home")[0];
    focus(homeElem);
    var previousSection = { obj: homeElem, f: 1.0 };
    
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
            var factor = getElementInViewportFactor(section);
            if(section != previousSection.obj && factor > 0.05)
            {
                var navLink = getLiLinkFromSection(section);
                if(navLink.firstChild != preSelectedNavLink)
                {
                    preSelectedNavLink.classList.remove("active");
                    navLink.firstChild.classList.add("active");
                    setSection(section, false);
                    preSelectedNavLink = navLink.firstChild;
                }
            }

            // Used for setting it back to where it came from if the movement was not enough to snap it to the new section.
            if(isElementInViewport(section))
            {
                var navLink = getLiLinkFromSection(section);
                if(navLink.firstChild != preSelectedNavLink)
                {
                    preSelectedNavLink.classList.remove("active");
                    navLink.firstChild.classList.add("active");
                    preSelectedNavLink = navLink.firstChild;
                }

                if(section != previousSection.obj) {
                    focus(section);
                }
                previousSection.obj = section;
            }
        }
    }, true);
};