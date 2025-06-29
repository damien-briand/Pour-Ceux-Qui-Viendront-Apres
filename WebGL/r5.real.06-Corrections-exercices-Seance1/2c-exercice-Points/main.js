'use strict';

const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl2');

const vertex_GLSL = `#version 300 es

#define PI 3.1415926538

in vec4 position;
out vec2 color_param;

void main() {
    float x; 
    float y;
    
    x = 0.8 * cos(position.t * 2.0 * PI);
    y = 0.6 * sin(position.t * 2.0 * PI);
    
    color_param.y = y / 0.8;
    
    gl_Position = vec4(x, y, position.zw);
    gl_PointSize = 20.0;
}
`;

const fragment_GLSL = `#version 300 es
precision highp float;

in vec2 color_param;
out vec4 glFragColor;

void main() {
    float r, g;
    float b = (color_param.y >= 0.0) ? 0.0 : 1.0;
    
    r = 1.0 - color_param.x;
    g = color_param.x;
    
    glFragColor = vec4(r, g, b, 1);
}
`;

// Creation du programme de shading en fournissant le code des shaders
this.prg = creation_programme_shading(gl, [
    [ gl.VERTEX_SHADER,   vertex_GLSL ],
    [ gl.FRAGMENT_SHADER, fragment_GLSL ]
]);

// Référence sur l'attribut (ici coordonnées des vertex)
const attribPosition = gl.getAttribLocation(prg, 'position');

gl.useProgram(prg);

// Affichage d'une série de points
const nb_points = 12;
for (let i = 0; i < nb_points; ++i) {
  const t = i / nb_points;  // 0 to 1
  gl.vertexAttrib2f(attribPosition, 0, t);

  const offset = 0;
  const count = 1;
  gl.drawArrays(gl.POINTS, offset, count);
}