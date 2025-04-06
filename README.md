# Mon Vieux Grimoire - Projet 7 OpenClassrooms

## Problème de compatibilité Mongoose

**Important** : Ce projet nécessite de downgrader Mongoose pour fonctionner correctement.

Le projet utilise le plugin `mongoose-unique-validator` qui est compatible uniquement avec Mongoose 7.x et non avec les versions 8.x. Pour éviter l'erreur suivante :


## Instructions pour installer le projet

Suivez ces étapes dans l'ordre pour downgrader Mongoose un fois l'environnement du projet mis en place:

### 1. Downgrader Mongoose
```bash
# Si Mongoose est déjà installé, le désinstaller d'abord
npm uninstall mongoose

# Installer la version compatible
npm install mongoose@7.5.0
```

### 2. Installer les dépendances
```bash
# Installer mongoose-unique-validator
npm install mongoose-unique-validator

# Installer les autres dépendances du projet
npm install
```


### 3. Démarrer le serveur
```bash
npm start
```

## Remarque importante

Le downgrade de Mongoose est nécessaire pour garantir le fonctionnement du projet tel qu'il a été conçu initialement.
