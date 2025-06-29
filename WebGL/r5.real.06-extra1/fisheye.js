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
const vsIP = `#version 300 es
precision highp float;

void main(void){
}
`;

const fsIP = `#version 300 es
precision highp float;

void main(void){
}
`;

const prgIP = creation_programme_shading(gl, [
    [ gl.VERTEX_SHADER,   vsIP ],
    [ gl.FRAGMENT_SHADER, fsIP ]
]);

// Localisation des attributs et des uniforms

//===================
// Création du buffer
//===================
const vaoIP = gl.createVertexArray();
gl.bindVertexArray(vaoIP);

// L'objet à rendre est constitué de deux triangles sur lesquels
// on plaque une texture.

//=============================================================
// Création d'une texture sans attente de chargement de fichier
//=============================================================
//--------------------------------
// Création de la texture
//--------------------------------
const myTexture = gl.createTexture();
gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_2D, myTexture);

const textureWidth = 4;
const textureHeight = 4;
const pixels = new Uint8Array([
  255,255,255,255, 128,128,128,255, 255,255,255,255, 128,128,128,255,
  128,128,128,255, 255,255,255,255, 128,128,128,255, 255,255,255,255,
  255,255,255,255, 128,128,128,255, 255,255,255,255, 128,128,128,255,
  128,128,128,255, 255,255,255,255, 128,128,128,255, 255,255,255,255
]);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, textureWidth, textureHeight,
              0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

// On fixe les filtres utilisés pour l'échantillonnage/placage de texture :
//  - Si la texture doit être sur- ou sous-échantillonnée.
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
//  - Si les coordonnées de texture dépassent [0,1]x[0,1].
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

//====================================
// Dessin de l'image
//====================================
//--------------------------------------------------------------
// Définition des quantités constantes et uniforms
//--------------------------------------------------------------
gl.useProgram(prgIP);

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

gl.bindVertexArray(vaoIP);
// 1 tuile de 2 triangles avec 3 vertices chacun
gl.drawArrays(gl.TRIANGLES, 0, 6);

