"use strict";

window.onload = function() {
    var repoListUL = document.getElementById("repo-list");
    
    let request = new XMLHttpRequest();
    request.open("GET", "https://api.github.com/users/jonathan2222/repos");
    request.send();
    request.onload = () => {
        if(request.status === 200) {
            var res = JSON.parse(request.response);
            console.log(res);
            for(var i = 0; i < res.length; i++) {
                if(res[i].name !== "jonathan2222.github.io")
                {
                    var li = document.createElement('li');
                    li.style.cursor = "pointer";
                    li.onmouseover = function() {
                        this.className = "hoverLI";
                    };
                    li.onmouseout = function() {
                        this.className = "";
                    };
                    li.appendChild(document.createTextNode(res[i].name));
                    li.addEventListener("click", function (){
                        window.open("https://github.com/jonathan2222/" +  this.name);
                    }.bind(res[i]));
                    repoListUL.appendChild(li);
                }
            }

        } else {
            console.log('Error ${request.status}');
        }
    };
}();
