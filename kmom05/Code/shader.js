function Shader(t) {
    this.attributes = {},
    this.uniforms = {},
    this.program = null,
    this.gl = t
}
Shader.prototype.defAttribute = function(t) {
    var i = this.gl.getAttribLocation(this.program, t);
    return i < 0 ? (console.log("Failed to get the storage location of " + t),
    null) : i
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
        var i = this.defAttribute(t);
        return t < 0 ? (console.log("Failed to add attribute: " + t),
        null) : (this.attributes[t] = i,
        i)
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
        var i = this.gl.getUniformLocation(this.program, t);
        return t < 0 ? (console.log("Failed to add uniform: " + t),
        null) : (this.uniforms[t] = i,
        i)
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
Shader.prototype.uniformMatrix4fv = function(t, i, r) {
    this.addUniformIfMissing(t) && this.gl.uniformMatrix4fv(this.uniforms[t], i, r)
}
,
Shader.prototype.uniform4f = function(t, i, r, o, n) {
    this.addUniformIfMissing(t) && this.gl.uniform4f(this.uniforms[t], i, r, o, n)
}
,
Shader.prototype.uniform4fv = function(t, i) {
    this.addUniformIfMissing(t) && this.gl.uniform4fv(this.uniforms[t], i)
}
,
Shader.prototype.uniform3fv = function(t, i) {
    this.addUniformIfMissing(t) && this.gl.uniform3fv(this.uniforms[t], i)
}
,
Shader.prototype.uniform1f = function(t, i) {
    this.addUniformIfMissing(t) && this.gl.uniform1f(this.uniforms[t], i)
}
,
Shader.prototype.sampler2D = function(t, i) {
    this.addUniformIfMissing(t) && this.gl.uniform1i(this.uniforms[t], i)
}
;
