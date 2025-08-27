# Étape 1: Construire l'application React
FROM node:18-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de gestion de paquets
COPY package.json pnpm-lock.yaml ./

# Installer pnpm et les dépendances
# Note: On utilise npm pour installer pnpm car npm est inclus par défaut dans l'image node
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Copier le reste du code source de l'application
COPY . .

# Construire l'application pour la production
RUN pnpm run build

# Étape 2: Servir l'application avec Nginx
FROM nginx:stable-alpine

# Copier les fichiers statiques construits depuis l'étape précédente
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port 80 pour accéder à l'application
EXPOSE 80

# Démarrer Nginx en mode "foreground" pour que le conteneur reste actif
CMD ["nginx", "-g", "daemon off;"]
