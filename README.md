# Gestionnaire de Projets — React + TypeScript + Vite

Application de gestion de projets construite avec une architecture React professionnelle.

## Structure du projet

```
src/
├── types/
│   └── index.ts               # Types TypeScript (Project, Task, Action…)
│
├── utils/
│   ├── constants.ts           # Labels, couleurs, données initiales
│   └── helpers.ts             # getProgress(), formatDate(), generateId()
│
├── hooks/
│   ├── useForm.ts             # Hook formulaire contrôlé + validation
│   └── useFilter.ts           # Hook filtre/recherche avec useMemo
│
├── context/
│   └── ProjectContext.tsx     # Context API + useReducer + useProjects()
│
├── components/
│   ├── Badge/                 # Badge coloré statut/priorité
│   ├── Field/                 # Wrapper label + input + erreur
│   ├── Modal/                 # Fenêtre modale réutilisable
│   ├── StatsBar/              # Cartes de statistiques globales
│   ├── Filters/               # Barre de recherche et filtres
│   ├── ProjectForm/           # Formulaire contrôlé — création/édition projet
│   ├── TaskForm/              # Formulaire contrôlé — ajout de tâche
│   ├── ProjectCard/           # Carte projet avec progression
│   ├── ProjectDetail/         # Détail projet + liste des tâches
│   └── TaskItem/              # Ligne tâche avec cycle de statut
│
├── App.tsx                    # Composant racine
├── main.tsx                   # Point d'entrée React
└── index.css                  # Styles globaux
```

## Concepts clés implémentés

| Concept | Fichier |
|---|---|
| `useReducer` + Context API | `context/ProjectContext.tsx` |
| Custom hook `useForm` | `hooks/useForm.ts` |
| Custom hook `useFilter` | `hooks/useFilter.ts` |
| Formulaires contrôlés + validation | `components/ProjectForm/`, `components/TaskForm/` |
| Types TypeScript stricts | `types/index.ts` |
| Séparation utilitaires | `utils/constants.ts`, `utils/helpers.ts` |

## Démarrage

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev

# 3. Ouvrir dans le navigateur
# http://localhost:5173
```

## Build production

```bash
npm run build
npm run preview
```
