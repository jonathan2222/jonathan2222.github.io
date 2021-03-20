function World(t) {
    this.entites = [],
    this.gl = t,
    this.metaballs = [],
    this.gwn = 0,
    this.ghn = 0,
    this.gdn = 0,
    this.cellSize = 0,
    this.isFlatShadingOn = !1,
    this.showBoundingSpheres = !1,
    this.threshold = .5,
    this.renderingMode = "Raymarching"
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
    for (var s = 0; s < i.textures.length; s++) {
        var o = i.textures[s];
        o.texture.bind(e, o.unit, o.name)
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
