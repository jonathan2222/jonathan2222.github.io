function Input(t) {
    this.canvas = t,
    this.keyStates = {},
    this.mxd = 0,
    this.myd = 0
}
Input.prototype.init = function() {
    var t = this.keyStates;
    document.addEventListener("keydown", function(e) {
        t[e.keyCode] = !0
    }, !0),
    document.addEventListener("keyup", function(e) {
        t[e.keyCode] = !1
    }, !0)
}
,
Input.prototype.isKeyDown = function(t) {
    return this.keyStates.hasOwnProperty(t) ? this.keyStates[t] : null
}
;
