function VP() {
    this.view = new Matrix4,
    this.projection = new Matrix4,
    this.matrix = new Matrix4
}
function Camera(t) {
    this.canvas = t,
    this.startSpeed = 1.5,
    this.boost = 2.5,
    this.mouseSpeed = 2,
    this.fov = 45,
    this.zoomFov = 15,
    this.near = .1,
    this.far = 100,
    this.vp = new VP,
    this.vp.initPerspective(this.fov, t.width / t.height, this.near, this.far),
    this.pos = new Vector3([0, 0, 5]);
    var e = new Vector3([0, 0, -1])
      , i = new Vector3([0, 1, 0]);
    this.vp.initView(this.pos, this.pos.add(e), i),
    this.vp.updateMatrix(),
    this.ctrlWasDown = !1
}
VP.prototype.initPerspective = function(t, e, i, s) {
    this.projection.setPerspective(t, e, i, s)
}
,
VP.prototype.initView = function(t, e, i) {
    var s = t.elements
      , o = e.elements
      , r = i.elements;
    this.view.setLookAt(s[0], s[1], s[2], o[0], o[1], o[2], r[0], r[1], r[2])
}
,
VP.prototype.updateMatrix = function() {
    this.matrix.setIdentity(),
    this.matrix.multiply(this.projection),
    this.matrix.multiply(this.view)
}
,
Camera.prototype.getRight = function() {
    var t = this.vp.view.elements;
    return new Vector3([t[0], t[4], t[8]])
}
,
Camera.prototype.getUp = function() {
    var t = this.vp.view.elements;
    return new Vector3([t[1], t[5], t[9]])
}
,
Camera.prototype.getForward = function() {
    var t = this.vp.view.elements;
    return new Vector3([-t[2], -t[6], -t[10]])
}
,
Camera.prototype.setUp = function(t) {
    var e = this.vp.view.elements
      , i = t.elements;
    e[1] = i[0],
    e[5] = i[1],
    e[9] = i[2]
}
,
Camera.prototype.setForward = function(t) {
    var e = this.vp.view.elements
      , i = t.elements;
    e[2] = -i[0],
    e[6] = -i[1],
    e[10] = -i[2]
}
,
Camera.prototype.updateView = function() {
    this.vp.initView(this.pos, this.pos.add(this.getForward()), new Vector3(this.getUp().elements)),
    this.vp.updateMatrix()
}
,
Camera.prototype.updatePerspective = function(t, e, i, s) {
    this.fov = s ? this.fov : t,
    this.near = e,
    this.far = i,
    this.vp.initPerspective(t, this.canvas.width / this.canvas.height, e, i),
    this.vp.updateMatrix()
}
,
Camera.prototype.lookIn = function(t) {
    this.vp.initView(this.pos, this.pos.add(t), new Vector3([0, 1, 0])),
    this.vp.updateMatrix()
}
,
Camera.prototype.setPosition = function(t) {
    this.pos = t;
    var e = this.pos.elements;
    this.vp.view.setTranslate(-e[0], -e[1], -e[2]),
    this.vp.updateMatrix()
}
,
Camera.prototype.move = function(t) {
    this.pos.addE(t)
}
,
Camera.prototype.update = function(t, e, i) {
    var s = !1
      , o = this.startSpeed;
    if (e.isKeyDown(16) && (o *= this.boost),
    e.isKeyDown(65)) {
        var r = this.getRight().normalize();
        r.sMulE(-o * t),
        this.move(r),
        s = !0
    } else if (e.isKeyDown(68)) {
        var a = this.getRight().normalize();
        a.sMulE(o * t),
        this.move(a),
        s = !0
    }
    if (e.isKeyDown(87)) {
        var n = this.getForward().sMul(o * t);
        this.move(n),
        s = !0
    } else if (e.isKeyDown(83)) {
        var h = this.getForward().sMul(-o * t);
        this.move(h),
        s = !0
    }
    if (Math.abs(e.mxd) + Math.abs(e.myd) > 1e-5) {
        var p = this.getForward()
          , v = -e.mxd * t * this.mouseSpeed
          , m = -e.myd * t * this.mouseSpeed
          , w = new Matrix4
          , c = this.getUp().elements;
        w.setRotate(v, c[0], c[1], c[2]),
        p = w.multiplyVector3(p);
        var u = new Matrix4
          , d = this.getRight().elements;
        u.setRotate(m, d[0], d[1], d[2]),
        p = u.multiplyVector3(p),
        this.lookIn(p),
        s = !0,
        e.mxd = 0,
        e.myd = 0
    }
    e.isKeyDown(17) ? (this.updatePerspective(this.zoomFov, this.near, this.far, !0),
    this.ctrlWasDown = !0) : this.ctrlWasDown && (this.ctrlWasDown = !1,
    this.updatePerspective(this.fov, this.near, this.far)),
    s && (i.updateFromCamera(),
    this.updateView())
}
;
