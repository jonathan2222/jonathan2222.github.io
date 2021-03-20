function Texture(t, i) {
    this.gl = t,
    this.id = -1,
    this.init(i)
}
Texture.prototype.init = function(t) {
    this.id = this.gl.createTexture();
    var i = new Image;
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.id),
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, 1, 1, 0, this.gl.RGB, this.gl.UNSIGNED_BYTE, new Uint8Array([255, 0, 0]));
    var e = this;
    i.onload = function() {
        e.loadToGPU(i)
    }
    ,
    i.src = t || "black.jpg"
}
,
Texture.prototype.loadToGPU = function(t) {
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.id),
    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, 1),
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, t),
    this.setFilerAndMipmap(t.width, t.height)
}
,
Texture.prototype.setFilerAndMipmap = function(t, i) {
    function e(t) {
        return 0 == (t & t - 1)
    }
    e(t) && e(i) ? (this.gl.generateMipmap(this.gl.TEXTURE_2D),
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_LINEAR)) : (this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE),
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE),
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR))
}
,
Texture.prototype.bind = function(t, i, e) {
    this.gl.activeTexture(this.gl.TEXTURE0 + i),
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.id),
    t.sampler2D(e, i)
}
;
