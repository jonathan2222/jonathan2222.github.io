function ControlPanel(e, t) {
    this.camera = e,
    this.world = t,
    this.elemFOV = document.getElementById("fov"),
    this.elemNear = document.getElementById("near"),
    this.elemFar = document.getElementById("far"),
    this.elemCameraX = document.getElementById("cameraX"),
    this.elemCameraY = document.getElementById("cameraY"),
    this.elemCameraZ = document.getElementById("cameraZ"),
    this.elemAtX = document.getElementById("dirX"),
    this.elemAtY = document.getElementById("dirY"),
    this.elemAtZ = document.getElementById("dirZ"),
    this.elemUpX = document.getElementById("upX"),
    this.elemUpY = document.getElementById("upY"),
    this.elemUpZ = document.getElementById("upZ"),
    this.elemSFW = document.getElementById("scalarFieldWidth"),
    this.elemSFH = document.getElementById("scalarFieldHeight"),
    this.elemSFD = document.getElementById("scalarFieldDepth"),
    this.speedFactor = parseFloat(document.getElementById("speed").value),
    this.isPlaying = !0,
    this.res = 1,
    this.sfwValue = 11,
    this.sfhValue = 11,
    this.sfdValue = 11,
    this.changedRenderingMode = !1
}
ControlPanel.prototype.initMode = function() {
    var e = this
      , t = document.getElementById("hidden-renderingMode")
      , a = document.getElementById("review-renderingMode");
    a.innerHTML = t.children[0].innerHTML,
    document.getElementById("selectRenderingMode").addEventListener("change", function() {
        a.innerHTML = t.children[this.selectedIndex].innerHTML,
        e.world.renderingMode = this.value,
        "MarchingCubes" == this.value && e.initMarchingCubes(),
        "Raymarching" == this.value && e.initRaytracing(),
        e.changedRenderingMode = !0
    })
}
,
ControlPanel.prototype.init = function() {
    this.initMode();
    var e = this;
    document.getElementById("update").addEventListener("click", function() {
        e.updateCamera(),
        e.updateScalarField()
    });
    var t = document.getElementById("speed");
    t.addEventListener("change", function() {
        e.speedFactor = parseFloat(t.value)
    });
    var a = document.getElementById("threshold");
    a.addEventListener("change", function() {
        e.world.threshold = parseFloat(a.value)
    });
    var n = document.getElementById("startStop");
    n.addEventListener("click", function() {
        "Pause" == n.value ? (n.value = "Play",
        e.isPlaying = !1) : (n.value = "Pause",
        e.isPlaying = !0)
    }),
    document.getElementById("addMetaball").addEventListener("click", function() {
        e.world.addMetaball([0, 0, 0], 1 + Math.random(), [Math.random(), Math.random(), Math.random()])
    }),
    document.getElementById("removeMetaball").addEventListener("click", function() {
        e.world.removeMetaball()
    }),
    this.initRaytracing(),
    this.initMarchingCubes()
}
,
ControlPanel.prototype.initMarchingCubes = function() {
    var e = this
      , t = document.getElementById("flatShading");
    t.addEventListener("click", function() {
        "Flat shading" == t.value ? (t.value = "Smooth shading",
        e.world.isFlatShadingOn = !0) : (t.value = "Flat shading",
        e.world.isFlatShadingOn = !1)
    });
    var a = document.getElementById("resolution");
    a.addEventListener("change", function() {
        e.res = 1 - parseFloat(a.value),
        e.world.isoSurface.delete(),
        e.world.initScalarField(e.sfwValue, e.sfhValue, e.sfdValue, e.res, e.isoShader)
    })
}
,
ControlPanel.prototype.initRaytracing = function() {
    var e = this
      , t = document.getElementById("displacement");
    t.addEventListener("click", function() {
        "On" == t.value ? (t.value = "Off",
        e.world.isDisplacmentOn = !0) : (t.value = "On",
        e.world.isDisplacmentOn = !1)
    });
    var a = document.getElementById("showBoundingSpheres");
    a.addEventListener("click", function() {
        "On" == a.value ? (a.value = "Off",
        e.world.showBoundingSpheres = !0) : (a.value = "On",
        e.world.showBoundingSpheres = !1)
    })
}
,
ControlPanel.prototype.setIsoSurfaceShader = function(e) {
    this.isoShader = e
}
,
ControlPanel.prototype.updateScalarField = function() {
    this.sfwValue = parseInt(this.elemSFW.value),
    this.sfhValue = parseInt(this.elemSFH.value),
    this.sfdValue = parseInt(this.elemSFD.value),
    this.world.initScalarField(this.sfwValue, this.sfhValue, this.sfdValue, this.res, this.isoShader)
}
,
ControlPanel.prototype.updateFromCamera = function() {
    this.elemCameraX.value = this.camera.pos.elements[0],
    this.elemCameraY.value = this.camera.pos.elements[1],
    this.elemCameraZ.value = this.camera.pos.elements[2],
    this.elemAtX.value = this.camera.getForward().elements[0],
    this.elemAtY.value = this.camera.getForward().elements[1],
    this.elemAtZ.value = this.camera.getForward().elements[2],
    this.elemUpX.value = this.camera.getUp().elements[0],
    this.elemUpY.value = this.camera.getUp().elements[1],
    this.elemUpZ.value = this.camera.getUp().elements[2]
}
,
ControlPanel.prototype.updateCamera = function() {
    this.camera.pos.elements[0] = parseFloat(this.elemCameraX.value),
    this.camera.pos.elements[1] = parseFloat(this.elemCameraY.value),
    this.camera.pos.elements[2] = parseFloat(this.elemCameraZ.value);
    var e = this.camera.getForward()
      , t = e.elements;
    t[0] = parseFloat(this.elemAtX.value),
    t[1] = parseFloat(this.elemAtY.value),
    t[2] = parseFloat(this.elemAtZ.value),
    e.normalize(),
    this.camera.setForward(e);
    var a = this.camera.getUp()
      , n = a.elements;
    n[0] = parseFloat(this.elemUpX.value),
    n[1] = parseFloat(this.elemUpY.value),
    n[2] = parseFloat(this.elemUpZ.value),
    a.normalize(),
    this.camera.setUp(a),
    this.camera.updateView(),
    this.updateFromCamera(),
    this.camera.updatePerspective(parseFloat(this.elemFOV.value), parseFloat(this.elemNear.value), parseFloat(this.elemFar.value))
}
;
