function IsoSurface(t, e) {
    this.gl = t,
    this.id = 0,
    this.vertices = new Float32Array([]),
    this.numVertices = 0,
    this.elemSize = this.vertices.BYTES_PER_ELEMENT,
    this.vertSize = 9,
    this.initBuffer(e)
}
IsoSurface.prototype.initBuffer = function(t) {
    this.id = this.gl.createBuffer(),
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.id);
    var e = t.getAttribute("a_position");
    this.gl.vertexAttribPointer(e, 3, this.gl.FLOAT, !1, this.vertSize * this.elemSize, 0),
    this.gl.enableVertexAttribArray(e);
    var i = t.getAttribute("a_normal");
    this.gl.vertexAttribPointer(i, 3, this.gl.FLOAT, !1, this.vertSize * this.elemSize, 3 * this.elemSize),
    this.gl.enableVertexAttribArray(i);
    var r = t.getAttribute("a_color");
    this.gl.vertexAttribPointer(r, 3, this.gl.FLOAT, !1, this.vertSize * this.elemSize, 6 * this.elemSize),
    this.gl.enableVertexAttribArray(r),
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertices, this.gl.DYNAMIC_DRAW)
}
,
IsoSurface.prototype.delete = function() {
    this.gl.deleteBuffer(this.id)
}
,
IsoSurface.prototype.updateVertices = function(t) {
    this.vertices = new Float32Array(t),
    this.numVertices = t.length / this.vertSize,
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.id),
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertices, this.gl.DYNAMIC_DRAW)
}
,
IsoSurface.prototype.bind = function(t) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.id);
    var e = t.getAttribute("a_position");
    this.gl.vertexAttribPointer(e, 3, this.gl.FLOAT, !1, this.vertSize * this.elemSize, 0),
    this.gl.enableVertexAttribArray(e);
    var i = t.getAttribute("a_normal");
    this.gl.vertexAttribPointer(i, 3, this.gl.FLOAT, !1, this.vertSize * this.elemSize, 3 * this.elemSize),
    this.gl.enableVertexAttribArray(i);
    var r = t.getAttribute("a_color");
    this.gl.vertexAttribPointer(r, 3, this.gl.FLOAT, !1, this.vertSize * this.elemSize, 6 * this.elemSize),
    this.gl.enableVertexAttribArray(r)
}
,
IsoSurface.prototype.render = function(t, e) {
    t.uniformMatrix4fv("u_vp", !1, e.vp.matrix.elements),
    t.uniform3fv("u_camDir", e.getForward().elements),
    this.bind(t),
    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.numVertices)
}
;
