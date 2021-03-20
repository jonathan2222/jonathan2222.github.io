window.onload = function() {
    "use strict";
    var e = document.getElementById("canvas")
      , t = WebGLUtils.getWebGLContext(e);
    if (t) {
        var n = document.getElementById("text")
          , o = n.getContext("2d");
        o.font = "25px Arial";
        var a = new Shader(t);
        a.init(["vertexShader", "fragmentShader"]),
        a.addAttribute("a_position"),
        a.addAttribute("a_uv");
        var r = new Model(t);
        r.constructCubeModel(),
        r.loadModelToGPU(a);
        var d = new Model(t);
        d.constructPlaneModel(),
        d.loadModelToGPU(a);
        var i = new Input(e);
        i.init(),
        e.requestPointerLock = e.requestPointerLock || e.mozRequestPointerLock,
        document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock,
        n.onclick = function() {
            e.requestPointerLock()
        }
        ,
        document.addEventListener("pointerlockchange", L, !1),
        document.addEventListener("mozpointerlockchange", L, !1);
        var u = new Camera(e)
          , c = new ControlPanel(u);
        c.updateFromCamera(),
        c.init();
        var l = new Texture(t,"img/red.jpg")
          , s = new Texture(t,"img/black.jpg")
          , m = new Texture(t,"img/mask.jpg")
          , x = new Texture(t,"img/tile.png")
          , T = new World(t)
          , v = T.addEntity("Cube1", r, [-1.5, 0, 0]);
        v.setScale(.5),
        v.addTexture(l, 0, "u_firstTex"),
        v.addTexture(s, 1, "u_secondTex"),
        v.addTexture(m, 2, "u_maskTex");
        var g = T.addEntity("Cube2", r, [0, 0, 0]);
        g.setScale(1),
        g.addTexture(l, 0, "u_firstTex"),
        g.addTexture(s, 1, "u_secondTex"),
        g.addTexture(m, 2, "u_maskTex");
        var E = T.addEntity("Cube3", r, [1.5, 0, 0]);
        E.setScale(2),
        E.addTexture(l, 0, "u_firstTex"),
        E.addTexture(s, 1, "u_secondTex"),
        E.addTexture(m, 2, "u_maskTex");
        var k = T.addEntity("Floor", d, [0, -2, 0]);
        k.setScale(10),
        k.updateMatrix(),
        k.addTexture(x, 0, "u_firstTex"),
        k.addTexture(s, 1, "u_secondTex"),
        k.addTexture(l, 2, "u_maskTex"),
        t.enable(t.DEPTH_TEST),
        t.cullFace(t.BACK);
        var f = 0
          , p = null
          , w = 0
          , _ = 0
          , y = 0;
        !function e() {
            var n = Date.now();
            var r = (n - (p || n)) / 1e3;
            p = n;
            window.requestAnimationFrame(e);
            o.clearRect(0, 0, o.canvas.width, o.canvas.height);
            !function(e) {
                if (u.update(e, i, c),
                c.isPlaying) {
                    e *= c.speedFactor,
                    f += e,
                    a.uniform1f("u_weight", (Math.sin(f) + 1) / 2);
                    var t = T.getEntityByName("Cube1");
                    t.rotateLocal(50 * e, [0, 1, 0]),
                    t.updateMatrix();
                    var n = T.getEntityByName("Cube2");
                    n.setTranslation([0, Math.sin(5 * f), 0]),
                    n.updateMatrix();
                    var o = T.getEntityByIndex(2);
                    o.rotateLocal(50 * e, [1, 1, 0]),
                    o.setScale((Math.sin(f) + 1) / 2 + .5),
                    o.updateMatrix();
                    var r = T.getEntityByIndex(1);
                    r.rotateWorld(10 * e, [0, 0, 1]),
                    r.updateMatrix()
                }
            }(r);
            !function() {
                t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT),
                a.use();
                for (var e = 0; e < T.entites.length; e++)
                    T.renderEntity(e, a, u)
            }();
            !function(e) {
                y++,
                (_ += e) > 1 && (w = y / _,
                y = _ = 0);
                o.fillText("FPS: " + Math.round(w), 10, 30)
            }(r)
        }(),
        console.log("Everything is ready.")
    } else
        console.log("Failed to get rendering context for WebGL");
    function L() {
        document.pointerLockElement === e || document.mozPointerLockElement === e ? (console.log("The pointer lock status is now locked"),
        document.addEventListener("mousemove", h, !1)) : (console.log("The pointer lock status is now unlocked"),
        document.removeEventListener("mousemove", h, !1))
    }
    function h(e) {
        i.mxd = e.movementX,
        i.myd = e.movementY
    }
}();
