'use strict';

const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl2');

const vertex_GLSL = `#version 300 es
in vec4 position;
in vec4 color;

out vec4 v_color;

void main() {
    gl_Position = position;
    v_color = color;
}
`;

const fragment_GLSL = `#version 300 es
precision highp float;

in vec4 v_color;
out vec4 glFragColor;

void main() {
    glFragColor = v_color;
}
`;


// Creation du programme de shading en fournissant le code des shaders
const prg = creation_programme_shading(gl, [
    [ gl.VERTEX_SHADER,   vertex_GLSL ],
    [ gl.FRAGMENT_SHADER, fragment_GLSL ]
]);

// Références vers les attributs 'position' et 'color'
const positionLoc = gl.getAttribLocation(prg, 'position');
const colorLoc = gl.getAttribLocation(prg, 'color');

// Points du triangle
const nb_points = 12;
var points = [ 0, 0 ];
var couleurs = [ 255, 255, 255, 255 ];
for(var i = 0; i <= nb_points; i++) {
    var t = i / nb_points;
    var a = 2.0 * Math.PI * t;
    var x = 0.8 * Math.cos(a);
    var y = 0.6 * Math.sin(a);
    points = points.concat([ x, y ]);

    var r = Math.min(255, parseInt(511.0 * ((t < 0.5) ? t : (1.0 - t))));
    var g = 255 - r;
    var b = (t < 0.5) ? 0 : r;
    couleurs = couleurs.concat([r, g, b, 255 ]);
}

// Buffer OpenGL contenant les points du triangles
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

// Buffer OpenGL contenant les valeurs de couleur du triangles
const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(couleurs), gl.STATIC_DRAW);

// Association buffer points <-> attribut 'position'
gl.enableVertexAttribArray(positionLoc);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(
    positionLoc,  
    2,            // 2 values per vertex shader iteration
    gl.FLOAT,     // data is 32bit floats
    false,        // don't normalize
    0,            // stride (0 = auto)
    0,            // offset into buffer
);

// Association buffer couleurs <-> attribut 'color'
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.enableVertexAttribArray(colorLoc);
gl.vertexAttribPointer(
    colorLoc,  
    4,                // 4 values per vertex shader iteration
    gl.UNSIGNED_BYTE, // data is 8bit unsigned bytes
    true,             // do normalize
    0,                // stride (0 = auto)
    0,                // offset into buffer
);

// Indication du programme à utiliser (et buffers associés)
gl.useProgram(prg);

// compute 3 vertices for 1 triangle
gl.drawArrays(gl.TRIANGLE_FAN, 0, points.length / 2);