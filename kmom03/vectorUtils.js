Vector4.prototype.toVec3 = function() {
    var t = this.elements;
    return new Vector3([t[0], t[1], t[2]])
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
;
