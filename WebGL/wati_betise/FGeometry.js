function getFGeometry() {
  return [
          // face avant : tuile verticale
          -15,   0,  15, colors[0], colors[1], colors[2],
           15,   0,  15, colors[0], colors[1], colors[2],
          -15, 150,  15, colors[0], colors[1], colors[2],
          -15, 150,  15, colors[0], colors[1], colors[2],
           15,   0,  15, colors[0], colors[1], colors[2],
           15, 150,  15, colors[0], colors[1], colors[2],

          // face avant : grande tuile horizontale
           15, 120,  15, colors[0], colors[1], colors[2],
           85, 120,  15, colors[0], colors[1], colors[2],
           15, 150,  15, colors[0], colors[1], colors[2],
           15, 150,  15, colors[0], colors[1], colors[2],
           85, 120,  15, colors[0], colors[1], colors[2],
           85, 150,  15, colors[0], colors[1], colors[2],

          // face avant : petite tuile horizontale
           15,  60,  15, colors[0], colors[1], colors[2],
           52,  60,  15, colors[0], colors[1], colors[2],
           15,  90,  15, colors[0], colors[1], colors[2],
           15,  90,  15, colors[0], colors[1], colors[2],
           52,  60,  15, colors[0], colors[1], colors[2],
           52,  90,  15, colors[0], colors[1], colors[2],

          // face arrière : tuile verticale
          -15,   0, -15, colors[10], colors[5], colors[1],
          -15, 150, -15, colors[10], colors[5], colors[1],
           15,   0, -15, colors[10], colors[5], colors[1],
          -15, 150, -15, colors[10], colors[5], colors[1],
           15, 150, -15, colors[10], colors[5], colors[1],
           15,   0, -15, colors[10], colors[5], colors[1],

          // face arrière : grande tuile horizontale
           15, 120, -15, colors[2], colors[5], colors[1],
           15, 150, -15, colors[2], colors[5], colors[1],
           85, 120, -15, colors[2], colors[5], colors[1],
           15, 150, -15, colors[2], colors[5], colors[1],
           85, 150, -15, colors[2], colors[5], colors[1],
           85, 120, -15, colors[2], colors[5], colors[1],

          // face arrière : petite tuile horizontale
           15,  60, -15, colors[9], colors[1], colors[4],
           15,  90, -15, colors[9], colors[1], colors[4],
           52,  60, -15, colors[9], colors[1], colors[4],
           15,  90, -15, colors[9], colors[1], colors[4],
           52,  90, -15, colors[9], colors[1], colors[4],
           52,  60, -15, colors[9], colors[1], colors[4],

          // face supérieure de la grande barre horizontale
          -15, 150,  15, colors[9], colors[1], colors[4],
           85, 150,  15, colors[9], colors[1], colors[4],
          -15, 150, -15, colors[9], colors[1], colors[4],
          -15, 150, -15, colors[9], colors[1], colors[4],
           85, 150,  15, colors[9], colors[1], colors[4],
           85, 150, -15, colors[9], colors[1], colors[4],

          // extrémité de la grande barre horizontale
           85, 120,  15, colors[3], colors[10], colors[4],
           85, 120, -15, colors[3], colors[10], colors[4],
           85, 150,  15, colors[3], colors[10], colors[4],
           85, 150,  15, colors[3], colors[10], colors[4],
           85, 120, -15, colors[3], colors[10], colors[4],
           85, 150, -15, colors[3], colors[10], colors[4],

          // face inférieure de la grande barre horizontale
           15, 120,  15, colors[3], colors[10], colors[4],
           15, 120, -15, colors[3], colors[10], colors[4], 
           85, 120,  15, colors[3], colors[10], colors[4], 
           85, 120,  15, colors[3], colors[10], colors[4], 
           15, 120, -15, colors[3], colors[10], colors[4], 
           85, 120, -15, colors[3], colors[10], colors[4], 

          // face séparant les deux barres horizontales
           15,  90,  15, colors[3], colors[10], colors[4],
           15,  90, -15, colors[3], colors[10], colors[4],
           15, 120,  15, colors[3], colors[10], colors[4],
           15, 120,  15, colors[3], colors[10], colors[4],
           15,  90, -15, colors[3], colors[10], colors[4],
           15, 120, -15, colors[3], colors[10], colors[4],

          // face supérieure de la petite barre horizontale
           52,  90,  15, colors[2], colors[7], colors[12],
           52,  90, -15, colors[2], colors[7], colors[12],
           15,  90,  15, colors[2], colors[7], colors[12],
           15,  90,  15, colors[2], colors[7], colors[12],
           52,  90, -15, colors[2], colors[7], colors[12],
           15,  90, -15, colors[2], colors[7], colors[12],

          // extrémité de la petite barre horizontale
           52,  60,  15, colors[2], colors[7], colors[12],
           52,  60, -15, colors[2], colors[7], colors[12],
           52,  90,  15, colors[2], colors[7], colors[12],
           52,  90,  15, colors[2], colors[7], colors[12],
           52,  60, -15, colors[2], colors[7], colors[12],
           52,  90, -15, colors[2], colors[7], colors[12],

          // face inférieure de la petite barre horizontale
           15,  60,  15,colors[2], colors[7], colors[12],
           15,  60, -15,colors[2], colors[7], colors[12],
           52,  60,  15,colors[2], colors[7], colors[12],
           52,  60,  15,colors[2], colors[7], colors[12],
           15,  60, -15,colors[2], colors[7], colors[12],
           52,  60, -15,colors[2], colors[7], colors[12],

          // face latérale sous la petite barre horizontale
           15,   0,  15, colors[2], colors[7], colors[12],
           15,   0, -15, colors[2], colors[7], colors[12],
           15,  60,  15, colors[2], colors[7], colors[12],
           15,  60,  15, colors[2], colors[7], colors[12],
           15,   0, -15, colors[2], colors[7], colors[12],
           15,  60, -15, colors[2], colors[7], colors[12],

          // face inférieure de la barre verticale
          -15,   0,  15, colors[2], colors[7], colors[12],
          -15,   0, -15, colors[2], colors[7], colors[12],
           15,   0,  15, colors[2], colors[7], colors[12],
           15,   0,  15, colors[2], colors[7], colors[12],
          -15,   0, -15, colors[2], colors[7], colors[12],
           15,   0, -15, colors[2], colors[7], colors[12],

          // grande face latérale de la barre verticale
          -15,   0, -15, colors[2], colors[7], colors[12],
          -15,   0,  15, colors[2], colors[7], colors[12],
          -15, 150, -15, colors[2], colors[7], colors[12],
          -15, 150, -15, colors[2], colors[7], colors[12],
          -15,   0,  15, colors[2], colors[7], colors[12],
          -15, 150,  15, colors[2], colors[7], colors[12]
        ];
}
