function Entity() {
    this.matrix = new Matrix4,
    this.rotMatWorld = new Matrix4,
    this.rotMatLocal = new Matrix4,
    this.translateMat = new Matrix4,
    this.scaleMat = new Matrix4,
    this.model = null,
    this.textures = [],
    this.tint = [1, 1, 1]
}
Entity.prototype.rotateWorld = function(t, i) {
    this.rotMatWorld.rotate(t, i[0], i[1], i[2])
}
,
Entity.prototype.rotateLocal = function(t, i) {
    this.rotMatLocal.rotate(t, i[0], i[1], i[2])
}
,
Entity.prototype.setTranslation = function(t) {
    this.translateMat.setTranslate(t[0], t[1], t[2])
}
,
Entity.prototype.translate = function(t) {
    this.translateMat.translate(t[0], t[1], t[2])
}
,
Entity.prototype.setScale = function(t) {
    this.scaleMat.setScale(t, t, t)
}
,
Entity.prototype.updateMatrix = function() {
    this.matrix.setIdentity(),
    this.matrix.multiply(this.rotMatWorld),
    this.matrix.multiply(this.translateMat),
    this.matrix.multiply(this.rotMatLocal),
    this.matrix.multiply(this.scaleMat)
}
,
Entity.prototype.addTexture = function(t, i, a) {
    this.textures.push({
        texture: t,
        unit: i,
        name: a || "mos_256x256.jpg"
    })
}
,
Entity.prototype.setTint = function(t, i, a) {
    this.tint[0] = t,
    this.tint[1] = i,
    this.tint[2] = a
}
;
