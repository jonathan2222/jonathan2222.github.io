function Model(t) {
    this.vertices = null,
    this.indices = null,
    this.n = 0,
    this.mode = t.TRIANGLES,
    this.indicesType = t.UNSIGNED_SHORT,
    this.gl = t,
    this.indicesBuffer = null,
    this.vertexBuffer = null
}
Model.prototype.constructDisplayModel = function() {
    this.vertices = new Float32Array([-1, -1, 0, 0, 0, -1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, -1, 0, 1, 0]),
    this.indices = new Uint16Array([0, 3, 1, 1, 3, 2]),
    this.n = this.indices.length
}
,
Model.prototype.constructPlaneModel = function() {
    this.vertices = new Float32Array([-.5, 0, -.5, 0, 1, -.5, 0, .5, 0, 0, .5, 0, .5, 1, 0, .5, 0, -.5, 1, 1]),
    this.indices = new Uint16Array([0, 1, 2, 0, 2, 3]),
    this.n = this.indices.length
}
,
Model.prototype.constructWireCubeModel = function() {
    this.vertices = new Float32Array([-.5, -.5, -.5, 1, 0, -.5, -.5, .5, 1, 0, .5, -.5, .5, 1, 0, .5, -.5, -.5, 1, 0, -.5, .5, -.5, 1, 0, -.5, .5, .5, 1, 0, .5, .5, .5, 1, 0, .5, .5, -.5, 1, 0]),
    this.indices = new Uint16Array([0, 1, 2, 3, 0, 4, 5, 6, 7, 4, 7, 3, 2, 6, 5, 1]),
    this.n = this.indices.length
}
,
Model.prototype.constructCubeModel = function() {
    this.vertices = new Float32Array([-.5, -.5, .5, 0, 0, .5, -.5, .5, 1, 0, .5, .5, .5, 1, 1, -.5, .5, .5, 0, 1, -.5, -.5, -.5, 1, 0, -.5, .5, -.5, 1, 1, .5, .5, -.5, 0, 1, .5, -.5, -.5, 0, 0, -.5, .5, -.5, 0, 1, -.5, .5, .5, 0, 0, .5, .5, .5, 1, 0, .5, .5, -.5, 1, 1, -.5, -.5, -.5, 1, 1, .5, -.5, -.5, 0, 1, .5, -.5, .5, 0, 0, -.5, -.5, .5, 1, 0, .5, -.5, -.5, 1, 0, .5, .5, -.5, 1, 1, .5, .5, .5, 0, 1, .5, -.5, .5, 0, 0, -.5, -.5, -.5, 0, 0, -.5, -.5, .5, 1, 0, -.5, .5, .5, 1, 1, -.5, .5, -.5, 0, 1]),
    this.indices = new Uint16Array([0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23]),
    this.n = this.indices.length
}
,
Model.prototype.loadModelToGPU = function(t) {
    var i = this.vertices.BYTES_PER_ELEMENT;
    this.vertexBuffer = this.gl.createBuffer(),
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    var e = t.getAttribute("a_position");
    this.gl.vertexAttribPointer(e, 3, this.gl.FLOAT, !1, 5 * i, 0),
    this.gl.enableVertexAttribArray(e);
    var r = t.getAttribute("a_uv");
    this.gl.vertexAttribPointer(r, 2, this.gl.FLOAT, !1, 5 * i, 3 * i),
    this.gl.enableVertexAttribArray(r),
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertices, this.gl.STATIC_DRAW),
    this.indicesBuffer = this.gl.createBuffer(),
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer),
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.indices, this.gl.STATIC_DRAW)
}
,
Model.prototype.bind = function(t) {
    var i = this.vertices.BYTES_PER_ELEMENT;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    var e = t.getAttribute("a_position");
    this.gl.vertexAttribPointer(e, 3, this.gl.FLOAT, !1, 5 * i, 0),
    this.gl.enableVertexAttribArray(e);
    var r = t.getAttribute("a_uv");
    this.gl.vertexAttribPointer(r, 2, this.gl.FLOAT, !1, 5 * i, 3 * i),
    this.gl.enableVertexAttribArray(r),
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer)
}
;
