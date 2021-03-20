function addRandom(e) {
    var t = [2 * Math.random() - 1, 2 * Math.random() - 1]
      , n = .5 * Math.random() + .5
      , a = Math.random() * Math.PI
      , o = [Math.random(), Math.random(), Math.random(), 1]
      , r = .9 * Math.random() + .1;
    e.add(t, n, a, o, r)
}
function constructTriangleModel() {
    return {
        n: 3,
        data: new Float32Array([0, .5, -.5, -.5, .5, -.5])
    }
}
function setDataToBuffer(e, t) {
    var n = {
        n: t.n,
        mode: e.TRIANGLES
    };
    return e.bufferData(e.ARRAY_BUFFER, t.data, e.STATIC_DRAW),
    n
}
window.onload = function() {
    "use strict";
    var e = document.getElementById("canvas1")
      , t = WebGLUtils.getWebGLContext(e);
    if (t) {
        var n = WebGLUtils.createProgramFromScripts(t, ["vertexShader", "fragmentShader"]);
        t.useProgram(n);
        var a = t.getAttribLocation(n, "a_Position");
        if (a < 0)
            console.log("Failed to get the storage location of a_Position");
        else {
            var o = t.getUniformLocation(n, "u_FragColor")
              , r = t.getUniformLocation(n, "u_ModelMat4")
              , d = t.createBuffer();
            t.bindBuffer(t.ARRAY_BUFFER, d),
            t.enableVertexAttribArray(a),
            t.vertexAttribPointer(a, 2, t.FLOAT, !1, 0, 0);
            var i = constructTriangleModel()
              , c = setDataToBuffer(t, i)
              , l = {
                objects: [],
                add: function(e, t, n, a, o) {
                    this.objects.push({
                        pos: e,
                        size: t,
                        angle: n,
                        color: a,
                        angVel: o
                    })
                }
            }
              , u = 1
              , s = null
              , m = null
              , f = 0
              , g = 0;
            E(),
            document.getElementById("play").addEventListener("click", function() {
                m || E()
            }),
            document.getElementById("pause").addEventListener("click", function() {
                m && (window.cancelAnimationFrame(m),
                m = null,
                s = null)
            }),
            document.getElementById("add").addEventListener("click", function() {
                addRandom(l)
            });
            var v = document.getElementById("speed");
            v.addEventListener("change", function() {
                u = parseFloat(v.value)
            });
            var h = document.getElementById("addNum");
            document.getElementById("addNumButton").addEventListener("click", function() {
                for (var e = 0; e < h.value; e++)
                    addRandom(l)
            }),
            console.log("Everything is ready.")
        }
    } else
        console.log("Failed to get rendering context for WebGL");
    function E() {
        var e = Date.now()
          , n = (e - (s || e)) / 1e3;
        s = e,
        m = window.requestAnimationFrame(E),
        function(e) {
            for (var t = 0; t < l.objects.length; t++) {
                var n = l.objects[t];
                n.angle += e * n.angVel * u
            }
        }(n),
        function() {
            t.clear(t.COLOR_BUFFER_BIT);
            for (var e = 0; e < l.objects.length; e++) {
                var n = l.objects[e];
                t.uniform4fv(o, n.color);
                var a = Math.sin(n.angle)
                  , d = Math.cos(n.angle)
                  , i = n.size
                  , u = n.pos[0]
                  , s = n.pos[1]
                  , m = new Float32Array([i * d, i * a, 0, 0, -i * a, i * d, 0, 0, 0, 0, i, 0, u, s, 0, 1]);
                t.uniformMatrix4fv(r, !1, m),
                t.drawArrays(c.mode, 0, c.n)
            }
        }(),
        function(e) {
            if (g++,
            (f += e) >= 1) {
                var t = g / f;
                g = f = 0,
                document.getElementById("fps").innerHTML = Math.round(t)
            }
        }(n)
    }
}();
