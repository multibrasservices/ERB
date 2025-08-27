# Projet d'Import de Relevés Bancaires (React Version)

## Description

Cette application est une interface web moderne pour l'import de relevés bancaires au format Excel. Elle a été développée en React et TypeScript, en utilisant Vite comme outil de build. L'objectif est d'extraire et de structurer les données de ces fichiers en les envoyant à un workflow n8n pour traitement.

Cette version remplace le prototype initial en HTML/JS/CSS.

## Stack Technique

- **Frontend**: React 18+
- **Langage**: TypeScript
- **Outil de Build**: Vite
- **Gestionnaire de Paquets**: pnpm
- **Qualité de Code**: ESLint & Prettier

## Installation et Lancement

### 1. Prérequis

Assurez-vous d'avoir [Node.js](https://nodejs.org/) et [pnpm](https://pnpm.io/installation) installés sur votre machine.

### 2. Installation des dépendances

Clonez le projet, puis à la racine du dossier `excel-import-react`, exécutez la commande suivante pour installer les dépendances :

```bash
pnpm install
```

### 3. Configuration de l'environnement

Avant de lancer l'application, vous devez configurer l'URL du webhook n8n.

1.  Créez un fichier `.env.local` à la racine du projet.
2.  Ajoutez-y la variable d'environnement suivante avec votre URL de webhook :

```
VITE_N8N_WEBHOOK_URL="VOTRE_URL_DE_WEBHOOK_N8N"
```

### 4. Lancement du serveur de développement

Une fois les dépendances installées et l'environnement configuré, lancez le serveur de développement avec la commande :

```bash
pnpm dev
```

L'application sera alors disponible à l'adresse `http://localhost:5173` (ou un autre port si celui-ci est déjà utilisé).

## Comment l'utiliser

1.  Ouvrez l'application dans votre navigateur.
2.  Sélectionnez un fichier Excel contenant un relevé bancaire.
3.  Cliquez sur "Téléverser".
4.  Observez le statut et la réponse du serveur.