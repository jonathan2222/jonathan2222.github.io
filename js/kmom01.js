window.onload = function() {
    "use strict";
    var o = document.getElementById("canvas1")
      , t = getWebGLContext(o);
    if (t)
        if (initShaders(t, "attribute vec4 a_Position;\nattribute float a_PointSize;\nvoid main() {\n   gl_Position = a_Position;\n   gl_PointSize = a_PointSize;\n}\n", "precision mediump float;\nuniform vec4 u_FragColor;\nvoid main() {\n   gl_FragColor = u_FragColor;\n}\n")) {
            var n = t.getAttribLocation(t.program, "a_Position");
            if (n < 0)
                console.log("Failed to get the storage location of a_Position");
            else {
                var a = t.getAttribLocation(t.program, "a_PointSize");
                if (a < 0)
                    console.log("Failed to get the storage location of a_PointSize");
                else {
                    var e = t.getUniformLocation(t.program, "u_FragColor");
                    o.onmousedown = function(s) {
                        !function(o, t, n, a, e, s) {
                            var c = o.clientX
                              , f = o.clientY
                              , m = o.target.getBoundingClientRect();
                            c = (c - m.left - n.width / 2) / (n.width / 2),
                            f = (n.height / 2 - (f - m.top)) / (n.height / 2);
                            var u = g(c, f);
                            if (-1 != u) {
                                var v = r[u]
                                  , _ = l[u];
                                d(2 * Math.random() - 1, 2 * Math.random() - 1, v, _),
                                d(2 * Math.random() - 1, 2 * Math.random() - 1, v, _),
                                d(2 * Math.random() - 1, 2 * Math.random() - 1, v, _),
                                i[u] = [2 * Math.random() - 1, 2 * Math.random() - 1]
                            } else
                                d(c, f);
                            t.clear(t.COLOR_BUFFER_BIT);
                            for (var F = i.length, M = 0; M < F; M++)
                                h(i[M], l[M], r[M], a, e, s)
                        }(s, t, o, n, a, e)
                    }
                    ,
                    t.clear(t.COLOR_BUFFER_BIT);
                    var i = []
                      , r = []
                      , l = [];
                    console.log("Everything is ready.")
                }
            }
        } else
            console.log("Failed to initialize shaders!");
    else
        console.log("Failed to get rendering context for WebGL");
    function g(t, n) {
        for (var a = i.length, e = 0; e < a; e++) {
            var l = r[e] / o.width
              , g = r[e] / o.height;
            if (t > i[e][0] - l && t < i[e][0] + l && n > i[e][1] - g && n < i[e][1] + g)
                return e
        }
        return -1
    }
    function d(o, t, n=15 * Math.random() + 5, a=[Math.random(), Math.random(), Math.random(), 1]) {
        i.push([o, t]),
        r.push(n),
        l.push(a)
    }
    function h(o, n, a, e, i, r) {
        t.vertexAttrib3f(e, o[0], o[1], 0),
        t.vertexAttrib1f(i, a),
        t.uniform4f(r, n[0], n[1], n[2], n[3]),
        t.drawArrays(t.POINTS, 0, 1)
    }
}();
