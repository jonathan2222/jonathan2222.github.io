World.prototype.initRaytracing = function() {
    this.MAX_NUM_METABALLS = 30,
    this.isDisplacmentOn = !1
}
,
World.prototype.renderDisplay = function(e, t) {
    e.bind(t),
    this.gl.drawElements(e.mode, e.n, e.indicesType, 0)
}
,
World.prototype.updateMetaballUniforms = function(e) {
    for (var t = 0; t < this.metaballs.length && t < this.MAX_NUM_METABALLS; t++) {
        var o = this.metaballs[t]
          , s = "metaballs[" + t + "]"
          , r = o.pos.elements;
        e.uniform3fv(s + ".position", r),
        e.uniform3fv(s + ".color", o.color),
        e.uniform1f(s + ".radius", o.radius)
    }
    e.uniform1f("numMetaballs", this.metaballs.length < this.MAX_NUM_METABALLS ? this.metaballs.length : this.MAX_NUM_METABALLS)
}
,
World.prototype.updateRaytracingCamera = function(e, t) {
    var o = new Matrix4;
    o.setInverseOf(t.vp.matrix);
    var s = new Vector4([-1, -1, 0, 1])
      , r = new Vector4([1, -1, 0, 1])
      , n = new Vector4([-1, 1, 0, 1])
      , i = new Vector4([1, 1, 0, 1])
      , l = o.multiplyVector4(s)
      , a = l.elements;
    l.sMulE(1 / a[3]);
    var m = l.toVec3();
    m.subE(t.pos);
    var u = o.multiplyVector4(r);
    a = u.elements,
    u.sMulE(1 / a[3]);
    var f = u.toVec3();
    f.subE(t.pos);
    var p = o.multiplyVector4(n);
    a = p.elements,
    p.sMulE(1 / a[3]);
    var c = p.toVec3();
    c.subE(t.pos);
    var h = o.multiplyVector4(i);
    a = h.elements,
    h.sMulE(1 / a[3]);
    var d = h.toVec3();
    d.subE(t.pos),
    e.uniform3fv("cbl", m.elements),
    e.uniform3fv("cbr", f.elements),
    e.uniform3fv("ctl", c.elements),
    e.uniform3fv("ctr", d.elements),
    e.uniform3fv("camPos", t.pos.elements)
}
,
World.prototype.updateUniformSettings = function(e) {
    e.uniform1f("shouldDisplace", this.isDisplacmentOn ? 1 : 0),
    e.uniform1f("showBoundingSpheres", this.showBoundingSpheres ? 1 : 0),
    e.uniform1f("threshold", this.threshold)
}
;
