window.onload = function() {
    "use strict";
    var e = document.getElementById("canvas")
      , t = WebGLUtils.getWebGLContext(e);
    if (t) {
        var n = document.getElementById("text")
          , a = n.getContext("2d");
        a.font = "25px Arial",
        a.fillStyle = "#FFF";
        var o = new Shader(t);
        o.init(["vertexShader", "fragmentShader"]),
        o.addAttribute("a_position"),
        o.addAttribute("a_uv");
        var r = new Shader(t);
        r.init(["vertexShader2", "fragmentShader2"]),
        r.addAttribute("a_position"),
        r.addAttribute("a_normal"),
        r.addAttribute("a_color");
        var i = new Shader(t);
        i.init(["vertexShaderRaytracing", "fragmentShaderRaytracing"]),
        i.addAttribute("a_position"),
        i.addAttribute("a_uv");
        var d = new Input(e);
        d.init(),
        e.requestPointerLock = e.requestPointerLock || e.mozRequestPointerLock,
        document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock,
        n.onclick = function() {
            e.requestPointerLock()
        }
        ,
        document.addEventListener("pointerlockchange", M, !1),
        document.addEventListener("mozpointerlockchange", M, !1);
        var l = new World(t);
        l.initScalarField(11, 11, 11, .4),
        l.addMetaball([0, 0, 0], 1, [1, 0, 0]),
        l.addMetaball([0, 0, 0], 2, [0, 0, 1]),
        l.addMetaball([0, 0, 0], 1, [0, 1, 0]),
        l.addMetaball([0, 0, 0], 2, [1, 1, 0]),
        l.initRaytracing(),
        i.use(),
        l.updateMetaballUniforms(i);
        var c = new Camera(e)
          , u = new ControlPanel(c,l);
        u.updateFromCamera(),
        u.setIsoSurfaceShader(r),
        u.init(),
        u.updateScalarField();
        var s = new Model(t);
        s.constructWireCubeModel(),
        s.loadModelToGPU(o);
        var m = new Model(t);
        m.constructDisplayModel(),
        m.loadModelToGPU(i),
        t.enable(t.DEPTH_TEST),
        t.cullFace(t.BACK);
        var g = null
          , v = 0
          , h = 0
          , f = 0;
        !function e() {
            var n = Date.now();
            var M = (n - (g || n)) / 1e3;
            g = n;
            window.requestAnimationFrame(e);
            a.clearRect(0, 0, a.canvas.width, a.canvas.height);
            !function(e) {
                c.update(e, d, u),
                i.use(),
                (u.isPlaying || u.changedRenderingMode) && (u.changedRenderingMode = !1,
                e *= u.speedFactor,
                l.updateMetaballs(e),
                "Raymarching" == l.renderingMode ? (l.updateMetaballUniforms(i),
                l.updateUniformSettings(i)) : "MarchingCubes" == l.renderingMode && l.updateScalarField()),
                l.updateRaytracingCamera(i, c)
            }(M);
            !function() {
                if (t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT),
                "Raymarching" == l.renderingMode)
                    i.use(),
                    l.renderDisplay(m, i);
                else if ("MarchingCubes" == l.renderingMode) {
                    r.use(),
                    l.renderIsosurface(r, c),
                    o.use(),
                    l.drawScaleFieldOutline(o, c, s);
                    for (var e = 0; e < l.entites.length; e++)
                        l.renderEntity(e, o, c)
                }
            }();
            !function(e) {
                f++,
                (h += e) > 1 && (v = f / h,
                f = h = 0);
                a.fillText("FPS: " + Math.round(v), 10, 30),
                a.fillText("#metaballs: " + l.metaballs.length + "/" + l.MAX_NUM_METABALLS, 10, 60)
            }(M)
        }(),
        console.log("Everything is ready.")
    } else
        console.log("Failed to get rendering context for WebGL");
    function M() {
        document.pointerLockElement === e || document.mozPointerLockElement === e ? (console.log("The pointer lock status is now locked"),
        document.addEventListener("mousemove", b, !1)) : (console.log("The pointer lock status is now unlocked"),
        document.removeEventListener("mousemove", b, !1))
    }
    function b(e) {
        d.mxd = e.movementX,
        d.myd = e.movementY
    }
}();
