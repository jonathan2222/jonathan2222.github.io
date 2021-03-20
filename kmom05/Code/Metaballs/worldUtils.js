World.prototype.initScalarField = function(t, e, i, r, s) {
    this.gridWidth = t,
    this.gridHeight = e,
    this.gridDepth = i,
    this.cellSize = r,
    this.gwn = Math.ceil(t / r),
    this.ghn = Math.ceil(e / r),
    this.gdn = Math.ceil(i / r),
    this.grid = new Array(this.gwn);
    for (var h = 0; h < this.gwn; h++) {
        this.grid[h] = new Array(this.ghn);
        for (var l = 0; l < this.ghn; l++) {
            this.grid[h][l] = new Array(this.gdn);
            for (var o = 0; o < this.gdn; o++)
                this.grid[h][l][o] = {
                    val: 0,
                    color: [0, 0, 0]
                }
        }
    }
    null != s && (this.poligoniser = new Poligoniser,
    this.isoSurface = new IsoSurface(this.gl,s))
}
,
World.prototype.delete = function() {
    this.isoSurface.delete()
}
,
World.prototype.fieldIndexToPos = function(t, e, i) {
    var r = t / this.gwn * this.gridWidth
      , s = e / this.ghn * this.gridHeight
      , h = i / this.gdn * this.gridDepth;
    return new Vector3([r - .5 * this.gridWidth, s - .5 * this.gridHeight, h - .5 * this.gridDepth])
}
,
World.prototype.getVertexDensity = function(t, e, i) {
    var r = Math.max(Math.min(t, this.gwn - 1), 0)
      , s = Math.max(Math.min(e, this.ghn - 1), 0)
      , h = Math.max(Math.min(i, this.gdn - 1), 0);
    return 1 / this.grid[r][s][h].val
}
,
World.prototype.getCellVertex = function(t, e, i) {
    var r = {
        p: this.fieldIndexToPos(t, e, i),
        val: this.grid[t][e][i].val,
        color: new Vector3(this.grid[t][e][i].color)
    }
      , s = [1, 0, 0];
    return 0 == this.isFlatShadingOn && (s[0] = (this.getVertexDensity(t + 1, e, i) - this.getVertexDensity(t - 1, e, i)) / this.cellSize,
    s[1] = (this.getVertexDensity(t, e + 1, i) - this.getVertexDensity(t, e - 1, i)) / this.cellSize,
    s[2] = (this.getVertexDensity(t, e, i + 1) - this.getVertexDensity(t, e, i - 1)) / this.cellSize),
    r.normal = new Vector3(s),
    0 == r.normal.isZero() && r.normal.normalize(),
    r
}
,
World.prototype.updateScalarField = function() {
    for (var t, e = [], i = {}, r = 1.2 + this.threshold, s = new Array(this.metaballs.length).fill(0), h = 0; h < this.gwn; h++)
        for (var l = 0; l < this.ghn; l++)
            for (var o = 0; o < this.gdn; o++) {
                for (var n = 0, a = [0, 0, 0], g = this.fieldIndexToPos(h, l, o), d = 0; d < this.metaballs.length; d++) {
                    t = this.metaballs[d];
                    var c = g.sub(t.pos).elements
                      , p = c[0] * c[0] + c[1] * c[1] + c[2] * c[2];
                    s[d] = t.radius * t.radius / p,
                    n += s[d]
                }
                this.grid[h][l][o].val = n;
                for (var u = 0; u < this.metaballs.length; u++)
                    t = this.metaballs[u],
                    a[0] += t.color[0] * s[u],
                    a[1] += t.color[1] * s[u],
                    a[2] += t.color[2] * s[u];
                a[0] = Math.min(a[0], 1),
                a[1] = Math.min(a[1], 1),
                a[2] = Math.min(a[2], 1),
                this.grid[h][l][o].color[0] = a[0],
                this.grid[h][l][o].color[2] = a[2],
                this.grid[h][l][o].color[1] = a[1],
                this.isFlatShadingOn && h > 0 && o > 0 && l > 0 && ((i = {
                    vertices: [],
                    color: new Vector3(this.grid[h][l][o].color)
                }).vertices.push(this.getCellVertex(h - 1, l - 1, o)),
                i.vertices.push(this.getCellVertex(h, l - 1, o)),
                i.vertices.push(this.getCellVertex(h, l - 1, o - 1)),
                i.vertices.push(this.getCellVertex(h - 1, l - 1, o - 1)),
                i.vertices.push(this.getCellVertex(h - 1, l, o)),
                i.vertices.push(this.getCellVertex(h, l, o)),
                i.vertices.push(this.getCellVertex(h, l, o - 1)),
                i.vertices.push(this.getCellVertex(h - 1, l, o - 1)),
                this.poligoniser.poligonise(i, r, e, !0))
            }
    if (0 == this.isFlatShadingOn)
        for (h = 0; h < this.gwn; h++)
            for (l = 0; l < this.ghn; l++)
                for (o = 0; o < this.gdn; o++)
                    h > 0 && o > 0 && l > 0 && ((i = {
                        vertices: [],
                        color: new Vector3(this.grid[h][l][o].color)
                    }).vertices.push(this.getCellVertex(h - 1, l - 1, o)),
                    i.vertices.push(this.getCellVertex(h, l - 1, o)),
                    i.vertices.push(this.getCellVertex(h, l - 1, o - 1)),
                    i.vertices.push(this.getCellVertex(h - 1, l - 1, o - 1)),
                    i.vertices.push(this.getCellVertex(h - 1, l, o)),
                    i.vertices.push(this.getCellVertex(h, l, o)),
                    i.vertices.push(this.getCellVertex(h, l, o - 1)),
                    i.vertices.push(this.getCellVertex(h - 1, l, o - 1)),
                    this.poligoniser.poligonise(i, r, e, !1));
    this.isoSurface.updateVertices(e)
}
,
World.prototype.updateMetaballs = function(t) {
    for (var e = 0; e < this.metaballs.length; e++) {
        var i = this.metaballs[e];
        i.move(t);
        var r = i.pos.elements
          , s = i.vel.elements
          , h = .5 * this.gridWidth - i.radius;
        (r[0] > h || r[0] < -h) && (s[0] = -s[0],
        r[0] = r[0] > h ? h : -h);
        var l = .5 * this.gridHeight - i.radius;
        (r[1] > l || r[1] < -l) && (s[1] = -s[1],
        r[1] = r[1] > l ? l : -l);
        var o = .5 * this.gridDepth - i.radius;
        (r[2] > o || r[2] < -o) && (s[2] = -s[2],
        r[2] = r[2] > o ? o : -o)
    }
}
,
World.prototype.addMetaball = function(t, e, i) {
    var r = new Metaball(new Vector3(t),e,null,i);
    this.metaballs.push(r)
}
,
World.prototype.removeMetaball = function() {
    this.metaballs.pop()
}
,
World.prototype.renderIsosurface = function(t, e) {
    this.isoSurface.render(t, e)
}
,
World.prototype.drawScaleFieldOutline = function(t, e, i) {
    t.uniformMatrix4fv("u_vp", !1, e.vp.matrix.elements);
    var r = new Matrix4;
    r.setScale(this.gridWidth, this.gridHeight, this.gridHeight),
    t.uniformMatrix4fv("u_model", !1, r.elements);
    var s = new Float32Array([1, 0, 0, 1]);
    t.uniform4fv("u_tint", s),
    i.bind(t),
    this.gl.drawElements(this.gl.LINE_LOOP, i.n, i.indicesType, 0)
}
;
