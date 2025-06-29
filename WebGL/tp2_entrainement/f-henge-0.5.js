// version 0.5 : question 1 de l'exercice 1 (révisions du TP1)
'use strict';

//====================================
// Récupération canvas + WebGL
//====================================
const canvas = document.querySelector('canvas');

const gl = canvas.getContext('webgl2');
if (!gl) {
  throw new Error("No WebGL for you!")
};

//====================================
// Création et Association des shaders
//====================================
const vertex_GLSL = `#version 300 es
in vec3 a_position;

uniform mat4 u_modelViewMatrix;
uniform mat4 u_projectionMatrix;
uniform mat4 u_cameraMatrix;

void main() {
  gl_Position = u_projectionMatrix * u_cameraMatrix * u_modelViewMatrix * vec4(a_position,1);
}
`;

const fragment_GLSL = `#version 300 es
precision highp float;

out vec4 outColor;

void main() {
   outColor = vec4(0.8,0.2,0.2,1.0);
}
`;

const prg = creation_programme_shading(gl, [
    [ gl.VERTEX_SHADER,   vertex_GLSL ],
    [ gl.FRAGMENT_SHADER, fragment_GLSL ]
]);

// Localisation des attributs
const positionLocation = gl.getAttribLocation(prg, "a_position");
const matrixTransform = gl.getUniformLocation(prg, "u_modelViewMatrix");

const matrixProjection = gl.getUniformLocation(prg, "u_projectionMatrix");
const matrixCamera = gl.getUniformLocation(prg, "u_cameraMatrix");

//====================================
// Création des buffers
//====================================
// Pour chaque attribut, définir un buffer de données
// et spécifier le parcours des données du buffer
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(getFGeometry()), gl.STATIC_DRAW);
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

//====================================
// Dessin de l'image
//====================================

// Transformation Object
let u_modelViewMatrix;
u_modelViewMatrix = translation(0, 0, -500);

// Transformation Camera
let u_cameraMatrix;
u_cameraMatrix = math.multiply(
  xRotation(degToRad(-30)),
  yRotation(degToRad(20)), 
  translation(200, 300, -100)
);

u_cameraMatrix = translation(0, 0, 0);
u_cameraMatrix = math.inv(u_cameraMatrix);


// Transformation Projection Constante
const u_projectionMatrix = projection(degToRad(60), (canvas.clientWidth/canvas.clientHeight), 1, 1000);

gl.useProgram(prg);

gl.viewport(0, 0, canvas.width, canvas.height);
gl.clearColor(0.5, 0.7, 1.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
gl.enable(gl.CULL_FACE);
gl.enable(gl.DEPTH_TEST);

gl.uniformMatrix4fv(matrixTransform, false, arrayToWebGLMatrix(u_modelViewMatrix));
gl.uniformMatrix4fv(matrixCamera, false, arrayToWebGLMatrix(u_cameraMatrix));
gl.uniformMatrix4fv(matrixProjection, false, arrayToWebGLMatrix(u_projectionMatrix));

const primitiveType = gl.TRIANGLES;
const offset = 0;
const count = 96; // 16 tuiles de 2 triangles avec 3 vertices chacun

let clone = 5;
const radius = 200;
for (let i = 0; i < clone; i++) {
  const angle = (i / clone) * 2 * Math.PI;
  const x = radius * Math.cos(angle);
  const z = radius * Math.sin(angle);

  const rotationY = -angle + degToRad(90)

  u_modelViewMatrix = math.multiply(
    translation(x, 0, z - 500),
    yRotation(rotationY)
  );

  gl.uniformMatrix4fv(matrixTransform, false, arrayToWebGLMatrix(u_modelViewMatrix));

  gl.drawArrays(primitiveType, offset, count);
}

