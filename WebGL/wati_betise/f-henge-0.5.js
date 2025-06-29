"use strict";

//====================================
// Récupération canvas + WebGL
//====================================
const canvas = document.querySelector("canvas");

const gl = canvas.getContext("webgl2");
if (!gl) {
  throw new Error("No WebGL for you!");
}

//====================================
// Création et Association des shaders
//====================================
const vertex_GLSL = `#version 300 es
in vec3 a_position;

uniform mat4 u_projection;
uniform mat4 u_modelView;
uniform mat4 u_camera;

in vec3 a_color;
out vec4 v_color;

void main() {
  gl_Position = u_projection * u_camera * u_modelView * vec4(a_position,1);
  v_color = vec4(a_color,1);
}
`;

const fragment_GLSL = `#version 300 es
precision highp float;

in vec4 v_color;
out vec4 outColor;

void main() {
  outColor = v_color;
}
`;

const prg = creation_programme_shading(gl, [
  [gl.VERTEX_SHADER, vertex_GLSL],
  [gl.FRAGMENT_SHADER, fragment_GLSL],
]);

// Localisation des attributs
const positionLocation = gl.getAttribLocation(prg, "a_position");
const colorLocation = gl.getAttribLocation(prg, "a_color");

const u_projection = gl.getUniformLocation(prg, "u_projection");
const u_modelView = gl.getUniformLocation(prg, "u_modelView");
const u_camera = gl.getUniformLocation(prg, "u_camera");
//====================================
// Création des buffers
//====================================

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(
  gl.ARRAY_BUFFER,
  new Float32Array(getFGeometry()),
  gl.STATIC_DRAW
);

gl.enableVertexAttribArray(positionLocation);
gl.enableVertexAttribArray(colorLocation);

gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 6 * 4, 0);
gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 6 * 4, 3 * 4);

//====================================
// Dessin de l'image
//====================================

gl.useProgram(prg);

function draw() {
  const time = performance.now() * 0.0005;
  
  // Matrice de projection
  const projectionMatrix = projection(
    degToRad(90),
    canvas.clientWidth / canvas.clientHeight,
    0.01,
    100000
  );

  //let matriceTranslation = translation(0, 0, 0);

  let matriceCamera;
  /*
  matriceCamera = math.multiply(
    translation(200, 300, -250),
    yRotation(degToRad(40)),
    xRotation(degToRad(-40))
  ); 
  */

  const radius = 200;

  matriceCamera = math.multiply(
    yRotation(time),
    xRotation(degToRad(-40)),
    translation(0, 100, 2 * radius)
  );
  matriceCamera = math.inv(matriceCamera);

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.1, 0.4, 0.8, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.CULL_FACE);
  gl.enable(gl.DEPTH_TEST);

  gl.uniformMatrix4fv(u_projection, true, arrayToMatrix(projectionMatrix));
  gl.uniformMatrix4fv(u_camera, true, arrayToMatrix(matriceCamera));

  const primitiveType = gl.TRIANGLES;
  const offset = 0;
  const count = 96;

  let numObjet = 5;

  for (let i = 1; i < numObjet + 5; i++) {
    for (let index = 0; index < (numObjet + i); index++) {
      let angle = (index / (numObjet + i)) * Math.PI * 2; // - time
      let x = Math.cos(angle) * radius * i;
      let z = Math.sin(angle) * radius * i;

      let angleRotation = -angle + degToRad(90);

      let matriceTranslation = math.multiply(
        translation(x, 0, z),
        yRotation(angleRotation + time)
      );
      gl.uniformMatrix4fv(u_modelView, true, arrayToMatrix(matriceTranslation));

      gl.drawArrays(primitiveType, offset, count);
    }
  }

  requestAnimationFrame(draw);
}

draw();
