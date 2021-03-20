function Metaball(t, a, o, e) {
    this.pos = t,
    this.radius = a,
    this.color = e;
    var h = 5 * Math.random();
    o ? this.vel = new Vector3(o) : (this.vel = new Vector3([h * (2 * Math.random() - 1), h * (2 * Math.random() - 1), h * (2 * Math.random() - 1)]),
    this.vel.normalize())
}
Metaball.prototype.move = function(t) {
    this.pos.addE(this.vel.sMul(t))
}
;
