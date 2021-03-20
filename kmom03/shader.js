function Shader(t) {
    this.attributes = {},
    this.uniforms = {},
    this.program = null,
    this.gl = t
}
Shader.prototype.defAttribute = function(t) {
    var r = this.gl.getAttribLocation(this.program, t);
    return r < 0 ? (console.log("Failed to get the storage location of " + t),
    null) : r
}
,
Shader.prototype.init = function(t) {
    return this.program = WebGLUtils.createProgramFromScripts(this.gl, t),
    this.gl.useProgram(this.program),
    {}
}
,
Shader.prototype.use = function() {
    this.gl.useProgram(this.program)
}
,
Shader.prototype.addAttribute = function(t) {
    if (0 == this.attributes.hasOwnProperty(t)) {
        var r = this.defAttribute(t);
        return t < 0 ? (console.log("Failed to add attribute: " + t),
        null) : (this.attributes[t] = r,
        r)
    }
    return null
}
,
Shader.prototype.getAttribute = function(t) {
    return this.attributes.hasOwnProperty(t) ? this.attributes[t] : null
}
,
Shader.prototype.addUniform = function(t) {
    if (0 == this.uniforms.hasOwnProperty(t)) {
        var r = this.gl.getUniformLocation(this.program, t);
        return t < 0 ? (console.log("Failed to add uniform: " + t),
        null) : (this.uniforms[t] = r,
        r)
    }
    return null
}
,
Shader.prototype.getUniform = function(t) {
    return this.uniforms.hasOwnProperty(t) ? this.uniforms[t] : null
}
,
Shader.prototype.hasUniform = function(t) {
    return this.uniforms.hasOwnProperty(t)
}
,
Shader.prototype.addUniformIfMissing = function(t) {
    return !!this.hasUniform(t) || !!this.addUniform(t)
}
,
Shader.prototype.uniformMatrix4fv = function(t, r, i) {
    this.addUniformIfMissing(t) && this.gl.uniformMatrix4fv(this.uniforms[t], r, i)
}
,
Shader.prototype.uniform4fv = function(t, r) {
    this.addUniformIfMissing(t) && this.gl.uniform4fv(this.uniforms[t], r)
}
,
Shader.prototype.uniform1f = function(t, r) {
    this.addUniformIfMissing(t) && this.gl.uniform1f(this.uniforms[t], r)
}
,
Shader.prototype.sampler2D = function(t, r) {
    this.addUniformIfMissing(t) && this.gl.uniform1i(this.uniforms[t], r)
}
;
