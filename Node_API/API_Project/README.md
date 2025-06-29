# API de Gestion de Projet

## Description

Ce projet est une API de gestion de projet qui permet de gérer les employés, les équipes, les projets et les tâches. L'API permet de récupérer, ajouter, modifier et supprimer des données.

Cette API est un MOCK pour un futur outil de gestion de projet pour une entreprise de développement informatique.

## Installation

Une fois le dossier dézippé, ouvrez un terminal, placez vous à la racine du projet, et exécutez les commandes suivantes :

```bash
npm install
npm start
```

## Conseils pour l'utilisation

- Utiliser un logiciel comme Postman ou Thunder Client dans VScode pour tester les routes de l'API
- Utiliser la documentation de l'API pour connaître les routes disponibles et les paramètres nécessaires

## Spécification du système

La spécification du système est intégrée dans l'API. Utiliser la route `/spec/` dans un navigateur pour afficher la documentation de l'API. La documentation est générée avec Swagger. 

Sinon vous pouvez consulter le fichier `specification.yaml` pour voir la spécification de l'API. Ou copier la spécification dans un éditeur Swagger pour plus de lisibilité.

### Entités

1. **Batiment**
   - `id_batiment`: Identifiant unique du bâtiment
   - `pole`: Pôle du bâtiment (FAB, DTIT, ADMIN)

2. **Team**
   - `id_team`: Identifiant unique de l'équipe
   - `team_name`: Nom de l'équipe (IT, MES, ARCHI, DB, INFRAnACCES, SEC)
   - `employees`: Liste des identifiants des employés dans l'équipe
   - `batiment`: Nom du bâtiment associé à l'équipe

3. **Employe**
   - `id`: Identifiant unique de l'employé
   - `nom`: Nom de l'employé
   - `prenom`: Prénom de l'employé
   - `email`: Email de l'employé
   - `poste`: Poste de l'employé (Manager, Lead Dev, Dev, Alternant)

4. **Project**
   - `id_project`: Identifiant unique du projet
   - `project_name`: Nom du projet
   - `description`: Description du projet
   - `membres`: Liste des membres assignés au projet avec leur rôle

5. **Task**
   - `id_task`: Identifiant unique de la tâche
   - `id_project`: Identifiant unique du projet associé à la tâche
   - `name`: Nom de la tâche
   - `date_end`: Date limite pour finir la tâche
   - `status`: État de la tâche (FIN, EN COURS, INACTIF)

## Instructions pour exécuter le serveur

1. Cloner le dépôt
2. Installer les dépendances : `npm install`
3. Lancer le serveur : `npm start`

## Jeu de données

Les données initiales sont chargées depuis les fichiers JSON (`batiments.json`, `teams.json`, `employes.json`, `project.json`, `task.json`).

## Méthodologie suivie

Pour ce projet j'ai commencé par créer les fichiers JSON pour les données initiales, puis j'ai créé les routes pour chaque entité. J'ai ensuite créé les fonctions pour chaque route en utilisant les données des fichiers JSON. J'ai également ajouté des validations pour les paramètres des requêtes.

J'ai structuré le code en utilisant des modules pour chaque entité et des contrôleurs pour chaque route.

Puis j'ai créé la documentation de l'API en utilisant Swagger.

J'ai préféré faire le serveur en premier pour pouvoir modifier les données facilement et ne pas avoir a refaire la specification de l'api a chaque fois. Et je me sentais plus à l'aise avec la création du serveur.
Mais cela ma demander d'accorder plus de temps lors de l'écriture de la specification de l'api.
Mais le faire dans cet ordre m'a permis de faire des tests plus facilement, juste en créant des fichiers temporaires pour tester les routes, des fonctions, etc ...

