'use strict';

//====================================
// Récupération canvas + WebGL
//====================================
// 1. Récupérer le canvas html
const canvas = document.querySelector('canvas');

// 2. Récupérer le WebGL
const gl = canvas.getContext('webgl2');
if (!gl) {
  throw new Error("No WebGL for you!")
};


//====================================
// Création et Association des shaders
//====================================
// 1. Ecrire le code des shaders
const vertex_GLSL = `#version 300 es
in vec2 position;
uniform mat3 matrice3D;

void main() {
  vec3 new_position = vec3(position, 1.0);
  vec3 position_t = matrice3D * new_position;
  position_t.z = 0.0;
  gl_Position = vec4(position_t, 1.0);
}
`;

const fragment_GLSL = `#version 300 es
precision highp float;

out vec4 outColor;

void main() {
  outColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`;

// 2. Créer un programme de shading avec le code des shaders
const prg = creation_programme_shading(gl, [
    [ gl.VERTEX_SHADER,   vertex_GLSL ],
    [ gl.FRAGMENT_SHADER, fragment_GLSL ]
]);

const matRotation = new Float32Array([
  Math.cos(Math.PI / 4), Math.sin(Math.PI / 4), 
  -Math.sin(Math.PI / 4), Math.cos(Math.PI / 4)
]);

//====================================
// Création des buffers
//====================================

const nb_branche = 5;
const first_radius = 0.2;
const second_radius = 0.1;

let points = [];
for(var i = 0; i <= nb_branche; i++) {
  // Figure 1
  // P1
  let p1X = -first_radius * Math.sin(i * 2 * Math.PI / nb_branche);
  let p1Y = first_radius * Math.cos(i * 2 * Math.PI / nb_branche);

  //P2
  let p2X = -second_radius * Math.sin(i * 2 * Math.PI / nb_branche + 2 * Math.PI / 10);
  let p2Y = second_radius * Math.cos(i * 2 * Math.PI / nb_branche + 2 * Math.PI / 10);
  
  // push les points Figure 1
  points.push(
    p1X, p1Y, 
    p2X, p2Y,
    0 , 0 
  );

  // Figure 2
  // P1
  p1X = -second_radius * Math.sin(i * 2 * Math.PI / nb_branche - 2 * Math.PI / 10);
  p1Y = second_radius * Math.cos(i * 2 * Math.PI / nb_branche - 2 * Math.PI / 10);

  //P2
  p2X = -first_radius * Math.sin(i * 2 * Math.PI / nb_branche);
  p2Y = first_radius * Math.cos(i * 2 * Math.PI / nb_branche);
  // push les points Figure 2
  points.push(
    p1X, p1Y, 
    p2X, p2Y,
    0 , 0 
  );
}

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

const positionLoc = gl.getAttribLocation(prg, 'position');
gl.enableVertexAttribArray(positionLoc);
gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
const matrix_uniform = gl.getUniformLocation(prg, "matrice3D");

//====================================
// Dessin de l'image
//====================================

// 1. Spécifier le programme utilisé (i.e. les shaders utilisés)
gl.useProgram(prg);

// 2. Réinitialiser le viewport
gl.clearColor(0.0, 0.0, 1.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

// 3. Pour chaque forme à dessiner (une seule pour les exercices 1 à 4)
//  3a. mettre à jour les uniforms (à partir de l'execice 2)
//  3b. mettre à jour les attributs (à partir de l'execice 8)
//  3c. Dessiner en spécifiant la nature des éléments de surface définis par les sommets (TRIANGLES etc.)

// dessiner 12 etoiles sur une grille 4x3
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 4; j++) {
    const matTranslation = new Float32Array([
      1.0, 0.0, i * 0.5 - 0.75,
      0.0, 1.0, j * 0.5 - 0.75,
      0.0, 0.0, 1.0
    ]);

    gl.uniformMatrix3fv(matrix_uniform, true, matTranslation);
    gl.drawArrays(gl.TRIANGLES, 0, points.length / 2);
  }
}
