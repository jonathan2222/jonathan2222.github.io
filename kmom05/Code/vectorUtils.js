Vector4.prototype.toVec3 = function() {
    var t = this.elements;
    return new Vector3([t[0], t[1], t[2]])
}
,
Vector4.prototype.add = function(t) {
    var e = this.elements
      , r = t.elements;
    return new Vector4([e[0] + r[0], e[1] + r[1], e[2] + r[2], e[3] + r[3]])
}
,
Vector4.prototype.sub = function(t) {
    var e = this.elements
      , r = t.elements;
    return new Vector4([e[0] - r[0], e[1] - r[1], e[2] - r[2], e[3] - r[3]])
}
,
Vector4.prototype.subE = function(t) {
    var e = this.elements
      , r = t.elements;
    return e[0] -= r[0],
    e[1] -= r[1],
    e[2] -= r[2],
    e[3] -= r[3],
    this
}
,
Vector4.prototype.sMulE = function(t) {
    var e = this.elements;
    return e[0] *= t,
    e[1] *= t,
    e[2] *= t,
    e[3] *= t,
    this
}
,
Vector4.prototype.normalize = function() {
    var t = this.elements
      , e = t[0]
      , r = t[1]
      , n = t[2]
      , o = t[3]
      , s = Math.sqrt(e * e + r * r + n * n + o * o);
    return s ? 1 == s ? this : (s = 1 / s,
    t[0] = e * s,
    t[1] = r * s,
    t[2] = n * s,
    t[3] = o * s,
    this) : (t[0] = 0,
    t[1] = 0,
    t[2] = 0,
    t[3] = 0,
    this)
}
,
Vector3.prototype.toVec4 = function(t) {
    var e = this.elements;
    return new Vector4([e[0], e[1], e[2], t])
}
,
Vector3.prototype.copy = function(t) {
    var e = this.elements;
    if (e.length == t.length)
        for (var r = 0; r < e.length; r++)
            e[r] = t[r];
    else
        console.log("[ERROR] vectorUtils.js | copy, not same length!")
}
,
Vector3.prototype.len = function() {
    var t = this.elements;
    return Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2])
}
,
Vector3.prototype.add = function(t) {
    var e = this.elements
      , r = t.elements;
    return new Vector3([e[0] + r[0], e[1] + r[1], e[2] + r[2]])
}
,
Vector3.prototype.sub = function(t) {
    var e = this.elements
      , r = t.elements;
    return new Vector3([e[0] - r[0], e[1] - r[1], e[2] - r[2]])
}
,
Vector3.prototype.addE = function(t) {
    var e = this.elements
      , r = t.elements;
    return e[0] += r[0],
    e[1] += r[1],
    e[2] += r[2],
    this
}
,
Vector3.prototype.subE = function(t) {
    var e = this.elements
      , r = t.elements;
    return e[0] -= r[0],
    e[1] -= r[1],
    e[2] -= r[2],
    this
}
,
Vector3.prototype.sAdd = function(t) {
    var e = this.elements;
    return new Vector3([e[0] + t, e[1] + t, e[2] + t])
}
,
Vector3.prototype.sSub = function(t) {
    var e = this.elements;
    return new Vector3([e[0] - t, e[1] - t, e[2] - t])
}
,
Vector3.prototype.sMul = function(t) {
    var e = this.elements;
    return new Vector3([e[0] * t, e[1] * t, e[2] * t])
}
,
Vector3.prototype.sAddE = function(t) {
    var e = this.elements;
    return e[0] += t,
    e[1] += t,
    e[2] += t,
    this
}
,
Vector3.prototype.sSubE = function(t) {
    var e = this.elements;
    return e[0] -= t,
    e[1] -= t,
    e[2] -= t,
    this
}
,
Vector3.prototype.sMulE = function(t) {
    var e = this.elements;
    return e[0] *= t,
    e[1] *= t,
    e[2] *= t,
    this
}
,
Vector3.prototype.neg = function() {
    var t = this.elements;
    return t[0] = -t[0],
    t[1] = -t[1],
    t[2] = -t[2],
    this
}
,
Vector3.prototype.dot = function(t) {
    var e = this.elements
      , r = t.elements;
    return e[0] * r[0] + e[1] * r[1] + e[2] * r[2]
}
,
Vector3.prototype.cross = function(t) {
    var e = this.elements
      , r = t.elements;
    return new Vector3([e[1] * r[2] - e[2] * r[1], e[2] * r[0] - e[0] * r[2], e[0] * r[1] - e[1] * r[0]])
}
,
Vector3.prototype.toStr = function() {
    var t = this.elements;
    return "(" + t[0] + ", " + t[1] + ", " + t[2] + ")"
}
,
Vector4.prototype.toStr = function() {
    var t = this.elements;
    return "(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")"
}
,
Vector3.prototype.isEqual = function(t) {
    for (var e = this.elements, r = t.elements, n = !0, o = 0; o < e.length && !n; o++)
        e[o] != r[o] && (n = !1);
    return n
}
,
Vector3.prototype.isZero = function() {
    for (var t = this.elements, e = 0; e < t.length; e++)
        if (Math.abs(t[e]) > 1e-4)
            return !1;
    return !0
}
;
