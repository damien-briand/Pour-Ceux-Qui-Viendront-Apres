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

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
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

// 3. Récupérer les nombres identifiant (localisant) dans le programme des shaders,
//  les variables récupérées depuis le programme javascript :
// 3a. Les attributs

// 3b. Les uniforms
// A COMPLETER A PARTIR DE L'EXERCICE 2

//====================================
// Création des buffers
//====================================

// Pour chaque attribut (un seul pour l'exercice 1), répéter les deux étapes suivantes :

// 1. Définir un buffer de données
//  - création du buffer
//  - activation en spécifiant sa nature (données ou indices)
//  - alimentation du buffer à partir d'un array

/*  
  Figure 1
    •P1 : (x,y) = (−0.2 sin(k2π/5), 0.2 cos(k2π/5)) avec k = 0...4
    •P2 : (x,y) = (−0.1 sin(k2π/5 + 2π/10), 0.1 cos(k2π/5 + 2π/10)) avec k = 0...4
    •P3 : (x,y) = (0,0)
  
  Figure 2
    •P1 : (x,y) = (−0.1 sin(k2π/5 −2π/10), 0.1 cos(k2π/5 −2π/10)) avec k = 0...4
    •P2 : (x,y) = (−0.2 sin(k2π/5), 0.2 cos(k2π/5)) avec k = 0...4
    •P3 : (x,y) = (0,0)
*/
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

//  2. Spécification du parcours
//  - activer l'attribut par son identifiant (localisation)
//  - spécifier l'organisation des données dans le buffer (précédemment activé)

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

const positionLoc = gl.getAttribLocation(prg, 'position');
gl.enableVertexAttribArray(positionLoc);
gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

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

gl.drawArrays(gl.TRIANGLES, 0, points.length / 2);