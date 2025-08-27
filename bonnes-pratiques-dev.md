# Bonnes Pratiques de Développement et Stack Technique

Ce document a pour but de centraliser les bonnes pratiques de développement ainsi qu'une proposition de stack technique moderne pour démarrer rapidement de nouveaux projets.

## 1. Bonnes Pratiques de Développement

### Docker
- **Images légères** : Toujours préférer des images de base minimalistes (ex: `node:18-alpine`, `python:3.10-slim`).
- **Multi-stage builds** : Utiliser les "multi-stage builds" pour séparer l'environnement de build de l'environnement de production. Cela réduit drastiquement la taille de l'image finale et les vulnérabilités.
- **`.dockerignore`** : Utiliser un fichier `.dockerignore` pour exclure les fichiers et dossiers inutiles du contexte de build (ex: `node_modules`, `.git`, `*.log`).
- **Utilisateur non-root** : Exécuter les processus dans le conteneur avec un utilisateur non-privilégié pour améliorer la sécurité.
- **Gestion des secrets** : Ne jamais hardcoder de secrets. Utiliser les variables d'environnement (`-e`), les fichiers d'environnement (`--env-file`) ou, mieux, les systèmes de gestion de secrets de l'orchestrateur (Secrets Docker/Kubernetes, Vault).
- **Caching des layers** : Structurer le `Dockerfile` pour profiter du cache de Docker. Placer les commandes qui changent le moins souvent (ex: installation de dépendances) avant celles qui changent fréquemment (ex: copie du code source).

### React
- **Composants fonctionnels et Hooks** : Privilégier les composants fonctionnels avec les Hooks (`useState`, `useEffect`, `useContext`, etc.) pour une meilleure lisibilité et composition.
- **Structure de projet** : Organiser les fichiers de manière logique (par fonctionnalité ou par type : `components`, `pages`, `hooks`, `services`, `types`).
- **State Management** :
    - Pour les états locaux, utiliser `useState`.
    - Pour les états plus complexes ou partagés entre plusieurs composants, envisager des bibliothèques comme **Zustand** (léger et simple) ou **Redux Toolkit** (plus robuste pour les grosses applications).
- **Performance** :
    - Utiliser `React.memo` pour les composants qui ne doivent pas se re-rendre inutilement.
    - Utiliser `useCallback` et `useMemo` pour mémoriser les fonctions et les valeurs.
    - Utiliser le "lazy loading" avec `React.lazy` et `Suspense` pour les composants lourds ou les pages.
- **TypeScript** : Toujours utiliser TypeScript pour typer les props, les états et les événements.

### ESLint & Prettier
- **Configuration stricte** : Mettre en place une configuration ESLint qui enforce les règles de qualité de code (ex: `eslint:recommended`, `plugin:react/recommended`, `plugin:@typescript-eslint/recommended`).
- **Formatage automatique** : Utiliser Prettier pour un formatage de code cohérent dans tout le projet.
- **Intégration** : Intégrer ESLint et Prettier dans l'IDE (avec formatage à la sauvegarde) et dans les hooks de pre-commit (avec `husky` et `lint-staged`) pour garantir la qualité avant chaque commit.

### Git
- **Convention de nommage des branches** : Utiliser une convention claire (ex: `feature/nom-feature`, `fix/bug-description`, `chore/refactoring`).
- **Messages de commit sémantiques** : Rédiger des messages de commit clairs et concis en suivant une convention comme [Conventional Commits](https://www.conventionalcommits.org/) (ex: `feat: add user login`, `fix: correct password validation`).
- **Commits atomiques** : Chaque commit doit représenter une seule modification logique.
- **Rebase interactif** : Utiliser `git rebase -i` pour nettoyer l'historique avant de merger une branche.

## 2. Stack Technique Recommandée

Cette stack est pensée pour être moderne, performante et facile à déployer, notamment en self-hosting.

- **Frontend** :
    - **Framework** : **React** ou **Next.js** (pour le SSR/SSG).
    - **Build Tool** : **Vite** (extrêmement rapide pour le développement).
    - **Langage** : **TypeScript**.
    - **Styling** : **Tailwind CSS** (pour un développement rapide d'interfaces) ou un framework de composants comme **Mantine** ou **Shadcn/ui**.

- **Backend / BaaS** :
    - **Supabase** : Une excellente alternative open source à Firebase. Il fournit :
        - Base de données PostgreSQL.
        - Authentification.
        - Stockage de fichiers.
        - Edge Functions (serverless).
        - Realtime.
    - **Appwrite** : Une autre alternative open source très solide à Firebase.

- **Automatisation / Workflows** :
    - **n8n** : Un outil d'automatisation de workflows open source et self-hostable. Parfait pour connecter des APIs, traiter des données en arrière-plan, envoyer des notifications, etc.

- **Déploiement / Hébergement** :
    - **Coolify** : Une plateforme de self-hosting open source qui simplifie radicalement le déploiement. C'est une alternative à Heroku, Vercel ou Netlify que vous pouvez héberger sur votre propre serveur. Il permet de déployer :
        - Des applications (Node.js, Python, etc.) depuis un repository Git.
        - Des bases de données (PostgreSQL, MongoDB, etc.).
        - D'autres services open source comme n8n, Appwrite, etc.
    - **Docker** : Pour conteneuriser toutes les parties de l'application.

## 3. Exemple de Démarrage Rapide d'un Projet

1.  **Initialiser le frontend avec Vite** :
    ```bash
    pnpm create vite mon-super-projet --template react-ts
    cd mon-super-projet
    ```

2.  **Installer les dépendances de base** :
    ```bash
    pnpm install
    # Ajouter Tailwind CSS (exemple)
    pnpm add -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```

3.  **Configurer ESLint & Prettier** :
    - Suivre les guides d'installation pour un projet Vite + React + TypeScript.
    - Mettre en place `husky` et `lint-staged`.

4.  **Créer un `Dockerfile` pour la production** :
    ```dockerfile
    # Stage 1: Build
    FROM node:18-alpine AS builder
    WORKDIR /app
    COPY package*.json ./
    RUN pnpm install
    COPY . .
    RUN pnpm run build

    # Stage 2: Production
    FROM node:18-alpine
    WORKDIR /app
    # Prérequis pour servir l'application (exemple avec 'serve')
    RUN npm install -g serve
    COPY --from=builder /app/dist ./dist
    # Exposer le port et démarrer le serveur
    EXPOSE 3000
    CMD ["serve", "-s", "dist", "-l", "3000"]
    ```

5.  **Déployer** :
    - Pousser le code sur un repository Git (GitHub, GitLab).
    - Dans Coolify, créer un nouveau "Resource", sélectionner "Application", connecter le repository et configurer le port et la commande de build. Coolify s'occupera du reste.
