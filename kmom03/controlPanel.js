function ControlPanel(e) {
    this.camera = e,
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
    this.speedFactor = parseFloat(document.getElementById("speed").value),
    this.isPlaying = !0
}
ControlPanel.prototype.init = function() {
    var e = this;
    document.getElementById("update").addEventListener("click", function() {
        e.updateCamera()
    });
    var t = document.getElementById("speed");
    t.addEventListener("change", function() {
        e.speedFactor = parseFloat(t.value)
    });
    var a = document.getElementById("startStop");
    a.addEventListener("click", function() {
        "Pause" == a.value ? (a.value = "Play",
        e.isPlaying = !1) : (a.value = "Pause",
        e.isPlaying = !0)
    })
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
      , l = a.elements;
    l[0] = parseFloat(this.elemUpX.value),
    l[1] = parseFloat(this.elemUpY.value),
    l[2] = parseFloat(this.elemUpZ.value),
    a.normalize(),
    this.camera.setUp(a),
    this.camera.updateView(),
    this.updateFromCamera(),
    this.camera.updatePerspective(parseFloat(this.elemFOV.value), parseFloat(this.elemNear.value), parseFloat(this.elemFar.value))
}
;
