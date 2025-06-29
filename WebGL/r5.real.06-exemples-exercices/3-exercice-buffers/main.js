'use strict';

const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl2');

const vertex_GLSL = `#version 300 es
in vec2 position;

void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment_GLSL = `#version 300 es
precision highp float;

out vec4 glFragColor;

void main() {
    glFragColor = vec4(0, 1, 0.5, 1);
}
`;

// Creation du programme de shading en fournissant le code des shaders
this.prg = creation_programme_shading(gl, [
    [ gl.VERTEX_SHADER,   vertex_GLSL ],
    [ gl.FRAGMENT_SHADER, fragment_GLSL ]
]);

// Références vers l'attribut 'position'
const positionLoc = gl.getAttribLocation(prg, 'position');

const numVertices = 12;
const vertexPositions = new Float32Array(numVertices * 2);

for (let i = 0; i < numVertices; i++) {
    const x = 0.8 * Math.cos((2.0 * 3.14 * i)/ numVertices);
    const y = 0.6 * Math.sin((2.0 * 3.14 * i)/ numVertices);
    vertexPositions[i * 2 + 0] = x;
    vertexPositions[i * 2 + 1] = y;
}

// Buffer OpenGL contenant les points du triangles
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexPositions, gl.STATIC_DRAW);

// Association buffer <-> attribut 'position'
gl.enableVertexAttribArray(positionLoc);
gl.vertexAttribPointer(
    positionLoc,  
    2,            // 2 values per vertex shader iteration
    gl.FLOAT,     // data is 32bit floats
    false,        // don't normalize
    0,            // stride (0 = auto)
    0,            // offset into buffer
);

// Indication du programme à utiliser (et buffers associés)
gl.useProgram(prg);

// compute 3 vertices for 1 triangle
// gl.drawArrays(gl.LINE_LOOP, 0, numVertices); // for wireframe
gl.drawArrays(gl.TRIANGLE_FAN, 0, numVertices);