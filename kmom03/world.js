function World(t) {
    this.entites = [],
    this.gl = t
}
World.prototype.addDefaultEntity = function(t) {
    var e = new Entity;
    return this.entites.push({
        name: t,
        entity: e
    }),
    this.entites[this.entites.length - 1].entity
}
,
World.prototype.addEntity = function(t, e, n) {
    var i = new Entity;
    return i.model = e,
    i.setTranslation(n),
    i.updateMatrix(),
    this.entites.push({
        name: t,
        entity: i
    }),
    this.entites[this.entites.length - 1].entity
}
,
World.prototype.renderEntity = function(t, e, n) {
    var i = this.entites[t].entity
      , r = new Float32Array([i.tint[0], i.tint[1], i.tint[2], 1]);
    e.uniform4fv("u_tint", r),
    e.uniformMatrix4fv("u_vp", !1, n.vp.matrix.elements),
    e.uniformMatrix4fv("u_model", !1, i.matrix.elements);
    for (var o = 0; o < i.textures.length; o++) {
        var s = i.textures[o];
        s.texture.bind(e, s.unit, s.name)
    }
    i.model.bind(e),
    this.gl.drawElements(i.model.mode, i.model.n, i.model.indicesType, 0)
}
,
World.prototype.getEntityByName = function(t) {
    for (var e = 0; e < this.entites.length; e++)
        if (this.entites[e].name == t)
            return this.entites[e].entity;
    return null
}
,
World.prototype.getEntityByIndex = function(t) {
    return this.entites[t].entity
}
;
